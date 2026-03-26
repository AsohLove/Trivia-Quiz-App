import type { ResultScreenProps, StartScreenProps } from "../types/database";

export const StartScreen = ({ onStart }: StartScreenProps) => (
  <div className="flex flex-col items-center justify-center h-screen gap-6">
    <h1 className="font-bold text-4xl text-blue-600">Trivia App</h1>
    <button 
      className="p-4 px-10 bg-green-500 hover:bg-green-600 rounded-lg text-white font-bold text-xl transition-all"
      onClick={onStart}
    >
      Start Quiz
    </button>
  </div>
);

export const ResultScreen = ({ score, total }: ResultScreenProps) => (
  <div className="flex flex-col items-center mt-10 gap-4">
    <h2 className="text-2xl font-bold text-gray-800">Final Game Results</h2>
    <p className="text-xl">Player Score: <span className={`font-bold ${score >= 5 ? "text-green-600" : "text-red-600" }`}>{score}</span> / {total}</p>
    <button 
      className="p-3 bg-blue-500 text-white rounded-lg"
      onClick={() => window.location.reload()}
    >
      Play Again
    </button>
  </div>
);