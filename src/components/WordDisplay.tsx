
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
      <motion.div
        initial={false}
        animate={{
          scale: isCorrect === true ? [1, 1.2, 1] : 1,
          rotate: isCorrect === false ? [-5, 5, -5, 0] : 0
        }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          key={word}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`text-7xl font-bold mb-6 ${
            isCorrect === true
              ? 'text-game-success'
              : isCorrect === false
              ? 'text-game-error'
              : 'bg-gradient-to-r from-game-primary to-game-secondary bg-clip-text text-transparent'
          }`}
        >
          {word}
        </motion.h2>
      </motion.div>
      <motion.p 
        className="text-gray-500 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Say this word
      </motion.p>
    </motion.div>
  );
};

export default WordDisplay;
