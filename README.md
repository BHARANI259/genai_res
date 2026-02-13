# Premium Hotel Reservation Chatbot

A luxurious, AI-powered hotel reservation assistant built with a premium glassmorphic design and integrated with **Google Gemini AI**.

![Project Status](https://img.shields.io/badge/Status-Active-success)
![AI Model](https://img.shields.io/badge/AI-Gemini%202.0%20Flash-blue)

## ✨ Features

-   **Premium UI/UX**:
    -   Modern **Glassmorphism** design with frosted glass effects.
    -   Deep "Midnight & Gold" luxury color palette.
    -   Smooth message animations and typing indicators.
    -   Responsive layout for mobile and desktop.
    -   Dynamic background with overlay effects.

-   **Intelligent Assistance**:
    -   Powered by **Google Gemini 2.0/2.5 Flash** models.
    -   Capable of handling complex booking queries naturally.
    -   Context-aware conversational flow.

## 🚀 Getting Started

### Prerequisites

-   Python 3.x (for the local server)
-   A modern web browser (Chrome, Edge, Firefox)
-   Active Internet connection (for Gemini API)

### Installation & Run

1.  **Clone the Repository** (or download the files):
    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the project directory**:
    ```bash
    cd hotel-reservation-chatbot
    ```

3.  **Start the Application**:
    -   **Windows**: Double-click the `start.bat` file.
    -   **Manual**: Run the following command in your terminal:
        ```bash
        python -m http.server 8000
        ```

4.  **Access the Chatbot**:
    Open your browser and navigate to: [http://localhost:8000](http://localhost:8000)

## 🛠️ Configuration

The project is currently configured to use a hardcoded API key for demonstration purposes. To use your own Google Gemini API key:

1.  Open `script.js`.
2.  Locate the configuration section at the top:
    ```javascript
    const API_KEY = "YOUR_API_KEY_HERE";
    ```
3.  Replace the value with your own key from [Google AI Studio](https://aistudio.google.com/).

## 🎨 Technologies

-   **HTML5**: Semantic structure.
-   **CSS3**: Custom properties (Variables), Flexbox, Glassmorphism effects.
-   **JavaScript (ES6+)**: Async/Await, Fetch API for Gemini integration.
-   **Python**: Simple HTTP Server for local hosting.

## 📄 License

This project is open-source and available for educational purposes.
