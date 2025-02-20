
import { motion } from 'framer-motion';

interface WordDisplayProps {
  word: string;
  isCorrect: boolean | null;
}

const WordDisplay = ({ word, isCorrect }: WordDisplayProps) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="text-center py-8"
    >
      <motion.h2
        key={word}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`text-6xl font-bold mb-4 ${
          isCorrect === true
            ? 'text-game-success'
            : isCorrect === false
            ? 'text-game-error'
            : 'text-gray-800'
        }`}
      >
        {word}
      </motion.h2>
      <p className="text-gray-500 text-lg">Say this word</p>
    </motion.div>
  );
};

export default WordDisplay;
