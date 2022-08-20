//*********************** Récupérer et afficher les produits ***********************//

// Récuperer les données des produits sur l'API et afficher sur la page d'accueil
let productsData = [];

const products = async function () {
  await fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((promise) => {
    productsData = promise;
  });
}

// Afficher les produits en fonctions de leur données
const getProducts =  async () => {
  await products();

  document.getElementById("items").innerHTML = productsData.map((product) =>
  `<a href="./product.html?id=${product._id}"> 
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
        <h3 class="productName">${product.name}</h3>
        <p class="productDescription">${product.description}</p>
    </article>
  </a>`
).join("");   // Retirer la virgule qui apparait
}

getProducts()