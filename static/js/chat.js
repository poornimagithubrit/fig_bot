const chatButton = document.getElementById('chat-button');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');
const loading = document.getElementById('loading');

// Toggle chat window
chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) {
        chatInput.focus();
    }
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.add('hidden');
});

// Send message function
async function sendMessage() {
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessage(message, 'user');
    chatInput.value = '';
    
    // Disable input while processing
    chatInput.disabled = true;
    sendBtn.disabled = true;
    loading.classList.remove('hidden');
    
    try {
        // Send to backend
        const response = await fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        });
        
        const data = await response.json();
        
        if (data.success) {
            addMessage(data.message, 'bot');
        } else {
            addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('Sorry, I could not connect to the server. Please try again.', 'bot');
    } finally {
        // Re-enable input
        chatInput.disabled = false;
        sendBtn.disabled = false;
        loading.classList.add('hidden');
        chatInput.focus();
    }
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'bot-message';
    
    const messageParagraph = document.createElement('p');
    messageParagraph.textContent = text;
    
    messageDiv.appendChild(messageParagraph);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Send on button click
sendBtn.addEventListener('click', sendMessage);

// Send on Enter key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
(function() {
    // Inject chat HTML structure
    if (!document.getElementById('chat-window')) {
        const chatHTML = `
            <button id="chat-button" class="chat-button">
                <span>💬</span>
            </button>
            <div id="chat-window" class="chat-window hidden">
                <div class="chat-header">
                    <h3>Car Speaker Assistant</h3>
                    <button id="close-chat">×</button>
                </div>
                <div id="chat-messages" class="chat-messages"></div>
                <div id="loading" class="loading hidden">
                    <div class="loading-spinner"></div>
                </div>
                <div class="chat-input-container">
                    <input type="text" id="chat-input" placeholder="Type your message...">
                    <button id="send-btn">Send</button>
                </div>
            </div>
        `;
        const container = document.createElement('div');
        container.innerHTML = chatHTML;
        document.body.appendChild(container);
    }

    // Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'http://localhost:5000/static/css/style.css';
    document.head.appendChild(link);

    // Inject chat.js
    const script = document.createElement('script');
    script.src = 'http://localhost:5000/static/js/chat.js';
    document.body.appendChild(script);
})();
