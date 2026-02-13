// ---------------------------------------------------------
// CONFIGURATION
// ---------------------------------------------------------
const API_KEY = "AIzaSyD_Zi1WgWSypND36zImlqk9pnsBL80gQ-U";
const MODEL_NAME = "gemini-2.0-flash"; // Using the model confirmed in your list

document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const resetBtn = document.getElementById('reset-btn');

    // Initial Scroll
    scrollToBottom();

    // Event Listeners
    sendBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserMessage();
    });

    resetBtn.addEventListener('click', () => {
        chatWindow.innerHTML = '';
        addBotMessage("Conversation cleared. How may I assist you anew?");
    });

    async function handleUserMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        addUserMessage(text);
        userInput.value = '';
        showTypingIndicator();

        try {
            const botResponse = await callGemini(text);
            removeTypingIndicator();
            addBotMessage(botResponse);
        } catch (error) {
            removeTypingIndicator();
            console.error(error);
            addBotMessage(`**Error:** ${error.message}`);
        }
    }

    async function callGemini(userText) {
        // Use models confirmed in your list
        const modelsToTry = ["gemini-2.0-flash", "gemini-2.5-flash"];

        for (const model of modelsToTry) {
            try {
                return await attemptGeminiCall(userText, model);
            } catch (error) {
                // If it's the last model or not a rate limit error, throw it
                if (model === modelsToTry[modelsToTry.length - 1] || !error.message.includes("429")) {
                    throw error;
                }
                console.warn(`Model ${model} rate limited or failed. Trying next...`);
            }
        }
    }

    async function attemptGeminiCall(userText, modelName) {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;

        const payload = {
            contents: [{
                parts: [{ text: userText }]
            }]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.error?.message || `API Error: ${response.status}`;

            // Explicitly throw 429 errors to trigger fallback
            if (response.status === 429 || errorMessage.includes("Quota")) {
                throw new Error("429 Rate Limit Exceeded");
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    }

    // ---------------------------------------------------------
    // UI HELPERS
    // ---------------------------------------------------------
    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    function createMessageElement(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        if (type === 'bot-message') {
            contentDiv.innerHTML = text
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n/g, '<br>');
        } else {
            contentDiv.textContent = text;
        }

        const timeSpan = document.createElement('span');
        timeSpan.className = 'message-time';
        timeSpan.textContent = getCurrentTime();

        messageDiv.appendChild(contentDiv);
        messageDiv.appendChild(timeSpan);

        return messageDiv;
    }

    function addUserMessage(text) {
        const msgElement = createMessageElement(text, 'user-message');
        chatWindow.appendChild(msgElement);
        scrollToBottom();
    }

    function addBotMessage(text) {
        const msgElement = createMessageElement(text, 'bot-message');
        chatWindow.appendChild(msgElement);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'typing-indicator';
        div.id = 'typing-indicator';
        div.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        chatWindow.appendChild(div);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    }

    function scrollToBottom() {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }
});