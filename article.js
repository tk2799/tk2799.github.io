const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("URL complète :", window.location.href);
console.log("ID reçu :", id);

console.log("URL :", window.location.href);

const articles = {
  armee: {
    titre: "L'armée léonienne peut-elle protéger le Guimo ?",
    image: "https://picsum.photos/1200/700",
    contenu: "Texte complet de l'article militaire..."
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
