import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import LandingPage from './components/LandingPage';
import SettingsPage from './components/SettingsPage';
import QuizPage from './components/QuizPage';
import { LLMService } from './services/llmService';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

function App() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('quizzo-settings');
    return saved ? JSON.parse(saved) : {
      apiKey: '',
      modelName: '',
      hobbies: ''
    };
  });

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quizzo-settings', JSON.stringify(settings));
  }, [settings]);

  const generateTopics = async () => {
    if (!settings.apiKey || !settings.modelName) {
      setError('Please configure your API settings first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const llmService = new LLMService(settings.apiKey, settings.modelName);
      const prompt = settings.hobbies 
        ? `Please provide 5 quiz topics based on these interests: ${settings.hobbies}. The topics need to be a little quirky and a little specific. For example, can be Street food in Kolkata and not just Food or Villians in the Avengers series and not just Comics.`
        : `Please provide 5 quiz topics. The topics need to be a little quirky and a little specific. For example, can be Street food in Kolkata and not just Food or Villians in the Avengers series and not just Comics.`;

      const response = await llmService.generateTopics(prompt);
      setTopics(response);
    } catch (err) {
      setError('Failed to generate topics. Please check your API settings.');
      console.error('Error generating topics:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = (newSettings) => {
    setSettings(newSettings);
  };

  return (
    <Router>
      <AppContainer>
        <Routes>
          <Route 
            path="/" 
            element={
              <LandingPage 
                topics={topics}
                loading={loading}
                error={error}
                onGenerateTopics={generateTopics}
                hasSettings={!!(settings.apiKey && settings.modelName)}
              />
            } 
          />
          <Route 
            path="/settings" 
            element={
              <SettingsPage 
                settings={settings}
                onUpdateSettings={updateSettings}
              />
            } 
          />
          <Route 
            path="/quiz/:topic" 
            element={
              <QuizPage 
                settings={settings}
                onGenerateTopics={generateTopics}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App; 