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
  if (/google|search|browser|web/i.test(query)) {
    return "Use the Google Search shortcut in the top-right corner to open Google in a new tab. Playfield doesn't embed or control a browser.";
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

const appWindow = document.querySelector("#app-window");
const startButton = document.querySelector("#start-button");
const startMenu = document.querySelector("#start-menu");
const taskbarApp = document.querySelector("#taskbar-app");
const maximizeButton = document.querySelector("#maximize-window");
const desktopClock = document.querySelector("#desktop-clock");

function setStartMenuOpen(open) {
  startMenu.hidden = !open;
  startButton.setAttribute("aria-expanded", String(open));
}

startButton.addEventListener("click", () => {
  setStartMenuOpen(startMenu.hidden);
});

document.querySelectorAll("[data-close-start]").forEach((item) => {
  item.addEventListener("click", () => setStartMenuOpen(false));
});

document.addEventListener("click", (event) => {
  if (!startMenu.hidden && !startMenu.contains(event.target) && !startButton.contains(event.target)) {
    setStartMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setStartMenuOpen(false);
});

document.querySelector("#minimize-window").addEventListener("click", () => {
  appWindow.hidden = true;
  taskbarApp.setAttribute("aria-pressed", "false");
});

document.querySelector("#close-window").addEventListener("click", () => {
  appWindow.hidden = true;
  taskbarApp.setAttribute("aria-pressed", "false");
});

taskbarApp.addEventListener("click", () => {
  appWindow.hidden = false;
  taskbarApp.setAttribute("aria-pressed", "true");
  setStartMenuOpen(false);
});

maximizeButton.addEventListener("click", () => {
  const maximized = appWindow.classList.toggle("is-maximized");
  maximizeButton.setAttribute("aria-pressed", String(maximized));
});

function updateClock() {
  desktopClock.textContent = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date());
}

updateClock();
window.setInterval(updateClock, 30_000);
