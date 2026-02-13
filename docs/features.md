# Features

## Core Functionality
-   **Real-time AI Chat**: Provides instant, conversational responses using Google's Gemini LLM.
-   **Model Switching**: Automatically falls back to `gemini-2.5-flash` if `gemini-2.0-flash` is unavailable or rate-limited.
-   **Typing Indicators**: Visual feedback (animated dots) while the bot is processing a response.
-   **Scroll Management**: Automatically scrolls to the bottom of the chat window on new messages.

## User Interface
-   **Glassmorphism Design**: Features translucent panels, blurred backgrounds, and subtle shadows for a premium look.
-   **Responsive Layout**: Configured with a `viewport` meta tag to adjust to any screen size (mobile, tablet, desktop).
-   **Dynamic Background**: Includes animated gradient glows and scanline effects for futuristic aesthetics.
-   **Reset Functionality**: A dedicated button to clear the conversation history and start fresh.

## Code Structure
-   **Modular Configuration**: API key and model names are defined as constants at the top of `script.js` for easy modification.
-   **Console Logging**: Includes error logging for debugging API failures and rate limits.
