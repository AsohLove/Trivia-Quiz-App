
import { useMemo } from 'react';
import type { Props } from '../types/database';


export const QuestionCard = ({ 
  question, 
  correctAnswer, 
  incorrectAnswers, 
  selectedAnswer, 
  onAnswerClick, 
  onNext,
  isLastQuestion 
}: Props) => {
  
  const shuffledAnswers = useMemo(() => {
    return [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5);
  }, [question]);

  return (
    <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      <p className="text-xl font-bold text-gray-800 mb-8 text-center">{question}</p>
      
     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shuffledAnswers.map((answer) => {
          const isCorrect = answer === correctAnswer;
          const isClicked = answer === selectedAnswer;
          
          let btnClass = "p-5 rounded-2xl font-semibold transition-all border-2 text-lg ";
          
          if (!selectedAnswer) {
            btnClass += "border-gray-100 bg-gray-50 hover:border-blue-400 hover:bg-blue-50 text-gray-700";
          } else {
            if (isCorrect) {
              btnClass += "bg-green-100 border-green-500 text-green-700 shadow-sm";
            } else if (isClicked) {
              btnClass += "bg-red-100 border-red-500 text-red-700";
            } else {
              btnClass += "bg-white border-gray-50 text-gray-300 opacity-60";
            }
          }

          return (
            <button
              key={answer}
              disabled={!!selectedAnswer}
              className={btnClass}
              onClick={() => onAnswerClick(answer)}
            >
              {answer}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={onNext}
          className={`px-12 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${
            selectedAnswer 
              ? 'bg-indigo-600 hover:bg-indigo-700 transform hover:-translate-y-1' 
              : 'bg-gray-300 text-gray-400 cursor-not-allowed'
          }`}
          disabled={!selectedAnswer}
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next Question →'}
        </button>
      </div>
    </div>
  );
};
