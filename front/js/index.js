// Récuperer les données des produits sur l'API et afficher sur la page d'accueil
let itemsData = [];

const items = async function () {
  await fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((promise) => {
    itemsData = promise;
  });
}

// Afficher les produits en fonctions de leur données
const getProducts =  async () => {
  await items();
  console.log(itemsData)

  document.getElementById("items").innerHTML = itemsData.map((item) =>
  `<a href="./product.html?id=${item._id}"> 
    <article>
      <img src="${item.imageUrl}" alt="${item.altTxt}">
        <h3 class="productName">${item.name}</h3>
        <p class="productDescription">${item.description}</p>
    </article>
  </a>`
).join("");   // Retirer la virgule qui apparait
}

getProducts()