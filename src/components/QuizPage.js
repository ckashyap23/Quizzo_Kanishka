import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LLMService } from '../services/llmService';

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  max-width: 600px;
  width: 100%;
  margin-bottom: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const TopicTitle = styled.h1`
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 10px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 20px;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`;

const QuestionNumber = styled.div`
  text-align: center;
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
`;

const QuestionText = styled.h2`
  color: #333;
  font-size: 1.4rem;
  margin-bottom: 30px;
  line-height: 1.5;
  text-align: center;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
`;

const OptionButton = styled.button`
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  padding: 20px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;
  line-height: 1.4;
  
  &:hover:not(:disabled) {
    border-color: #667eea;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  
  &:disabled {
    cursor: not-allowed;
  }
  
  ${props => props.isSelected && props.isCorrect && `
    background: #4caf50;
    color: white;
    border-color: #4caf50;
  `}
  
  ${props => props.isSelected && !props.isCorrect && `
    background: #f44336;
    color: white;
    border-color: #f44336;
  `}
  
  ${props => props.showCorrect && props.isCorrect && `
    background: #4caf50;
    color: white;
    border-color: #4caf50;
  `}
`;

const FeedbackMessage = styled.div`
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
  
  ${props => props.isCorrect ? `
    background: #e8f5e8;
    color: #2e7d32;
    border: 2px solid #4caf50;
  ` : `
    background: #ffebee;
    color: #c62828;
    border: 2px solid #f44336;
  `}
`;

const Button = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 10px;
  min-width: 200px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ExitButton = styled(Button)`
  background: #f44336;
  
  &:hover {
    background: #d32f2f;
  }
`;

const DifficultySelector = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const DifficultyButton = styled.button`
  padding: 10px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 20px;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  ${props => props.isActive && `
    background: #667eea;
    color: white;
    border-color: #667eea;
  `}
  
  &:hover {
    border-color: #667eea;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(102, 126, 234, 0.3);
  border-radius: 50%;
  border-top-color: #667eea;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const ErrorMessage = styled.div`
  background: #ff6b6b;
  color: white;
  padding: 15px;
  border-radius: 10px;
  margin: 20px 0;
  text-align: center;
`;

const QuizPage = ({ settings, onGenerateTopics }) => {
  const { topic } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [score, setScore] = useState(0);

  useEffect(() => {
    generateQuestions();
  }, [topic, difficulty]);

  const generateQuestions = async () => {
    if (!settings.apiKey || !settings.modelName) {
      setError('Please configure your API settings first');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const llmService = new LLMService(settings.apiKey, settings.modelName);
      const questions = await llmService.generateQuestions(decodeURIComponent(topic), difficulty);
      setQuestions(questions);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setScore(0);
    } catch (err) {
      setError('Failed to generate questions. Please check your API settings.');
      console.error('Error generating questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    if (answerIndex === questions[currentQuestionIndex].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      // Quiz completed
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    // Navigate back to home and generate new topics
    onGenerateTopics();
    navigate('/');
  };

  const handleExit = () => {
    navigate('/');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (loading) {
    return (
      <Container>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <LoadingSpinner />
            <p style={{ fontSize: '1.2rem', color: '#333' }}>
              Generating questions for "{decodeURIComponent(topic)}"...
            </p>
          </div>
        </Card>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Card>
          <ErrorMessage>{error}</ErrorMessage>
          <div style={{ textAlign: 'center' }}>
            <Button onClick={() => navigate('/')}>← Back to Home</Button>
          </div>
        </Card>
      </Container>
    );
  }

  if (questions.length === 0) {
    return (
      <Container>
        <Card>
          <p style={{ textAlign: 'center', color: '#666' }}>
            No questions generated. Please try again.
          </p>
          <div style={{ textAlign: 'center' }}>
            <Button onClick={generateQuestions}>Try Again</Button>
            <Button onClick={() => navigate('/')}>← Back to Home</Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container>
      <Card>
        <Header>
          <TopicTitle>🎯 {decodeURIComponent(topic)}</TopicTitle>
          <ProgressBar>
            <ProgressFill progress={progress} />
          </ProgressBar>
          <QuestionNumber>
            Question {currentQuestionIndex + 1} of {questions.length}
          </QuestionNumber>
        </Header>

        <DifficultySelector>
          <DifficultyButton 
            isActive={difficulty === 'easy'} 
            onClick={() => setDifficulty('easy')}
          >
            Easy
          </DifficultyButton>
          <DifficultyButton 
            isActive={difficulty === 'medium'} 
            onClick={() => setDifficulty('medium')}
          >
            Medium
          </DifficultyButton>
          <DifficultyButton 
            isActive={difficulty === 'hard'} 
            onClick={() => setDifficulty('hard')}
          >
            Hard
          </DifficultyButton>
        </DifficultySelector>

        <QuestionText>{currentQuestion.question}</QuestionText>

        <OptionsContainer>
          {currentQuestion.options.map((option, index) => (
            <OptionButton
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              isSelected={selectedAnswer === index}
              isCorrect={index === currentQuestion.correct}
              showCorrect={showFeedback}
            >
              {String.fromCharCode(65 + index)}. {option}
            </OptionButton>
          ))}
        </OptionsContainer>

        {showFeedback && (
          <FeedbackMessage isCorrect={selectedAnswer === currentQuestion.correct}>
            {selectedAnswer === currentQuestion.correct ? (
              <>
                🎉 Congratulations! That's correct!
                <br />
                <small>Score: {score}/{currentQuestionIndex + 1}</small>
              </>
            ) : (
              <>
                ❌ Incorrect! The correct answer was: {String.fromCharCode(65 + currentQuestion.correct)}. {currentQuestion.options[currentQuestion.correct]}
                <br />
                <small>Score: {score}/{currentQuestionIndex + 1}</small>
              </>
            )}
          </FeedbackMessage>
        )}

        <div style={{ textAlign: 'center' }}>
          {showFeedback && (
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </Button>
          )}
          <ExitButton onClick={handleExit}>
            🚪 Exit Quiz
          </ExitButton>
        </div>
      </Card>
    </Container>
  );
};

export default QuizPage; 