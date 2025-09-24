'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface Question {
  id: number;
  question: string;
  reponse: string;
}

function QuestionsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string>('');

  const ticketId = searchParams.get('ticketId');

  useEffect(() => {
    if (!ticketId) {
      router.replace('/');
      return;
    }
    fetchQuestions();
  }, [ticketId, router]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch('/api/questions');
      if (response.ok) {
        const data = await response.json();
        setQuestions(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des questions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const finishSession = useCallback(async () => {
    if (hasAnswered) return;
    setHasAnswered(true);
    
    // Dans la version TEST, pas de libération de queue explicite
    // car on simule juste l'affichage
    setTimeout(() => {
      router.replace('/merci');
    }, 2000); // Laisser le temps de voir le statut
  }, [hasAnswered, router]);

  const handleQuestionClick = useCallback(async (question: Question) => {
    if (hasAnswered || isSubmitting) return;
    
    // Question sélectionnée pour soumission
    setIsSubmitting(true);
    setSubmitStatus('Envoi de la question...');
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: question.id }),
      });
      
      if (response.ok) {
        setSubmitStatus('Question envoyée... Affichage en cours... Réponse envoyée !');
        // Terminer la session après la simulation
        setTimeout(() => {
          finishSession();
        }, 1000);
      } else {
        setSubmitStatus('Erreur lors de l\'envoi');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Erreur submit:', error);
      setSubmitStatus('Erreur de connexion');
      setIsSubmitting(false);
    }
  }, [hasAnswered, isSubmitting, finishSession]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement des questions...</div>
      </div>
    );
  }

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

export default function QuestionsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-xl text-gray-600">Chargement...</div></div>}>
      <QuestionsContent />
    </Suspense>
  );
}


