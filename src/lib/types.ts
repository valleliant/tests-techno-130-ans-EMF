export interface Question {
  id: string;
  question: string;
}

export interface QuestionsByCategory {
  [category: string]: Question[];
}

export interface QuestionsData {
  [lang: string]: QuestionsByCategory;
}

export interface QueueEntry {
  id: string;
  question: string;
  lang: string;
  category: string;
  timestamp: string;
  userId: string;
}

