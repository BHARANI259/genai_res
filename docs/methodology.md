# Methodology

## Design Philosophy

### Client-Centric Architecture
The decision to implement the chatbot as a purely client-side application was driven by the goal of minimizing server-side dependencies. By interacting directly with Google's API, the application eliminates the need for a complex backend, making deployment as simple as hosting static files.

### Visual Aesthetic
The interface uses "Glassmorphism" to create a sense of depth and modernity. This is achieved through:
-   **Backdrop Filters**: Applying `blur` to semi-transparent backgrounds.
-   **Lighting Effects**: Subtle box-shadows and gradients to mimic light refraction.
-   **Typography**: Using clean, sans-serif fonts (Outfit) paired with elegant serifs (Playfair Display) for a premium feel.

## Integration Strategy

### API Communication
The application uses the native `fetch` API for network requests, avoiding heavy libraries like Axios. This keeps the bundle size minimal.

### Error Handling & Resilience
A key challenge with public LLM APIs is rate limiting. To address this, the `callGemini` function implements a "fallback chain":
1.  **Primary Attempt**: Configured to use `gemini-2.0-flash` for optimal speed/cost.
2.  **Error Detection**: Catches specific HTTP 429 (Too Many Requests) errors.
3.  **Secondary Attempt**: Automatically retries with `gemini-2.5-flash` if the primary fails.
4.  **User Feedback**: Should all attempts fail, a friendly error message is displayed to the user.

## Future Considerations
-   **Security**: Moving the API key to a server-side proxy/environment variable system is recommended for production deployment.
-   **Context**: Implementing a message history buffer (e.g., last 10 messages) to enable multi-turn conversation context, as the current implementation is stateless per request.
