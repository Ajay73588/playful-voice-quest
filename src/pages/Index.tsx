
import { useState } from 'react';
import SpeechRecognitionComponent from '@/components/SpeechRecognitionComponent';
import WordDisplay from '@/components/WordDisplay';
import GameProgress from '@/components/GameProgress';
import { toast } from 'sonner';

// Sample words - in a real app, these would come from an API or database
const words = ['apple', 'banana', 'cat', 'dog', 'elephant', 'fish', 'giraffe', 'house', 'ice cream', 'juice'];

const Index = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSpeechResult = (result: string) => {
    const correct = result.toLowerCase().includes(words[currentWordIndex].toLowerCase());
    setIsCorrect(correct);

    if (correct) {
      toast.success('Great job! 🌟');
      setScore((prev) => prev + 1);
      
      // Move to next word after a short delay
      setTimeout(() => {
        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex((prev) => prev + 1);
          setIsCorrect(null);
        } else {
          toast.success('Congratulations! You completed the game! 🎉');
          // Reset game
          setCurrentWordIndex(0);
          setScore(0);
        }
      }, 1500);
    } else {
      toast.error('Try again!');
    }
  };

  return (
    <div className="min-h-screen bg-game-neutral p-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Voice Learning Game</h1>
          <p className="text-gray-600">Score: {score} / {words.length}</p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <WordDisplay 
            word={words[currentWordIndex]} 
            isCorrect={isCorrect}
          />
          
          <SpeechRecognitionComponent
            onResult={handleSpeechResult}
            currentWord={words[currentWordIndex]}
          />

          <GameProgress 
            score={score} 
            total={words.length} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
