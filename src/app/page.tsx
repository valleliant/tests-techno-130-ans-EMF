'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [hasLock, setHasLock] = useState<boolean>(false);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inactivityRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const init = async () => {
      // Tenter d'acquérir le lock
      try {
        const acquire = await fetch('/api/lock?action=acquire', { method: 'POST' });
        if (acquire.ok) {
          setHasLock(true);
          startHeartbeat();
          startInactivityTimer();
          await fetchQuestions();
          return;
        }
      } catch {}
      // Échec: rejoindre la file et rediriger
      try {
        await fetch('/api/queue?action=join', { method: 'POST' });
      } catch {}
      router.replace('/queue');
    };
    init();

    return () => {
      stopHeartbeat();
      clearInactivity();
    };
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

  const startHeartbeat = () => {
    stopHeartbeat();
    heartbeatRef.current = setInterval(() => {
      fetch('/api/lock?action=heartbeat', { method: 'POST' }).catch(() => {});
    }, 20000);
  };

  const stopHeartbeat = () => {
    if (heartbeatRef.current) {
      clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
    }
  };

  const startInactivityTimer = () => {
    clearInactivity();
    inactivityRef.current = setTimeout(() => {
      finishSession();
    }, 60000);
  };

  const clearInactivity = () => {
    if (inactivityRef.current) {
      clearTimeout(inactivityRef.current);
      inactivityRef.current = null;
    }
  };

  const finishSession = async () => {
    if (hasAnswered) return;
    setHasAnswered(true);
    stopHeartbeat();
    clearInactivity();
    try {
      await fetch('/api/lock?action=release', { method: 'POST' });
    } catch {}
    try {
      await fetch('/api/queue?action=popIfFirst', { method: 'POST' });
    } catch {}
    router.replace('/merci');
  };

  const handleQuestionClick = (question: Question) => {
    if (hasAnswered) return;
    setSelectedQuestion(question);
    // Considérer le clic comme la "réponse unique" puis finir
    finishSession();
  };

  const closeModal = () => {
    setSelectedQuestion(null);
  };

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
        {!hasLock && (
          <div className="text-center text-red-500 mb-6">
            Accès en cours... redirection vers la file d’attente si nécessaire.
          </div>
        )}
        
        {hasLock && (
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
        )}

        {hasLock && questions.length === 0 && (
          <div className="text-center text-gray-500 mt-12">
            Aucune question disponible pour le moment.
          </div>
        )}
      </div>

      {/* Modal pour afficher la réponse */}
      {hasLock && selectedQuestion && (
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
