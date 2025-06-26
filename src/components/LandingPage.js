import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
  max-width: 600px;
  line-height: 1.5;
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

const SettingsButton = styled(Button)`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const TopicCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 20px;
  margin: 10px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #667eea;
  }
`;

const TopicTitle = styled.h3`
  color: #333;
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const TopicDescription = styled.p`
  color: #666;
  font-size: 0.9rem;
`;

const CustomTopicInput = styled.div`
  margin: 20px 0;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  margin-bottom: 15px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
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

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  margin-right: 10px;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.3);
  margin: 30px 0;
`;

const LandingPage = ({ topics, loading, error, onGenerateTopics, hasSettings }) => {
  const navigate = useNavigate();
  const [customTopic, setCustomTopic] = useState('');

  const handleTopicSelect = (topic) => {
    navigate(`/quiz/${encodeURIComponent(topic)}`);
  };

  const handleCustomTopic = () => {
    if (customTopic.trim()) {
      navigate(`/quiz/${encodeURIComponent(customTopic.trim())}`);
    }
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  return (
    <Container>
      <Header>
        <Title>🎯 Quizzo</Title>
        <Subtitle>
          Test your knowledge with AI-powered quizzes on quirky and specific topics!
        </Subtitle>
      </Header>

      <Card>
        {!hasSettings && (
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <p style={{ color: '#666', marginBottom: '15px' }}>
              ⚙️ Please configure your LLM settings first
            </p>
            <SettingsButton onClick={handleSettings}>
              Go to Settings
            </SettingsButton>
          </div>
        )}

        {hasSettings && (
          <>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Button 
                onClick={onGenerateTopics} 
                disabled={loading}
              >
                {loading && <LoadingSpinner />}
                {loading ? 'Generating Topics...' : '🎲 Generate Quiz Topics'}
              </Button>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}

            {topics.length > 0 && (
              <div>
                <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
                  📚 Available Topics
                </h2>
                {topics.map((topic, index) => (
                  <TopicCard key={index} onClick={() => handleTopicSelect(topic)}>
                    <TopicTitle>{topic}</TopicTitle>
                    <TopicDescription>Click to start this quiz!</TopicDescription>
                  </TopicCard>
                ))}
              </div>
            )}

            <Divider />

            <CustomTopicInput>
              <h3 style={{ marginBottom: '15px', color: '#333' }}>
                🎯 Or Create Your Own Topic
              </h3>
              <Input
                type="text"
                placeholder="Enter your custom quiz topic..."
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleCustomTopic()}
              />
              <Button 
                onClick={handleCustomTopic}
                disabled={!customTopic.trim()}
              >
                Start Custom Quiz
              </Button>
            </CustomTopicInput>
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <SettingsButton onClick={handleSettings}>
            ⚙️ Settings
          </SettingsButton>
        </div>
      </Card>
    </Container>
  );
};

export default LandingPage; 