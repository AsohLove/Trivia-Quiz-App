
export type Questions = {
    id: string;
    category: string;
    difficulty: string;
    correctAnswer: string;
    incorrectAnswers: string[];
    question: {
        text: string;
    };
}


export interface Props {
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
  selectedAnswer: string | null;
  onAnswerClick: (answer: string) => void;
  onNext: () => void;
  isLastQuestion: boolean;
}


export interface ResultScreenProps {
  score: number;
  total: number;
}

export interface StartScreenProps {
  onStart: () => void;
}