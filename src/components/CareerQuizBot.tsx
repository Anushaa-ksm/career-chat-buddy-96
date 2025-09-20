import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '@/components/ChatMessage';
import { HealthBar } from '@/components/HealthBar';
import { CareerChart } from '@/components/CareerChart';
import { CareerRoadmap } from '@/components/CareerRoadmap';
import { CareerPathRoadmap } from '@/components/CareerPathRoadmap';
import { QUIZ_QUESTIONS, CAREER_PATHS } from '@/data/questions';
import { QuizState, CareerScores } from '@/types/quiz';

const TOTAL_QUESTIONS = 7;

// Character Component
interface CharacterProps {
  characterType?: 'boy' | 'girl';
}

const Character = ({ characterType = 'boy' }: CharacterProps) => {
  const boySprite = "https://i.imgur.com/3l8WHkY.png";
  const girlSprite = "https://i.imgur.com/JAs4P2x.png"; 

  return (
    <div className="flex justify-center mt-4">
      <img
        src={characterType === 'boy' ? boySprite : girlSprite}
        alt="Pixel art character"
        className="pixelated-image w-24 h-24"
      />
    </div>
  );
};

// Inventory Component
const ITEM_ICONS: { [key: string]: string } = {
  "Logic Rune": "💡",
  "Heart Compass": "❤️",
  "Healing Potion": "🧪",
  "Map of the Realm": "🗺️",
  "Mystical Lute": "🎵",
  "Sturdy Shield": "🛡️",
  "Golden Key": "🔑",
  "Traveler's Boots": "👢",
  "Enchanted Hammer": "🔨",
  "Ancient Scroll": "📜",
  "Prism of Vision": "💎",
  "Royal Decree": "👑",
  "Lightning Bolt": "⚡",
  "Phoenix Feather": "🔥",
  "Storyteller's Quill": "✒️",
  "Bag of Gold": "💰",
  "Dragon's Tooth": "🦷",
  "Sunstone": "☀️",
  "Singing Crystal": "🎤",
  "King's Crown": "👑",
  "Golem's Core": "⚙️",
  "World Tree Sapling": "🌱",
  "Dream Catcher": "🕸️",
  "Throne of Command": "🏰",
};


