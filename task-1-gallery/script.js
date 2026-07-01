// 🔑 API KEY
const accessKey = "wEXWLT4fo9M6XXVy-KTaquG1mA3qmgJkRjryqAwtThs";

let gallery = document.getElementById("gallery");
let searchInput = document.getElementById("search");

// Store original cards
let originalCards = gallery.innerHTML;

// 🔍 SEARCH FUNCTION
async function searchImages() {
  let query = searchInput.value.toLowerCase();

  // Reset gallery
  gallery.innerHTML = originalCards;

  let cards = document.querySelectorAll(".card");

  // 🔹 Filter local cards
  cards.forEach(card => {
    let text = card.innerText.toLowerCase();
    card.style.display = text.includes(query) ? "block" : "none";
  });

  // 🔹 Fetch images from internet
  if (query.trim() !== "") {
    let url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

    let res = await fetch(url);
    let data = await res.json();

    data.results.slice(0, 8).forEach(photo => {
      let div = document.createElement("div");

      // random category for filters
      let categories = ["nature", "city", "food"];
      let randomCategory = categories[Math.floor(Math.random() * categories.length)];

      div.classList.add("card", randomCategory);

      div.innerHTML = `
        <img src="${photo.urls.small}">
        <h3>${query}</h3>
      `;

      gallery.appendChild(div);
    });
  }
}

// 🎯 FILTER FUNCTION (OUTSIDE ✅)
function filterImages(category, btn) {
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    if (category === "all" || card.classList.contains(category)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });

  document.querySelectorAll(".filters button")
    .forEach(b => b.classList.remove("active"));

  btn.classList.add("active");
}

// 🔥 AUTO SEARCH
searchInput.addEventListener("keyup", searchImages);

// 🚀 LOAD IMAGES ON HOME PAGE
window.onload = async function () {
  let url = `https://api.unsplash.com/photos?client_id=${accessKey}`;

  let res = await fetch(url);
  let data = await res.json();

  data.slice(0, 12).forEach(photo => {
    let div = document.createElement("div");

    let categories = ["nature", "city", "food"];
    let randomCategory = categories[Math.floor(Math.random() * categories.length)];

    div.classList.add("card", randomCategory);

    div.innerHTML = `
      <img src="${photo.urls.small}">
      <h3>${photo.user.name}</h3>
    `;

    gallery.appendChild(div);
  });
};
// 🎯 Buttons
let loginBtn = document.getElementById("loginBtn");
let startBtn = document.getElementById("startBtn");
let modal = document.getElementById("loginModal");

// Open Login Popup
loginBtn.onclick = () => {
  modal.style.display = "flex";
};

// Close Popup
function closeModal() {
  modal.style.display = "none";
}

// Get Started Scroll
startBtn.onclick = () => {
  document.getElementById("gallery").scrollIntoView({
    behavior: "smooth"
  });
};
