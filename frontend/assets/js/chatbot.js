// @ts-nocheck
// ================================
// chatbot.js - Chatbot Logic
// ================================

// Wrap everything inside an init function
function initChatbot() {
  // Get DOM elements
  const chatContainer = document.getElementById("chat-container");
  const chatForm = document.getElementById("chat-form");
  const chatInput = chatForm?.querySelector("input");
  const chatIcon = document.getElementById("chat-icon");
  const chatBox = document.getElementById("chatbox");

  if (!chatContainer || !chatForm || !chatInput || !chatIcon || !chatBox) {
    console.warn("Chatbot elements not found. Initialization aborted.");
    return;
  }

  // ==========================================
  // Add message to chat and optionally save
  // ==========================================
  function addMessage(message, sender = "bot", save = true) {
    const messageEl = document.createElement("div");
    messageEl.classList.add("message", sender);
    messageEl.textContent = message;
    chatContainer.appendChild(messageEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;

    if (save) saveMessage(message, sender);
  }

  // ==========================================
  // Save message to localStorage for persistence
  // ==========================================
  function saveMessage(message, sender) {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.push({ message, sender });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
  }

  // ==========================================
  // Load chat history from localStorage
  // ==========================================
  function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.forEach(item => addMessage(item.message, item.sender, false));
  }

  // ==========================================
  // Show animated typing indicator
  // ==========================================
  function showTypingIndicator() {
    const typingEl = document.createElement("div");
    typingEl.classList.add("message", "bot", "typing");
    chatContainer.appendChild(typingEl);

    let dots = 0;
    const maxDots = 3;
    typingEl.textContent = "Typing";

    const intervalId = setInterval(() => {
      dots = (dots + 1) % (maxDots + 1);
      typingEl.textContent = "Typing" + ".".repeat(dots);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 400);

    return { typingEl, intervalId };
  }

  // ==========================================
  // Welcome message (once per session)
  // ==========================================
  if (!sessionStorage.getItem("hasSeenWelcome")) {
    addMessage("Hello! I’m your school assistant. How can I help?", "bot");
    sessionStorage.setItem("hasSeenWelcome", "true");
  }

  // ==========================================
  // Send message to backend API
  // ==========================================
  async function sendToBackend(message) {
    const sessionId =
      localStorage.getItem("chatSessionId") || crypto.randomUUID();
    localStorage.setItem("chatSessionId", sessionId);

    addMessage(message, "user");

    const { typingEl, intervalId } = showTypingIndicator();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, sessionId }),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const data = await res.json();

      setTimeout(() => {
        clearInterval(intervalId);
        typingEl.remove();
        addMessage(data.reply, "bot");
      }, 800 + Math.random() * 700); // 0.8–1.5s delay
    } catch (error) {
      console.error("Error sending message:", error);
      clearInterval(intervalId);
      typingEl.remove();
      addMessage("Oops! Something went wrong. Please try again.", "bot");
    }
  }

  // ==========================================
  // Event: Chat form submission
  // ==========================================
  chatForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = chatInput.value.trim();
    if (!message) return;
    sendToBackend(message);
    chatInput.value = "";
  });

  // ==========================================
  // Event: Toggle chat box on icon click
  // ==========================================
  chatIcon.addEventListener("click", () => {
    chatBox.classList.toggle("open");
  });

  // Load chat history
  loadChatHistory();
}

// Expose init function to global scope
window.initChatbot = initChatbot;
