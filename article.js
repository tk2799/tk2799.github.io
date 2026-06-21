const data={

armee:{

titre:
"L'armée léonienne peut-elle protéger le Guimo ?",

image:
"https://picsum.photos/1200/700",

contenu:

`
Ton texte complet.

Tu écris
l'article ici.

`

},

actu2:{

titre:
"Deuxième actualité",

image:
"https://picsum.photos/1200/701",

contenu:

`
Texte complet
de l'article.

`

}

};

const params =
new URLSearchParams(
location.search
);

const id =
params.get(
"id"
);

if(data[id]){

articleImage.src =
data[id].image;

articleTitle.textContent =
data[id].titre;

articleContent.textContent =
data[id].contenu;

}
