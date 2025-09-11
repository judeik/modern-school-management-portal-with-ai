function initChatbot() {
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotSend = document.getElementById("chatbotSend");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotMessages = document.getElementById("chatbotMessages");

  if (!chatbotToggle || !chatbotWindow) return;

  chatbotToggle.addEventListener("click", () => {
    chatbotWindow.style.display =
      chatbotWindow.style.display === "flex" ? "none" : "flex";
  });

  chatbotClose.addEventListener("click", () => {
    chatbotWindow.style.display = "none";
  });

  function appendMessage(message, sender = "user") {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add(sender === "user" ? "user-message" : "bot-message");
    msgDiv.textContent = message;
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
      appendMessage(message, "user");
      chatbotInput.value = "";
      setTimeout(() => {
        appendMessage("🤖 You said: " + message, "bot");
      }, 500);
    }
  }

  chatbotSend.addEventListener("click", sendMessage);
  chatbotInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
}

// Run when script loads
initChatbot();
