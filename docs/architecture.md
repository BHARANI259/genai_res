# Architecture

## Overview
The Hotel Reservation Chatbot is a client-side web application that interacts directly with Google's Gemini API. It uses a minimalist architecture requiring only a static file server to run.

## Tech Stack
-   **Frontend**: HTML5, CSS3, JavaScript (ES6+)
-   **AI Engine**: Google Gemini API (Models: 2.0-flash, 2.5-flash)
-   **Hosting**: Python `http.server` (or any static host)

## System Components

### 1. Client Implementation (`index.html`, `style.css`)
-   **Structure**: Semantic HTML5 layout containing the chat interface.
-   **Styling**: 
    -   Uses modern CSS variables for theming.
    -   Implements "Glassmorphism" using backdrop-filters and semi-transparent backgrounds.
    -   Responsive design for various device sizes.

### 2. Logic Controller (`script.js`)
-   **Event Handling**: Manages user input, button clicks (Send, Reset), and keyboard events.
-   **UI Updates**: Dynamically injects user and bot messages into the DOM. Handles scrolling and typing indicators.
-   **API Integration**:
    -   `callGemini(userText)`: Managing model fallback strategies.
    -   `attemptGeminiCall(userText, modelName)`: Executes the actual `fetch` request to Google's API.

## Data Flow
1.  **User Input**: User types a message and submits.
2.  **Display**: Message is immediately displayed in the chat window.
3.  **API Request**: Application sends a POST request to `https://generativelanguage.googleapis.com`.
    -   *Note*: Currently sends only the immediate prompt, not the full conversation history.
4.  **Processing**: Gemini API processes the text and returns a candidate response.
5.  **Fallback**: If the primary model (2.0-flash) fails/rate-limits, the system automatically retries with the secondary model (2.5-flash).
6.  **Response**: The text response is rendered in the chat window.

## Security Note
Currently, the API key is exposed in the client-side code (`script.js`). For production environments, this should be moved to a backend proxy to prevent unauthorized usage.
