// --- For index.html ---
const list = document.getElementById("game-list");
if (list) {
  fetch("/api/games")
    .then((res) => res.json())
    .then((games) => {
      games.forEach((game) => {
        const div = document.createElement("div");
        div.innerHTML = `
          <h3>${game.name}</h3>
          <p>${game.price} USD</p>
          <a href="game.html?slug=${game.slug}">View</a>
        `;
        list.appendChild(div);
      });
    })
    .catch((err) => console.error(err));
}

// --- For game.html ---
const detail = document.getElementById("game-detail");
if (detail) {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");

  fetch("/api/games/" + slug)
    .then((res) => res.json())
    .then((game) => {
      if (!game) {
        detail.innerHTML = "<p>Game not found.</p>";
        return;
      }
      detail.innerHTML = `
        <h1>${game.name}</h1>
        <p>${game.description}</p>
        <p>Price: ${game.price} USD</p>
        <button onclick="buy('${game.slug}')">Buy Now</button>
      `;
    })
    .catch((err) => console.error(err));
}

function buy(slug) {
  alert("Fake purchase for: " + slug);
}

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

if (slug) {
  fetch("/api/games/" + slug)
    .then((res) => {
      if (!res.ok) throw new Error("Game not found");
      return res.json();
    })
    .then((game) => {
      const detail = document.getElementById("game-detail");
      if (!detail) return;

      detail.innerHTML = `
        <h1>${game.name}</h1>
        <p>${game.description}</p>
        <p>Price: ${game.price} USD</p>
        <button onclick="buy('${game.slug}')">Buy Now</button>
      `;
    })
    .catch((err) => {
      console.error(err);
      const detail = document.getElementById("game-detail");
      if (detail) detail.innerHTML = "<p>Game not found.</p>";
    });
}
