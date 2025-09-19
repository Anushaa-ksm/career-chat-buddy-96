import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChatMessage } from '@/components/ChatMessage';
import { HealthBar } from '@/components/HealthBar';
import { CareerChart } from '@/components/CareerChart';
import { CareerRoadmap } from '@/components/CareerRoadmap';
import { QUIZ_QUESTIONS, CAREER_PATHS } from '@/data/questions';
import { QuizState, CareerScores } from '@/types/quiz';

const TOTAL_QUESTIONS = 7;

export const CareerQuizBot = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    scores: { engineering: 0, medicine: 0, arts: 0, commerce: 0 },
    isComplete: false,
    hasStarted: false
  });

  const [messages, setMessages] = useState<Array<{ id: number; isBot: boolean; content: string; component?: any }>>([
    {
      id: 1,
      isBot: true,
      content: "👋 Welcome! I'll ask you 7 quick questions to help find your best career path. Let's start!",
    }
  ]);

  const currentQuestion = QUIZ_QUESTIONS[quizState.currentQuestion];

  const handleStart = () => {
    setQuizState(prev => ({ ...prev, hasStarted: true }));
    
    // Add first question after a delay
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
    const newAnswers = [...quizState.answers, optionIndex];
    
    // Update scores
    const newScores: CareerScores = {
      engineering: quizState.scores.engineering + selectedOption.scores.engineering,
      medicine: quizState.scores.medicine + selectedOption.scores.medicine,
      arts: quizState.scores.arts + selectedOption.scores.arts,
      commerce: quizState.scores.commerce + selectedOption.scores.commerce
    };

    // Add user's answer to messages
    setMessages(prev => [...prev, {
      id: Date.now(),
      isBot: false,
      content: selectedOption.text
    }]);

    const isLastQuestion = quizState.currentQuestion >= TOTAL_QUESTIONS - 1;

    if (isLastQuestion) {
      // Complete the quiz
      setQuizState(prev => ({
        ...prev,
        answers: newAnswers,
        scores: newScores,
        isComplete: true
      }));

      // Show completion message and results
      setTimeout(() => {
        const topCareer = Object.entries(newScores).reduce((a, b) => 
          newScores[a[0] as keyof CareerScores] > newScores[b[0] as keyof CareerScores] ? a : b
        );
        
        const secondTopCareer = Object.entries(newScores)
          .filter(([key]) => key !== topCareer[0])
          .reduce((a, b) => 
            newScores[a[0] as keyof CareerScores] > newScores[b[0] as keyof CareerScores] ? a : b
          );

        const topPercentage = Math.round((topCareer[1] / 210) * 100); // Max possible score per category
        const secondPercentage = Math.round((secondTopCareer[1] / 210) * 100);

        setMessages(prev => [...prev, {
          id: Date.now(),
          isBot: true,
          content: `🎯 Based on your answers, your best-fit stream is ${topCareer[0].charAt(0).toUpperCase() + topCareer[0].slice(1)} (${topPercentage}%)! Secondary option: ${secondTopCareer[0].charAt(0).toUpperCase() + secondTopCareer[0].slice(1)} (${secondPercentage}%).`
        }]);
      }, 1000);

    } else {
      // Move to next question
      const nextQuestionIndex = quizState.currentQuestion + 1;
      
      setQuizState(prev => ({
        ...prev,
        currentQuestion: nextQuestionIndex,
        answers: newAnswers,
        scores: newScores
      }));

      // Add next question after a delay
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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Chat Section */}
      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full p-4">
        <div className="mb-4 flex justify-between items-center">
          <HealthBar current={quizState.answers.length} max={TOTAL_QUESTIONS} />
          <div className="font-pixel text-sm text-muted-foreground">
            Q: {quizState.currentQuestion + 1}/{TOTAL_QUESTIONS}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} isBot={message.isBot}>
              {message.content}
            </ChatMessage>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {!quizState.hasStarted && (
            <div className="text-center">
              <Button 
                variant="pixel" 
                size="lg" 
                onClick={handleStart}
                className="w-full max-w-md"
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
                  className="w-full text-left justify-start h-auto py-3 px-4 font-pixel text-sm"
                  onClick={() => handleAnswer(index)}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Live Chart Section */}
      <div className="lg:w-96 p-4 space-y-4">
        {quizState.hasStarted && (
          <CareerChart 
            data={getChartData()} 
            type={quizState.answers.length > 3 ? 'bar' : 'pie'}
          />
        )}

        {quizState.isComplete && getRoadmapData() && (
          <CareerRoadmap 
            primaryPath={getRoadmapData()!.primaryPath}
            secondaryPath={getRoadmapData()!.secondaryPath}
          />
        )}
      </div>
    </div>
  );
};