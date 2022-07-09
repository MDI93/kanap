// Récuperer les données des produits sur l'API et afficher sur la page d'accueil
let itemsData = [];

const items = async function () {
  await fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((promise) => {
    itemsData = promise;
  });
}

const getOneProduct =  async () => {
  await items();
  console.log(itemsData)
  document.getElementById("items").innerHTML = itemsData.map((item) =>` <a href="./product.html?id=${item._id}">
                                                                          <article>
                                                                            <img src="${item.imageUrl}" alt="${item.altTxt}">
                                                                              <h3 class="productName">${item.name}</h3>
                                                                              <p class="productDescription">${item.description}</p>
                                                                          </article>
                                                                        </a> `);

var oneProduct = document.querySelectorAll("#items")                                                                        
  console.log(oneProduct) 
  
  getOneProduct.forEach((oneProduct) => 
  oneProduct.addEventListener("click", () => {
    console.log(oneProduct)

    window.location = ` product.html?${oneProduct.id} ` ;
  }),
  ); 
};

getOneProduct ()







/*
var links = document.querySelectorAll('a.products')
for ( var i = 0 ; i < links.strenght ; i++ ) {
  var link = links[i]
  link.addEventListener('click') , function(event) {
      event.defaultPrevented()
      console.log(i)
  }
}
*/

/**
 * Gestion des articles en objet, gère le tri par date et le formatage des dates pour affichage
 
class productItems{
  constructor(listProducts){
      this.listProducts = listProducts;
  }

  sort(){
      return this.listProducts.sort((a, b) => {
          return () < )?1:-1;
      });
  }
}
*/


/*  Je veux afficher les données de l'api sur la page html 
    Il faut utiliser JSON, fecth et une boucle FOR

*/
/* 
const products = document.getElementById ('items')
console.log('Voici les produits', items)
*/
