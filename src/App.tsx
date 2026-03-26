import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchQuestions } from './api/fetchQuestions';
import { QuestionCard } from './components/QuestionCard';
import { ResultScreen, StartScreen } from './components/QuizScreen';

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showScore, setShowScore] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['questions'],
    queryFn: fetchQuestions,
    enabled: isStarted,
  });

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    if (answer === data?.[currentIndex].correctAnswer) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (data && currentIndex < data.length - 1) {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  if (!isStarted) return <StartScreen onStart={() => setIsStarted(true)} />;
  if (isLoading) return <div className="flex h-screen items-center justify-center font-bold text-4xl text-blue-500">Loading questions...</div>;
  if (showScore) return <ResultScreen score={score} total={data?.length || 0} />;

  const currentQ = data![currentIndex];

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <header className="mb-8 text-center">
        <h1 className="text-gray-700 font-black uppercase tracking-widest text-sm mb-2">Trivia Challenge</h1>
          <h1 className="text-gray-400 font-bold mb-8">Question {currentIndex + 1} of {data?.length}</h1>
      </header>

      <QuestionCard
        question={currentQ.question.text}
        correctAnswer={currentQ.correctAnswer}
        incorrectAnswers={currentQ.incorrectAnswers}
        selectedAnswer={selectedAnswer}
        onAnswerClick={handleAnswerClick}
        onNext={handleNext}
        isLastQuestion={currentIndex === data!.length - 1}
      />
    </main>
  );
}

export default App;
