/**
 * Page des questions (route `/questions`).
 *
 * Rôle:
 * - Affiche la liste des questions chargées via `GET /api/questions`.
 * - Permet d'envoyer une question sélectionnée via `POST /api/submit`.
 * - Redirige vers `/merci` après la simulation d'affichage.
 *
 * Notes:
 * - `ticketId` est exigé dans l'URL pour garantir l'accès exclusif via la file.
 * - Marquée `use client` car elle s'appuie sur des hooks React et le Router.
 */
'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

// Type métier de question côté UI (note: `reponse` au lieu de `answer`)
interface Question {
  id: number;
  question: string;
  reponse: string;
}

// Contenu principal rendu sous Suspense
function QuestionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // États locaux de l'écran
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');

  // `ticketId` obligatoire (provenant du parcours de file d'attente)
  const ticketId: string | null = searchParams ? searchParams.get('ticketId') : null;

  // Au montage: si `ticketId` absent, retour à l'entrée du parcours
  useEffect(() => {
    if (!ticketId) {
      console.warn('[UI][questions] missing ticketId, redirect');
      router.replace('/guest/s/default');
      return;
    }
    fetchQuestions();
  }, [ticketId, router]);

  // Chargement des questions depuis l'API
  const fetchQuestions = async () => {
    console.log('[UI][questions] GET /api/questions');
    try {
      const response = await fetch('/api/questions');
      if (response.ok) {
        const data = await response.json();
        console.log('[UI][questions] loaded', { count: data.length });
        setQuestions(data);
      }
    } catch (error) {
      console.error('[UI][questions] load error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Termine la session côté UI après la simulation d'affichage
  const finishSession = useCallback(async () => {
    if (hasAnswered) return;
    setHasAnswered(true);
    
    // Version TEST: pas de libération de queue explicite côté UI
    // (la route /api/submit appelle `endSession` serveur)
    setTimeout(() => {
      router.replace('/merci');
    }, 2000); // Laisser le temps de voir le statut
  }, [hasAnswered, router, ticketId]);

  // Soumission d'une question sélectionnée
  const handleQuestionClick = useCallback(async (question: Question) => {
    if (hasAnswered || isSubmitting) return;
    
    // Débute l'envoi
    setIsSubmitting(true);
    setSubmitStatus('Envoi de la question...');
    
    try {
      console.log('[UI][submit] POST /api/submit', { questionId: question.id });
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: question.id, ticketId }),
      });
      
      if (response.ok) {
        console.log('[UI][submit] success');
        setSubmitStatus('Question envoyée... Affichage en cours... Réponse envoyée !');
        // Termine la session après la simulation d'affichage
        setTimeout(() => {
          finishSession();
        }, 1000);
      } else {
        console.error('[UI][submit] http error status=', response.status);
        setSubmitStatus('Erreur lors de l\'envoi');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('[UI][submit] network error:', error);
      setSubmitStatus('Erreur de connexion');
      setIsSubmitting(false);
    }
  }, [hasAnswered, isSubmitting, finishSession, ticketId]);

  // État de chargement initial
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement des questions...</div>
      </div>
    );
  }

  // Rendu principal: liste cliquable des questions
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
          Questions Techniques - 130 ans EMF
        </h1>
        
        {submitStatus && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-center">
            <p className="text-blue-700 font-medium">{submitStatus}</p>
          </div>
        )}
        
        <div className="space-y-4">
          {questions.map((question) => (
            <div
              key={question.id}
              onClick={() => handleQuestionClick(question)}
              className={`p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all ${
                isSubmitting || hasAnswered ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <p className="text-lg text-gray-700">{question.question}</p>
              <div className="mt-2 text-sm text-gray-500">
                ID: {question.id} • Cliquez pour envoyer à l&apos;affichage
              </div>
            </div>
          ))}
        </div>

        {questions.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            Aucune question disponible pour le moment.
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Version TEST - Simulation d&apos;affichage via logs serveur</p>
          <p>Questions chargées depuis JSON local • File d&apos;attente en mémoire</p>
        </div>
      </div>
    </div>
  );
}

// Page exportée, rendue sous Suspense pour gérer `useSearchParams`
export default function QuestionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-xl text-gray-600">Chargement...</div></div>}>
      <QuestionsContent />
    </Suspense>
  );
}


