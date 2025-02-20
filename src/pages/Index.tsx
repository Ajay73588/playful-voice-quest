
import { useState } from 'react';
import SpeechRecognitionComponent from '@/components/SpeechRecognitionComponent';
import WordDisplay from '@/components/WordDisplay';
import GameProgress from '@/components/GameProgress';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

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
      
      setTimeout(() => {
        if (currentWordIndex < words.length - 1) {
          setCurrentWordIndex((prev) => prev + 1);
          setIsCorrect(null);
        } else {
          toast.success('Congratulations! You completed the game! 🎉');
          setCurrentWordIndex(0);
          setScore(0);
        }
      }, 1500);
    } else {
      toast.error('Try again!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-game-neutral to-white p-4">
      <motion.div 
        className="max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="text-center mb-8">
          <motion.h1 
            className="text-5xl font-bold text-gray-800 mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            Voice Learning Game
          </motion.h1>
          <motion.div
            className="text-xl text-gray-600 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Score: {score} / {words.length}
          </motion.div>
        </header>

        <motion.div 
          className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.01 }}
        >
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
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Index;
