
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface SpeechRecognitionComponentProps {
  onResult: (result: string) => void;
  currentWord: string;
}

const SpeechRecognitionComponent = ({ onResult, currentWord }: SpeechRecognitionComponentProps) => {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript.toLowerCase();
        onResult(result);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast.error('Oops! Something went wrong with speech recognition.');
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [onResult]);

  const toggleListening = () => {
    if (!recognition) {
      toast.error('Speech recognition is not supported in your browser');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(currentWord);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div 
      className="flex gap-6 justify-center items-center mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={toggleListening}
          variant="outline"
          size="lg"
          className={`transition-all duration-300 p-8 rounded-2xl shadow-lg ${
            isListening
              ? 'bg-game-error hover:bg-game-error/90'
              : 'bg-game-primary hover:bg-game-primary/90'
          }`}
        >
          {isListening ? (
            <MicOff className="h-8 w-8 text-white animate-pulse" />
          ) : (
            <Mic className="h-8 w-8 text-white" />
          )}
        </Button>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={speak}
          variant="outline"
          size="lg"
          className="bg-game-secondary hover:bg-game-secondary/90 p-8 rounded-2xl shadow-lg"
        >
          <Volume2 className="h-8 w-8 text-white" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default SpeechRecognitionComponent;
