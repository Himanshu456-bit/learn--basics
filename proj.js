// script.js

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

// Rule-based responses
const getBotResponse = (userMessage) => {
    const message = userMessage.toLowerCase().trim();
    
    // Respond based on common patterns or keywords
    if (message.includes("hello") || message.includes("hi")) {
        return "Hello! How can I assist you today?";
    } else if (message.includes("how are you")) {
        return "I'm just a chatbot, but I'm doing great, thank you for asking!";
    } else if (message.includes("bye") || message.includes("goodbye")) {
        return "Goodbye! Have a great day!";
    } else if (message.includes("your name")) {
        return "I am a chatbot created to assist you!";
    } else if (message.includes("help")) {
        return "Sure, I can help! What do you need assistance with?";
    } else {
        return "Sorry, I didn't understand that. Can you please rephrase?";
    }
};

// Function to append messages to the chat box
const appendMessage = (message, sender) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
};

// Function to handle sending messages
const handleSend = () => {
    const userMessage = userInput.value.trim();
    if (!userMessage) return; // Don't send empty messages

    // Display user's message
    appendMessage(userMessage, 'user');
    userInput.value = ''; // Clear the input field

    // Get the bot's response based on the user message
    const botResponse = getBotResponse(userMessage);

    // Display bot's response
    appendMessage(botResponse, 'bot');
};

// Event listeners for the send button and Enter key
sendButton.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
