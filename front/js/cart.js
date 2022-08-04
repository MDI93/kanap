// Afficher les éléments présent dans le local Storage (basket)

let getProductsBasket = JSON.parse(localStorage.getItem("basket"));

const productsInBasket = async function() {
  if(getProductsBasket) {
    await getProductsBasket;
    console.log(getProductsBasket);
  }

  document.getElementById("cart__items").innerHTML = getProductsBasket.map((basket) =>
  ` 
  <section id="cart__items">
    <article class="cart__item" data-id="${basket.id}" data-color="${basket.color}">
      <div class="cart__item__img">
        <img src="${basket.imageUrl}" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${basket.name}</h2>
          <p>${basket.color}</p>
          <p>${basket.price * basket.quantity} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
  </section>
  `
).join("");   // Retire la virgule qui apparait;
//modifQuantityBasket();
removeProductFromBasket();
totalPriceCart();
totalQuantityCart();
}

productsInBasket()

//****************************** Constante qui permet de supprimer les produits du panier ******************************//

const removeProductFromBasket = async () => {
// Une variable qui permet de retrouver les boutons supprimer
  let deleteItem = document.getElementsByClassName("deleteItem");
      console.log("Bouton supprimer", deleteItem);
// Une boucle qui au moment du clique permet de choisir le bon produit
  for( let i = 0 ; i < deleteItem.length ; i++){
    deleteItem[i].addEventListener("click", () => {
// On utilise 'closest' pour récuperer la data id & color sur l'article
      let recupIdColor = deleteItem[i].closest("article");
// Variable pour attribuer ces datas
      let dataId = recupIdColor.getAttribute("data-id");
      let dataColor = recupIdColor.getAttribute("data-color");
      console.log(dataId)
      console.log(dataColor)

// On utilise Filter pour supprimer de maniere précise un élément 
      getProductsBasket = getProductsBasket.filter(p => p._id !== dataId && p.color !== dataColor);
      console.log("data", getProductsBasket)
// On renvoie les informations au local storage
      localStorage.setItem("basket", JSON.stringify(getProductsBasket));
// Supprime l'élément       
      recupIdColor.remove();
// Rafraichissement de la page      
      location.reload();
    });
  }};

//******************************** Constante qui permet de calculer le total du panier ********************************//

//----------------------------------------------> Prix total du panier <----------------------------------------------//
const totalPriceCart = async () => { 
// Tableau vide pour y mettre les prix présent dans le local storage (getProductsBasket)
  let totalPriceProduct = [];
// Aller chercher les prix dans le panier
  for(let t = 0 ; t < getProductsBasket.length ; t++){
    const productPriceTotal =+ getProductsBasket[t].price;
    totalPriceProduct.push(productPriceTotal);
      console.log("constante multiplication", totalPriceProduct)
// Additionner les prix avec la méthode reduce()  
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
      console.log("reducer", reducer)      
    const totalPrice = totalPriceProduct.reduce(reducer);
      console.log("totalPrice", totalPrice)
// Variable qui permet d'afficher le prix total du panier dans l'HTML  
    let htmlPrice = document.querySelector("#totalPrice");
    htmlPrice.innerHTML = `${totalPrice}`;
      console.log(htmlPrice);
  }  
};
//--------------------------------------------> Fin Prix total du panier <---------------------------------------------//  

//--------------------------------------------> Quantité totale du panier <--------------------------------------------//
const totalQuantityCart = async () => {
// Tableau vide pour y mettre les quantités présentent dans le local storage (getProductsBasket)
  let totalQuantityProduct = [];
// Aller chercher les quantités dans le panier
  for(let q = 0 ; q < getProductsBasket.length ; q++){
    const productQuantityTotal =+ getProductsBasket[q].quantity;
    totalQuantityProduct.push(productQuantityTotal);
      console.log("constante", totalQuantityProduct)
  // Additionner les prix avec la méthode reduce()  
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
      console.log("reducer", reducer)      
    const totalQuantity = totalQuantityProduct.reduce(reducer);
      console.log("totalQuantity", totalQuantity)
  // Variable qui permet d'afficher la quantité totale du panier dans l'HTML  
    let htmlQuantity = document.querySelector("#totalQuantity");
    htmlQuantity.innerHTML = `${totalQuantity}`;
      console.log(htmlQuantity);
  } 
};
//-------------------------------------------> Fin Quantité totale du panier <-------------------------------------------//

//************************ Constante qui permet de modifier la quantité des produits du panier ************************//

/*const modifQuantityBasket = async () => {

let selectQuantityBasket = document.getElementsByClassName("itemQuantity");

for( let q = 0 ; q < selectQuantityBasket.length ; q++)
selectQuantityBasket[q].addEventListener('change', (quantity) => {
  console.log("select", modifQuantityBasket);

  // On utilise 'closest' pour récuperer la data id & color sur l'article
  let changeIdColor = selectQuantityBasket[q].select("article");
  // Variable pour attribuer ces datas
  let dataId = changeIdColor.getAttribute("data-id");
    console.log(dataId)
  let dataColor = changeIdColor.getAttribute("data-color")

  selectQuantityBasket = getProductsBasket.find(p => p._id !== dataId && p.color !== dataColor);
  if (selectQuantityBasket != undefined) {
    selectQuantityBasket.quantity += quantity; 
    if(selectQuantityBasket.quantity <= 0) {
      removeProductFromBasket(selectQuantityBasket);
    } else {
      localStorage.setItem("basket", JSON.stringify(getProductsBasket));
    }
}}); 
}*/

/*  
  function modifQuantityBasket(product, quantity) {
    let basket = getProductBasket();
    let foundProduct = basket.find(p => p._id == product._id);
    if (foundProduct != undefined) {
      foundProduct.quantity += quantity;  // Fonction qui permet d'ajouter un produit au panier
      if(foundProduct.quantity <= 0) {
        removeProductFromBasket(foundProduct);
      } else {
        saveProductBasket(basket); 
      }
    } 
    
  }
*/  