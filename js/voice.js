const voiceAssistant = {
  recognition: null,
  isListening: false,
  popup: null,
  startButton: null,
  textInput: null,
  chatBody: null,

  init() {
    this.popup = document.querySelector('[data-assistant-popup]');
    this.startButton = document.querySelector('[data-assistant-toggle]');
    this.textInput = document.querySelector('[data-assistant-input]');
    this.chatBody = document.querySelector('[data-assistant-chat]');

    document.querySelectorAll('[data-assistant-toggle]').forEach((button) => {
      button.addEventListener('click', () => this.togglePopup());
    });

    if (this.textInput) {
      this.textInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') this.handleTextCommand(this.textInput.value);
      });
    }

    const sendBtn = document.querySelector('[data-assistant-send]');
    if (sendBtn) sendBtn.addEventListener('click', () => this.handleTextCommand(this.textInput?.value || ''));

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.lang = 'en-IN';
      this.recognition.interimResults = false;
      this.recognition.continuous = false;
      this.recognition.onstart = () => {
        this.isListening = true;
        this.popup?.classList.add('listening');
        this.appendBot('Listening...');
      };
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.handleTextCommand(transcript, true);
      };
      this.recognition.onerror = () => {
        this.appendBot('I could not understand that. Try a command like "Show action movies" or "Search Leo".');
      };
      this.recognition.onend = () => {
        this.isListening = false;
        this.popup?.classList.remove('listening');
      };
    } else {
      this.appendBot('Voice recognition is not supported in this browser. You can still use CineBot using text commands.');
    }
  },

  togglePopup() {
    if (!this.popup) return;
    this.popup.classList.toggle('open');
    if (this.popup.classList.contains('open') && !this.chatBody?.children.length) {
      this.appendBot('Hi! I’m CineBot. What would you like to watch?');
    }
  },

  appendUser(text) {
    if (!this.chatBody) return;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user';
    bubble.textContent = text;
    this.chatBody.appendChild(bubble);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  },

  appendBot(text) {
    if (!this.chatBody) return;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble bot';
    bubble.textContent = text;
    this.chatBody.appendChild(bubble);
    this.chatBody.scrollTop = this.chatBody.scrollHeight;
  },

  handleTextCommand(text, isVoice = false) {
    const command = (text || '').trim();
    if (!command) return;
    this.appendUser(command);
    if (this.textInput) this.textInput.value = '';

    const lower = command.toLowerCase();
    let response = 'Sure. Let me help you with that.';

    if (lower.includes('action')) {
      response = 'Sure. Here are the available action movies.';
      window.location.href = 'movies.html?genre=Action';
    } else if (lower.includes('leo')) {
      response = 'Showing Leo movie details.';
      const movie = appUtils.getMovieById(1);
      if (movie) {
        window.location.href = `movie-details.html?id=${movie.id}`;
      }
    } else if (lower.includes('tamil')) {
      response = 'Showing Tamil movies near you.';
      window.location.href = 'movies.html?language=Tamil';
    } else if (lower.includes('imax')) {
      response = 'Showing IMAX movies.';
      window.location.href = 'movies.html?format=IMAX';
    } else if (lower.includes('book')) {
      response = 'Let’s begin booking.';
      window.location.href = 'movies.html';
    } else if (lower.includes('booking') || lower.includes('my bookings')) {
      response = 'Opening your bookings.';
      window.location.href = 'bookings.html';
    } else if (lower.includes('home')) {
      response = 'Opening the home page.';
      window.location.href = 'index.html';
    } else if (lower.includes('theatre') || lower.includes('theatres')) {
      response = 'Here are the theatres.';
      window.location.href = 'theatres.html';
    } else if (lower.includes('help')) {
      response = 'You can search movies, view bookings, check theatres, and book tickets.';
    } else if (lower.includes('search')) {
      const value = command.replace(/search/i, '').trim();
      if (value) {
        response = `Searching for ${value}.`;
        window.location.href = `movies.html?search=${encodeURIComponent(value)}`;
      }
    }

    if (isVoice && this.recognition) {
      const speech = new SpeechSynthesisUtterance(response);
      speech.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(speech);
    }

    this.appendBot(response);
  },

  startListening() {
    if (!this.recognition) {
      this.appendBot('Voice recognition is not supported in this browser. You can still use CineBot using text commands.');
      return;
    }

    if (this.isListening) {
      this.recognition.stop();
      return;
    }

    this.recognition.start();
  }
};

window.addEventListener('DOMContentLoaded', () => {
  voiceAssistant.init();
  const micButton = document.querySelector('[data-assistant-mic]');
  if (micButton && voiceAssistant.recognition) {
    micButton.addEventListener('click', () => voiceAssistant.startListening());
  }
});
