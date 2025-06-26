# 🎯 Quizzo - AI-Powered Quiz App

A modern, mobile-first React quiz application that generates personalized quiz topics and questions using Large Language Models (LLMs). Test your knowledge on quirky and specific topics with AI-generated questions!

## ✨ Features

- **🤖 AI-Powered Questions**: Generate quiz topics and questions using popular LLMs (OpenAI GPT, Anthropic Claude, Google Gemini)
- **🎨 Beautiful Mobile UI**: Modern, responsive design optimized for mobile devices
- **⚙️ Easy Configuration**: Simple settings page to configure your LLM API credentials
- **🎯 Personalized Topics**: Add your interests and hobbies to get customized quiz topics
- **📊 Real-time Feedback**: Instant feedback on answers with correct/incorrect indicators
- **🎚️ Difficulty Levels**: Choose between Easy, Medium, and Hard difficulty
- **🔄 Custom Topics**: Create your own quiz topics or use AI-generated ones
- **📱 Progressive Web App**: Works offline and can be installed on mobile devices

## 🚀 Quick Start

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- An API key from one of the supported LLM providers

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd QuizzoApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 API Configuration

### Supported LLM Providers

#### 1. OpenAI (GPT)
- **API Key**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
- **Model Examples**: `gpt-3.5-turbo`, `gpt-4`, `gpt-4-turbo`

#### 2. Anthropic (Claude)
- **API Key**: Get from [Anthropic Console](https://console.anthropic.com/)
- **Model Examples**: `claude-3-sonnet-20240229`, `claude-3-opus-20240229`

#### 3. Google (Gemini)
- **API Key**: Get from [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Model Examples**: `gemini-pro`, `gemini-1.5-pro`

### Setup Instructions

1. **Get an API Key**: Choose your preferred LLM provider and obtain an API key
2. **Configure Settings**: Click the "Settings" button in the app
3. **Enter Credentials**: 
   - Paste your API key
   - Enter the model name (e.g., `gpt-3.5-turbo`)
   - Optionally add your interests/hobbies for personalized topics
4. **Save Settings**: Click "Save Settings" to store your configuration

## 🎮 How to Use

### 1. Generate Quiz Topics
- Click "Generate Quiz Topics" to get 5 AI-generated quiz topics
- Topics are based on your interests (if provided) and are designed to be quirky and specific

### 2. Select a Topic
- Choose from the generated topics or create your own custom topic
- Click on any topic to start the quiz

### 3. Take the Quiz
- Select your difficulty level (Easy, Medium, Hard)
- Answer questions one by one
- Get instant feedback on your answers
- Track your progress with the progress bar

### 4. Complete and Repeat
- Finish all 5 questions
- View your final score
- Generate new topics for another round

## 🛠️ Technical Details

### Built With
- **React 18**: Modern React with hooks and functional components
- **React Router**: Client-side routing
- **Styled Components**: CSS-in-JS styling
- **Axios**: HTTP client for API calls
- **Local Storage**: Persistent settings storage

### Project Structure
```
src/
├── components/
│   ├── LandingPage.js      # Main landing page with topics
│   ├── SettingsPage.js     # API configuration page
│   └── QuizPage.js         # Quiz interface
├── services/
│   └── llmService.js       # LLM API integration
├── App.js                  # Main app component with routing
├── index.js               # App entry point
└── index.css              # Global styles
```

### Key Features Implementation

#### LLM Service
- Supports multiple LLM providers (OpenAI, Anthropic, Google)
- Automatic provider detection based on model name
- Robust error handling and response parsing
- Structured prompt engineering for consistent results

#### Mobile-First Design
- Responsive layout that works on all screen sizes
- Touch-friendly interface with proper button sizes
- Smooth animations and transitions
- Progressive Web App capabilities

#### State Management
- Local state with React hooks
- Persistent settings storage
- Real-time quiz progress tracking
- Score calculation and feedback

## 🔧 Customization

### Adding New LLM Providers
To add support for a new LLM provider, modify the `LLMService` class in `src/services/llmService.js`:

1. Add provider detection logic in `getProvider()`
2. Add API request logic in `makeRequest()`
3. Add response extraction logic in `extractResponse()`

### Styling Customization
The app uses styled-components for styling. You can customize the theme by modifying the color variables and gradients in the styled components.

### Prompt Customization
Modify the prompts in the `LLMService` class to change how topics and questions are generated.

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **Firebase**: Use Firebase Hosting
- **GitHub Pages**: Deploy to GitHub Pages

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check that your API key is valid and has sufficient credits
2. Verify your model name is correct for your chosen provider
3. Ensure you have a stable internet connection
4. Check the browser console for any error messages

## 🎯 Future Enhancements

- [ ] User accounts and progress tracking
- [ ] Quiz history and statistics
- [ ] Social sharing of quiz results
- [ ] Offline mode with cached questions
- [ ] Multiplayer quiz mode
- [ ] Voice-based questions and answers
- [ ] Image-based questions
- [ ] Quiz categories and themes

---

**Happy Quizzing! 🎉** 