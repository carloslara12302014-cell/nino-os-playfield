const filterButtons = document.querySelectorAll(".filter-button");
const gameCards = document.querySelectorAll(".game-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("selected", item === button));
    gameCards.forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatMessages = document.querySelector("#chat-messages");

function addMessage(text, kind) {
  const message = document.createElement("div");
  message.className = `message ${kind}-message`;
  if (kind === "guide") {
    const avatar = document.createElement("span");
    avatar.className = "message-avatar";
    avatar.setAttribute("aria-hidden", "true");
    avatar.textContent = "✳";
    message.append(avatar);
  }
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  message.append(paragraph);
  chatMessages.append(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function suggestGame(query) {
  if (/puzz|brain|think|number|word/i.test(query)) {
    return "A puzzle sounds right—try 2048 for numbers or Word Wipe for a word hunt. Tap a game card to open its site.";
  }
  if (/cozy|calm|relax|chill|creative|quiet/i.test(query)) {
    return "For a calmer break, try Little Alchemy 2 and experiment, or take Eggy Car for a bumpy little drive.";
  }
  if (/action|fast|quick|compete|energy|multiplayer/i.test(query)) {
    return "Ready for some energy? Shell Shockers has arena action, while Tag is a quick chase. Check the game site's rules and availability.";
  }
  if (/opera|browser/i.test(query)) {
    return "The Opera GX shortcut is in the top-right corner. It opens Opera's official site in a new tab; this page doesn't install or control a browser.";
  }
  if (/school|blocked|filter|bypass|unblock/i.test(query)) {
    return "I can't help bypass school filters or device rules. Use games and websites only when your network and school policies allow them.";
  }
  return "This little guide works from a few built-in suggestions, not a live AI. Try asking for a puzzle, something cozy, or action—and only play where permitted.";
}

chatForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  addMessage(suggestGame(text), "guide");
  chatInput.value = "";
  chatInput.focus();
});
