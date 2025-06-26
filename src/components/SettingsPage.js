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

const Card = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  max-width: 600px;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 600;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
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
`;

const BackButton = styled(Button)`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const InfoBox = styled.div`
  background: #e3f2fd;
  border: 1px solid #2196f3;
  border-radius: 10px;
  padding: 15px;
  margin-bottom: 20px;
  color: #1976d2;
`;

const InfoTitle = styled.h3`
  margin-bottom: 10px;
  color: #1565c0;
`;

const InfoText = styled.p`
  margin-bottom: 10px;
  line-height: 1.5;
`;

const CodeBlock = styled.code`
  background: #f5f5f5;
  padding: 5px 8px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
`;

const ModelExamples = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
  color: #666;
`;

const SettingsPage = ({ settings, onUpdateSettings }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    apiKey: settings.apiKey || '',
    modelName: settings.modelName || '',
    hobbies: settings.hobbies || ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdateSettings(formData);
    navigate('/');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <Container>
      <Card>
        <Title>⚙️ Settings</Title>

        <InfoBox>
          <InfoTitle>🔑 LLM API Configuration</InfoTitle>
          <InfoText>
            To use Quizzo, you need to configure your LLM API settings. Here are the supported providers:
          </InfoText>
          
          <div style={{ marginBottom: '15px' }}>
            <strong>OpenAI (GPT):</strong>
            <InfoText>
              • API Key: Get from <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>OpenAI Platform</a><br/>
              • Model Examples: <CodeBlock>gpt-3.5-turbo</CodeBlock>, <CodeBlock>gpt-4</CodeBlock>, <CodeBlock>gpt-4-turbo</CodeBlock>
            </InfoText>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <strong>Anthropic (Claude):</strong>
            <InfoText>
              • API Key: Get from <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>Anthropic Console</a><br/>
              • Model Examples: <CodeBlock>claude-3-sonnet-20240229</CodeBlock>, <CodeBlock>claude-3-opus-20240229</CodeBlock>
            </InfoText>
          </div>

          <div>
            <strong>Google (Gemini):</strong>
            <InfoText>
              • API Key: Get from <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2' }}>Google AI Studio</a><br/>
              • Model Examples: <CodeBlock>gemini-pro</CodeBlock>, <CodeBlock>gemini-1.5-pro</CodeBlock>
            </InfoText>
          </div>
        </InfoBox>

        <FormGroup>
          <Label htmlFor="apiKey">API Key *</Label>
          <Input
            id="apiKey"
            type="password"
            placeholder="Enter your API key..."
            value={formData.apiKey}
            onChange={(e) => handleInputChange('apiKey', e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="modelName">Model Name *</Label>
          <Input
            id="modelName"
            type="text"
            placeholder="e.g., gpt-3.5-turbo, claude-3-sonnet-20240229, gemini-pro"
            value={formData.modelName}
            onChange={(e) => handleInputChange('modelName', e.target.value)}
          />
          <ModelExamples>
            Examples: gpt-3.5-turbo, gpt-4, claude-3-sonnet-20240229, gemini-pro
          </ModelExamples>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="hobbies">Your Interests & Hobbies (Optional)</Label>
          <TextArea
            id="hobbies"
            placeholder="Tell us about your interests, hobbies, or areas of expertise. This will help generate more personalized quiz topics for you. For example: 'I love cooking, especially Italian cuisine, and I'm interested in space exploration and vintage cars.'"
            value={formData.hobbies}
            onChange={(e) => handleInputChange('hobbies', e.target.value)}
          />
        </FormGroup>

        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <Button onClick={handleSave} disabled={!formData.apiKey || !formData.modelName}>
            💾 Save Settings
          </Button>
          <BackButton onClick={handleBack}>
            ← Back to Home
          </BackButton>
        </div>
      </Card>
    </Container>
  );
};

export default SettingsPage; 