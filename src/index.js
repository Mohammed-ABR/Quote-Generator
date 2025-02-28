const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const copyQuoteBtn = document.getElementById("copy-quote");
const tweetQuoteBtn = document.getElementById("tweet-quote");
const toggleModeBtn = document.getElementById("toggle-mode");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const saveQuoteBtn = document.getElementById("save-quote");
const viewSavedBtn = document.getElementById("view-saved");
const changeFontBtn = document.getElementById("change-font");
const shareWhatsAppBtn = document.getElementById("share-whatsapp");

const backgrounds = [
  "linear-gradient(to right, #4facfe, #00f2fe)",
  "linear-gradient(to right, #ff7e5f, #feb47b)",
  "linear-gradient(to right, #a1c4fd, #c2e9fb)",
  "linear-gradient(to right, #ff9a9e, #fecfef)",
  "linear-gradient(to right, #43cea2, #185a9d)",
];

const fonts = ["Arial", "Tahoma", "Courier New", "Georgia", "Cairo"];

async function fetchQuote() {
  try {
    const quotes = [
      {
        content: "Life is what happens while you're busy making other plans.",
        author: "John Lennon",
      },
      {
        content: "The way to get started is to quit talking and begin doing.",
        author: "Walt Disney",
      },
      {
        content: "The future belongs to those who believe in the beauty of their dreams.",
        author: "Eleanor Roosevelt",
      },
      {
        content: "Success is not final, failure is not fatal.",
        author: "Winston Churchill",
      },
      {
        content: "The only impossible journey is the one you never begin.",
        author: "Tony Robbins",
      },
      {
        content: "Everything you've ever wanted is on the other side of fear.",
        author: "George Addair",
      },
      {
        content: "The best way to predict the future is to create it.",
        author: "Peter Drucker",
      },
      {
        content: "Innovation distinguishes between a leader and a follower.",
        author: "Steve Jobs",
      },
      {
        content: "Believe you can and you're halfway there.",
        author: "Theodore Roosevelt",
      },
      {
        content: "The journey of a thousand miles begins with one step.",
        author: "Lao Tzu",
      },

      {
        content: "The only way to do great work is to love what you do.",
        author: "Steve Jobs",
      },

      {
        content: "You are never too old to set another goal or to dream a new dream.",
        author: "C.S. Lewis",
      },
      
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  } catch (error) {
    console.error("Error fetching quote:", error);
    return null;
  }
}

function changeBackground() {
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  document.body.style.background = backgrounds[randomIndex];
}

toggleModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
});

if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

newQuoteBtn.addEventListener("click", async () => {
  const quote = await fetchQuote();
  if (quote) {
    quoteText.classList.remove("fade-in");
    setTimeout(() => {
      quoteText.innerText = `${quote.content}`;
      quoteText.classList.add("fade-in");
    }, 100);
    quoteAuthor.innerText = `${quote.author}`;
    changeBackground();
  }
});

copyQuoteBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`${quoteText.innerText} ${quoteAuthor.innerText}`);
  alert("Quote copied!");
});

tweetQuoteBtn.addEventListener("click", () => {
  const tweetURL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quoteText.innerText + " " + quoteAuthor.innerText
  )}`;
  window.open(tweetURL, "_blank");
});

saveQuoteBtn.addEventListener("click", () => {
  let savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];
  let newQuote = { text: quoteText.innerText, author: quoteAuthor.innerText };
  savedQuotes.push(newQuote);
  localStorage.setItem("savedQuotes", JSON.stringify(savedQuotes));
  alert("Quote saved!");
});

viewSavedBtn.addEventListener("click", () => {
  let savedQuotes = JSON.parse(localStorage.getItem("savedQuotes")) || [];
  let message = savedQuotes.length ? savedQuotes.map(q => `${q.text} ${q.author}`).join("\n\n") : "No saved quotes!";
  alert(message);
});

changeFontBtn.addEventListener("click", () => {
  let randomFont = fonts[Math.floor(Math.random() * fonts.length)];
  document.body.style.fontFamily = randomFont;
});

shareWhatsAppBtn.addEventListener("click", () => {
  const text = `${quoteText.innerText} ${quoteAuthor.innerText}`;
  const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  window.open(whatsappURL, "_blank");
});