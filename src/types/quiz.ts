export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    scores: {
      engineering: number;
      medicine: number;
      arts: number;
      commerce: number;
    };
  }[];
  nextQuestion?: {
    [key: string]: number | null; // Option index -> next question ID
  };
}

export interface CareerScores {
  engineering: number;
  medicine: number;
  arts: number;
  commerce: number;
}

export interface QuizState {
  currentQuestion: number;
  answers: number[];
  scores: CareerScores;
  isComplete: boolean;
  hasStarted: boolean;
}