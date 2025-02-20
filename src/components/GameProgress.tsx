
import { Progress } from "./ui/progress";

interface GameProgressProps {
  score: number;
  total: number;
}

const GameProgress = ({ score, total }: GameProgressProps) => {
  const progress = (score / total) * 100;

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      <div className="flex justify-between mb-2 text-sm font-medium">
        <span>Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="h-2" />
    </div>
  );
};

export default GameProgress;
