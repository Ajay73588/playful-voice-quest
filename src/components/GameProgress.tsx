
import { Progress } from "./ui/progress";
import { motion } from "framer-motion";

interface GameProgressProps {
  score: number;
  total: number;
}

const GameProgress = ({ score, total }: GameProgressProps) => {
  const progress = (score / total) * 100;

  return (
    <motion.div 
      className="w-full max-w-md mx-auto mt-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex justify-between mb-3 text-sm font-medium">
        <span className="text-gray-600">Progress</span>
        <motion.span 
          key={progress}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-game-primary font-bold"
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
      <Progress 
        value={progress} 
        className="h-3 rounded-full bg-gray-100" 
      />
    </motion.div>
  );
};

export default GameProgress;
