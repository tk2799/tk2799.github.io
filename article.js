const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("URL complète :", window.location.href);
console.log("ID reçu :", id);

console.log("URL :", window.location.href);

const articles = {
  armee: {
    titre: "Comment Expliquer l'échec feuexotiquien au Costo Exotica",
    image: "https://media.discordapp.net/attachments/1398231327932682242/1524518991664517213/image.png?ex=6a500a73&is=6a4eb8f3&hm=a1a8b90b2c99d537ba8c02860bba33efb382505d991e6c6591ff5cd1efc9a2ad&=&format=webp&quality=lossless",

  },

  actu2: {
    titre: "Deuxième actualité",
    image: "https://picsum.photos/1200/701",
    contenu: "Texte complet de la deuxième actualité..."
  }
};

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("ID reçu :", id);
console.log("Articles dispo :", articles);

const article = articles[id];

console.log("Article trouvé :", article);

if (!article) {
  document.body.innerHTML = `
    <h1>Article introuvable</h1>
    <a href="index.html">Retour</a>
  `;
} else {
  document.getElementById("articleImage").src = article.image;
  document.getElementById("articleTitle").textContent = article.titre;
  document.getElementById("articleContent").textContent = article.contenu;
}
