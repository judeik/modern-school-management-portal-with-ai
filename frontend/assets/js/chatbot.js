// frontend/assets/js/chatbot.js
// ================================
// Chatbot Frontend Logic
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const chatbotToggle = document.getElementById("chatbotToggle");
  const chatbotWindow = document.getElementById("chatbotWindow");
  const chatbotClose = document.getElementById("chatbotClose");
  const chatbotMessages = document.getElementById("chatbotMessages");
  const chatbotInput = document.getElementById("chatbotInput");
  const chatbotSend = document.getElementById("chatbotSend");

  // Helper: Add message to chat window
  function addMessage(sender, text) {
    const msg = document.createElement("p");
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatbotMessages.appendChild(msg);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  // Toggle chatbot window
  chatbotToggle?.addEventListener("click", () => {
    chatbotWindow.style.display = chatbotWindow.style.display === "flex" ? "none" : "flex";
  });
  chatbotClose?.addEventListener("click", () => chatbotWindow.style.display = "none");

  // Send message
  chatbotSend?.addEventListener("click", () => {
    const userText = chatbotInput.value.trim();
    if (userText) {
      addMessage("You", userText);
      chatbotInput.value = "";

      // Simulated AI response (replace with backend API call later)
      setTimeout(() => {
        let reply = "I'm here to assist with school info, admissions, and portal guidance.";
        if (userText.toLowerCase().includes("admission")) reply = "Admissions are open! Visit the portal for details.";
        if (userText.toLowerCase().includes("result")) reply = "You can check results via the Student Portal.";
        if (userText.toLowerCase().includes("contact")) reply = "You can reach us at info@myschool.com or +234-800-123-4567.";
        addMessage("AI", reply);
      }, 800);
    }
  });

  // Send message on Enter
  chatbotInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") chatbotSend.click();
  });
});
