'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface Question {
  id: number;
  question: string;
  reponse: string;
}

export default function Home() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    const init = async () => {
      // Tenter d'acquérir le lock
      try {
        const acquire = await fetch('/api/lock?action=acquire', { method: 'POST' });
        const acquireData = await acquire.json();
        
        if (acquire.ok && acquireData.ok) {
          // Lock acquis ! Charger les questions
          await fetchQuestions();
          return;
        }
      } catch (error) {
        console.error('Erreur acquisition lock:', error);
      }
      
      // Échec d'acquisition : rejoindre la file et rediriger
      try {
        await fetch('/api/queue?action=join', { method: 'POST' });
      } catch {}
      router.replace('/queue');
    };
    
    init();
  }, [router]);

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
    
    // Libérer le lock
    try {
      await fetch('/api/lock?action=release', { method: 'POST' });
    } catch (error) {
      console.error('Erreur libération lock:', error);
    }
    
    // Rediriger vers merci
    router.replace('/merci');
  }, [hasAnswered, router]);

  const handleQuestionClick = useCallback((question: Question) => {
    if (hasAnswered) return;
    setSelectedQuestion(question);
    // Après avoir vu une question, terminer la session
    finishSession();
  }, [hasAnswered, finishSession]);

  const closeModal = useCallback(() => {
    setSelectedQuestion(null);
  }, []);

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
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Questions Techniques
        </h1>
        
        <div className="space-y-4">
          {questions.map((question) => (
            <div
              key={question.id}
              onClick={() => handleQuestionClick(question)}
              className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <p className="text-lg text-gray-700">{question.question}</p>
            </div>
          ))}
        </div>

        {questions.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            Aucune question disponible pour le moment.
          </div>
        )}
      </div>

      {/* Modal pour afficher la réponse */}
      {selectedQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Question
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-700 mb-4">{selectedQuestion.question}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Réponse
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {selectedQuestion.reponse}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}