const Inventory = ({ items }: { items: string[] }) => {
  return (
    <div className="w-full h-auto bg-card/80 border-4 border-border p-4 font-pixel mt-4 animate-in fade-in duration-500">
      <h3 className="text-xs font-bold mb-4 text-card-foreground text-center tracking-wider">INVENTORY</h3>
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, index) => {
          const item = items[index];
          return (
            <div key={index} className="flex flex-col items-center justify-center aspect-square bg-black/10 border-2 border-border/50 p-1">
              {item && (
                <div className="flex flex-col items-center justify-center text-center animate-in zoom-in duration-300">
                  <span className="text-2xl">{ITEM_ICONS[item] || '❓'}</span>
                  <span className="text-[8px] leading-tight mt-1">{item}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};


export const CareerQuizBot = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    scores: { engineering: 0, medicine: 0, arts: 0, commerce: 0 },
    isComplete: false,
    hasStarted: false
  });
  
  const [showResults, setShowResults] = useState(false);
  const [inventory, setInventory] = useState<string[]>([]);

  const [messages, setMessages] = useState<Array<{ id: number; isBot: boolean; content: React.ReactNode; component?: any }>>([
    {
      id: 1,
      isBot: true,
      content: "👋 Welcome! I'll ask you 7 quick questions to help find your best career path. Let's start!",
    }
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  const currentQuestion = QUIZ_QUESTIONS[quizState.currentQuestion];

  const handleStart = () => {
    setQuizState(prev => ({ ...prev, hasStarted: true }));
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        isBot: true,
        content: `Question ${quizState.currentQuestion + 1}/${TOTAL_QUESTIONS}: ${currentQuestion.text}`
      }]);
    }, 1000);
  };

  const handleAnswer = (optionIndex: number) => {
    const selectedOption = currentQuestion.options[optionIndex];
    if (selectedOption.item && inventory.length < 8) {
        setInventory(prev => [...prev, selectedOption.item]);
    }
    const newAnswers = [...quizState.answers, optionIndex];
    
    const newScores: CareerScores = {
      engineering: quizState.scores.engineering + selectedOption.scores.engineering,
      medicine: quizState.scores.medicine + selectedOption.scores.medicine,
      arts: quizState.scores.arts + selectedOption.scores.arts,
      commerce: quizState.scores.commerce + selectedOption.scores.commerce
    };

    setMessages(prev => [...prev, {
      id: Date.now(),
      isBot: false,
      content: selectedOption.text
    }]);

    const isLastQuestion = quizState.currentQuestion >= TOTAL_QUESTIONS - 1;

    if (isLastQuestion) {
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        scores: newScores,
        isComplete: true
      }));

      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: Date.now(),
          isBot: true,
          content: "Analyzing your results...",
        }]);
      }, 1000);

      // Show the final roadmap after a delay
      setTimeout(() => {
        const finalScores = newScores;
        const topCareer = Object.entries(finalScores).reduce((a, b) => 
          finalScores[a[0] as keyof CareerScores] > finalScores[b[0] as keyof CareerScores] ? a : b
        );
        setShowResults(true);
        setMessages(prev => [...prev, {
          id: Date.now(),
          isBot: true,
          content: `Quest Complete! It looks like you're destined for the path of a ${topCareer[0]}! Here is your roadmap.`
        }])
      }, 4000);

    } else {
      const nextQuestionIndex = quizState.currentQuestion + 1;
      
      setQuizState(prev => ({
        ...prev,
        currentQuestion: nextQuestionIndex,
        answers: newAnswers,
        scores: newScores
      }));

      setTimeout(() => {
        const nextQuestion = QUIZ_QUESTIONS[nextQuestionIndex];
        setMessages(prev => [...prev, {
          id: Date.now(),
          isBot: true,
          content: `Question ${nextQuestionIndex + 1}/${TOTAL_QUESTIONS}: ${nextQuestion.text}`
        }]);
      }, 1500);
    }
  };

  const getChartData = () => {
    const total = Object.values(quizState.scores).reduce((sum, score) => sum + score, 0);
    
    if (total === 0) {
      return [
        { name: 'Engineering', value: 25, color: '#22C55E' },
        { name: 'Medicine', value: 25, color: '#EF4444' },
        { name: 'Arts', value: 25, color: '#F59E0B' },
        { name: 'Commerce', value: 25, color: '#3B82F6' }
      ];
    }

    return [
      { name: 'Engineering', value: Math.round((quizState.scores.engineering / total) * 100), color: '#22C55E' },
      { name: 'Medicine', value: Math.round((quizState.scores.medicine / total) * 100), color: '#EF4444' },
      { name: 'Arts', value: Math.round((quizState.scores.arts / total) * 100), color: '#F59E0B' },
      { name: 'Commerce', value: Math.round((quizState.scores.commerce / total) * 100), color: '#3B82F6' }
    ];
  };

  const getRoadmapData = () => {
    if (!quizState.isComplete) return null;

    const chartData = getChartData();
    const sortedData = chartData.sort((a, b) => b.value - a.value);
    
    const primaryPath = {
      stream: sortedData[0].name.toLowerCase(),
      percentage: sortedData[0].value,
      careers: CAREER_PATHS[sortedData[0].name.toLowerCase() as keyof typeof CAREER_PATHS].careers,
      nextSteps: CAREER_PATHS[sortedData[0].name.toLowerCase() as keyof typeof CAREER_PATHS].nextSteps,
      color: sortedData[0].color
    };

    const secondaryPath = sortedData[1].value > 15 ? {
      stream: sortedData[1].name.toLowerCase(),
      percentage: sortedData[1].value,
      careers: CAREER_PATHS[sortedData[1].name.toLowerCase() as keyof typeof CAREER_PATHS].careers,
      nextSteps: CAREER_PATHS[sortedData[1].name.toLowerCase() as keyof typeof CAREER_PATHS].nextSteps,
      color: sortedData[1].color
    } : undefined;

    return { primaryPath, secondaryPath };
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto bg-card/70 border-4 border-foreground shadow-2xl p-4">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col w-full">
          <div className="mb-4 flex justify-between items-center">
            <HealthBar current={quizState.answers.length} max={TOTAL_QUESTIONS} />
            <div className="font-pixel text-sm text-foreground bg-black/20 px-2 py-1">
              Q: {quizState.currentQuestion + 1}/{TOTAL_QUESTIONS}
            </div>
          </div>

          <div ref={chatContainerRef} className="flex-1 overflow-y-auto space-y-4 mb-4 h-96 lg:h-auto pr-2">
            {messages.map((message) => (
              <ChatMessage key={message.id} isBot={message.isBot}>
                {message.content}
                {message.component}
              </ChatMessage>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 mt-auto">
            {!quizState.hasStarted && (
              <div className="text-center">
                <Button 
                  variant="pixel" 
                  size="lg" 
                  onClick={handleStart}
                  className="w-full max-w-md pixel-pulse"
                >
                  START QUEST
                </Button>
              </div>
            )}

            {quizState.hasStarted && !quizState.isComplete && currentQuestion && (
              <div className="space-y-2">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto py-3 px-4 font-pixel text-xs"
                    onClick={() => handleAnswer(index)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Panel Section */}
        <div className="lg:w-96 p-4 space-y-4 bg-black/10 border-2 border-foreground/50">
          {!quizState.isComplete && quizState.hasStarted && (
            <>
              <CareerChart 
                data={getChartData()} 
                type={quizState.answers.length > 3 ? 'bar' : 'pie'}
              />
              <Inventory items={inventory} />
            </>
          )}

          {quizState.isComplete && !showResults && (
            <div className="w-full h-auto bg-card/80 border-4 border-border p-4 font-pixel animate-in fade-in duration-500 flex flex-col justify-center items-center min-h-[288px]">
                <Character />
                <p className="mt-4 font-pixel text-sm text-foreground animate-pulse">Calculating Your Destiny...</p>
            </div>
          )}

          {quizState.isComplete && showResults && getRoadmapData() && (
             <div className="animate-in fade-in duration-500 space-y-4">
                <CareerRoadmap 
                    primaryPath={getRoadmapData()!.primaryPath}
                    secondaryPath={getRoadmapData()!.secondaryPath}
                />
                <CareerPathRoadmap 
                    stream={getRoadmapData()!.primaryPath.stream}
                />
             </div>
          )}
        </div>
      </div>
    </div>
  );
};