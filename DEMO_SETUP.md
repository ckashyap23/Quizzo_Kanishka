# 🚀 Quick Demo Setup

## Testing Without API Keys

If you want to test the app's UI and functionality without setting up your own LLM API keys, you can use these demo credentials:

### Option 1: OpenAI (GPT-3.5 Turbo)
- **API Key**: `sk-demo-key-for-testing-only`
- **Model Name**: `gpt-3.5-turbo`

### Option 2: Anthropic (Claude)
- **API Key**: `sk-ant-demo-key-for-testing-only`
- **Model Name**: `claude-3-sonnet-20240229`

### Option 3: Google (Gemini)
- **API Key**: `demo-key-for-testing-only`
- **Model Name**: `gemini-pro`

## ⚠️ Important Notes

- **These are demo keys and won't work with real API calls**
- **The app will show error messages when trying to generate topics/questions**
- **This is only for testing the UI and user flow**
- **For full functionality, you need real API keys from the providers**

## 🎯 Demo Flow

1. **Start the app**: `npm start`
2. **Go to Settings**: Click the "Settings" button
3. **Enter demo credentials**: Use any of the demo keys above
4. **Add interests**: Try "I love cooking, space exploration, and vintage cars"
5. **Save settings**: Click "Save Settings"
6. **Generate topics**: Click "Generate Quiz Topics"
7. **Test UI**: Navigate through the app to see the interface

## 🔧 For Real Usage

To use the app with real AI-generated content:

1. **Get a real API key** from one of the supported providers
2. **Replace demo credentials** with your real API key and model name
3. **Start generating** real quiz topics and questions!

## 📱 Features to Test

- ✅ Settings page configuration
- ✅ Landing page with topic generation
- ✅ Custom topic input
- ✅ Quiz interface (without real questions)
- ✅ Difficulty selector
- ✅ Progress tracking
- ✅ Mobile-responsive design
- ✅ Navigation between pages

---

**Note**: The app is designed to handle API errors gracefully, so you'll see appropriate error messages when using demo keys. 