import axios from 'axios';

export class LLMService {
  constructor(apiKey, modelName, azureEndpoint = null, azureDeploymentName = null) {
    this.apiKey = apiKey;
    this.modelName = modelName;
    this.azureEndpoint = azureEndpoint;
    this.azureDeploymentName = azureDeploymentName;
  }

  // Detect which LLM provider to use based on model name
  getProvider() {
    const model = this.modelName.toLowerCase();
    
    if (model.includes('gpt') || model.includes('openai')) {
      // Check if Azure OpenAI is configured
      if (this.azureEndpoint && this.azureDeploymentName) {
        return 'azure-openai';
      }
      return 'openai';
    } else if (model.includes('claude') || model.includes('anthropic')) {
      return 'anthropic';
    } else if (model.includes('gemini') || model.includes('google')) {
      return 'google';
    } else {
      // Default to OpenAI format
      return 'openai';
    }
  }

  async makeRequest(prompt, provider) {
    const headers = {
      'Content-Type': 'application/json',
    };

    let requestData = {};

    switch (provider) {
      case 'azure-openai':
        headers['api-key'] = this.apiKey;
        requestData = {
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000,
          temperature: 0.7
        };
        const azureUrl = `${this.azureEndpoint}/openai/deployments/${this.azureDeploymentName}/chat/completions?api-version=2025-01-01-preview`;
        console.log('🔍 Azure OpenAI URL:', azureUrl);
        console.log('🔍 Azure OpenAI Headers:', { ...headers, 'api-key': '***' });
        console.log('🔍 Azure OpenAI Request Data:', requestData);
        return await axios.post(azureUrl, requestData, { headers });

      case 'openai':
        headers['Authorization'] = `Bearer ${this.apiKey}`;
        requestData = {
          model: this.modelName,
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 1000,
          temperature: 0.7
        };
        return await axios.post('https://api.openai.com/v1/chat/completions', requestData, { headers });

      case 'anthropic':
        headers['x-api-key'] = this.apiKey;
        headers['anthropic-version'] = '2023-06-01';
        requestData = {
          model: this.modelName,
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        };
        return await axios.post('https://api.anthropic.com/v1/messages', requestData, { headers });

      case 'google':
        headers['Authorization'] = `Bearer ${this.apiKey}`;
        requestData = {
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            maxOutputTokens: 1000,
            temperature: 0.7
          }
        };
        return await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/${this.modelName}:generateContent`, requestData, { headers });

      default:
        throw new Error('Unsupported LLM provider');
    }
  }

  extractResponse(response, provider) {
    switch (provider) {
      case 'azure-openai':
      case 'openai':
        return response.data.choices[0].message.content;
      
      case 'anthropic':
        return response.data.content[0].text;
      
      case 'google':
        return response.data.candidates[0].content.parts[0].text;
      
      default:
        return response.data.choices?.[0]?.message?.content || response.data.content?.[0]?.text || response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    }
  }

  async generateTopics(prompt) {
    const provider = this.getProvider();
    console.log('🔍 Detected provider:', provider);
    console.log('🔍 Azure config:', { 
      endpoint: this.azureEndpoint, 
      deploymentName: this.azureDeploymentName,
      modelName: this.modelName 
    });
    
    try {
      const response = await this.makeRequest(prompt, provider);
      const content = this.extractResponse(response, provider);
      
      // Parse the response to extract topics
      const topics = this.parseTopics(content);
      return topics;
    } catch (error) {
      console.error('LLM API Error:', error);
      throw new Error(`Failed to generate topics: ${error.message}`);
    }
  }

  async generateQuestions(topic, difficulty = 'medium') {
    const provider = this.getProvider();
    console.log('🔍 Detected provider:', provider);
    console.log('🔍 Azure config:', { 
      endpoint: this.azureEndpoint, 
      deploymentName: this.azureDeploymentName,
      modelName: this.modelName 
    });
    
    const prompt = `Please provide 5 questions of ${difficulty} difficulty level on the topic "${topic}". For each question, provide 4 possible answers and also the correct answer. Please send in the response as:
Question 1: [question text]
Option 1: [option text]
Option 2: [option text]
Option 3: [option text]
Option 4: [option text]
Correct: [correct option number]

Question 2: [question text]
Option 1: [option text]
Option 2: [option text]
Option 3: [option text]
Option 4: [option text]
Correct: [correct option number]

And so on for all 5 questions.`;

    try {
      const response = await this.makeRequest(prompt, provider);
      const content = this.extractResponse(response, provider);
      
      // Parse the response to extract questions
      const questions = this.parseQuestions(content);
      return questions;
    } catch (error) {
      console.error('LLM API Error:', error);
      throw new Error(`Failed to generate questions: ${error.message}`);
    }
  }

  parseTopics(content) {
    // Try to extract numbered topics from the response
    const lines = content.split('\n').filter(line => line.trim());
    const topics = [];
    
    for (const line of lines) {
      // Look for numbered topics (1., 2., etc.) or bullet points
      const match = line.match(/^\d+\.\s*(.+)$/) || line.match(/^[-*]\s*(.+)$/) || line.match(/^(.+)$/);
      if (match && match[1].trim()) {
        const topic = match[1].trim();
        if (topic.length > 3 && !topics.includes(topic)) {
          topics.push(topic);
        }
      }
    }
    
    // If we couldn't parse properly, split by common delimiters
    if (topics.length === 0) {
      const possibleTopics = content.split(/[,\n]/).filter(t => t.trim().length > 3);
      return possibleTopics.slice(0, 5).map(t => t.trim());
    }
    
    return topics.slice(0, 5);
  }

  parseQuestions(content) {
    const questions = [];
    const lines = content.split('\n').filter(line => line.trim());
    
    let currentQuestion = null;
    
    for (const line of lines) {
      const questionMatch = line.match(/Question\s*\d*:\s*(.+)/i);
      const optionMatch = line.match(/Option\s*(\d+):\s*(.+)/i);
      const correctMatch = line.match(/Correct:\s*(\d+)/i);
      
      if (questionMatch) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        currentQuestion = {
          question: questionMatch[1].trim(),
          options: [],
          correct: null
        };
      } else if (optionMatch && currentQuestion) {
        const optionNumber = parseInt(optionMatch[1]);
        const optionText = optionMatch[2].trim();
        currentQuestion.options[optionNumber - 1] = optionText;
      } else if (correctMatch && currentQuestion) {
        currentQuestion.correct = parseInt(correctMatch[1]) - 1;
      }
    }
    
    // Add the last question
    if (currentQuestion && currentQuestion.options.length > 0) {
      questions.push(currentQuestion);
    }
    
    // If parsing failed, create a fallback structure
    if (questions.length === 0) {
      const sections = content.split(/Question\s*\d*:/i).filter(s => s.trim());
      sections.forEach((section, index) => {
        if (index === 0) return; // Skip the first empty section
        
        const lines = section.split('\n').filter(l => l.trim());
        if (lines.length >= 5) {
          const question = {
            question: lines[0].trim(),
            options: lines.slice(1, 5).map(l => l.replace(/^Option\s*\d*:\s*/i, '').trim()),
            correct: 0 // Default to first option
          };
          questions.push(question);
        }
      });
    }
    
    return questions.slice(0, 5); // Ensure max 5 questions
  }
} 