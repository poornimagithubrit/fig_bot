(function() {
    const API_URL = 'http://localhost:5000';

    function initCarAudioBot() {
        if (document.getElementById('car-audio-bot-widget')) return;

        // ✅ Load CSS correctly
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = API_URL + '/static/css/widget.css';
        document.head.appendChild(link);

        // ✅ Create chat container
        const widgetContainer = document.createElement('div');
        widgetContainer.id = 'car-audio-bot-widget';
        document.body.appendChild(widgetContainer);

        // ✅ Load main bot logic
        const script = document.createElement('script');
        script.src = API_URL + '/static/js/widget.js';
        script.onload = function() {
            if (window.CarAudioBot) {
                window.CarAudioBot.init(API_URL);
            }
        };
        document.body.appendChild(script);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCarAudioBot);
    } else {
        initCarAudioBot();
    }
})();
// Example: Load the chat widget dynamically
(function() {
    const script = document.createElement('script');
    script.src = 'http://localhost:5000/static/js/chat.js';
    document.body.appendChild(script);

    // Optionally, you can also inject the chat HTML/CSS here if needed
})();
