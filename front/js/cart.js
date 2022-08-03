/* function saveProductBasket(basket) {
	localStorage.setItem("basket", JSON.stringify(basket));
}

function getProductBasket() {
	let basket = localStorage.getItem("basket");
	if(basket == null){
		return [];
	} else {
		return JSON.parse(basket);
	}
}

function addProductBasket(product) {
	let basket = getProductBasket();
	let foundProduct = basket.find(p => p._id == product._id);
	if(foundProduct != undefined) {
		foundProduct.quantity++;
	} else {
		product.quantity = 1;
		basket.push(product);
	}
	saveProductBasket(basket);
}
  
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
  
  function getQuantityNumberProduct() {
    let basket = getProductBasket();
    let number = 0;
    for (let product of basket) {     // Fonction qui permet de calculer la quantité des produits dans le panier
      number += product.quantity;
    }
    return number;
  }
  
  function getTotalPriceProduct() {
    let basket = getProductBasket();
    let total = 0;
    for (let product of basket) {   // Fonction qui permet de calculer le prix total des produits dans le panier
      total += product.quantity * product.price;
    }
    return total;
  }  */

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
modifQuantityBasket();
removeProductFromBasket();
totalCart();
}

productsInBasket()

//**************************** Constante qui permet de supprimer les produits du panier ****************************//

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
      //location.reload();
    });
  }};

//************************ Constante qui permet de modifier la quantité des produits du panier ************************//

const modifQuantityBasket = async () => {

let selectQuantityBasket = document.getElementsByClassName("itemQuantity");

for( let q = 0 ; q < selectQuantityBasket.length ; q++)
selectQuantityBasket[q].addEventListener('change', (quantity) => {
  console.log("select", modifQuantityBasket);

  // On utilise 'closest' pour récuperer la data id & color sur l'article
  let changeIdColor = selectQuantityBasket[q].select("article");
  // Variable pour attribuer ces datas
  let dataId = changeIdColor.getAttribute("data-id");
    console.log(dataId)

  selectQuantityBasket = getProductsBasket.find(p => p._id !== dataId);
  if (selectQuantityBasket != undefined) {
    selectQuantityBasket.quantity += quantity; 
    if(selectQuantityBasket.quantity <= 0) {
      removeProductFromBasket(selectQuantityBasket);
    } else {
      localStorage.setItem("basket", JSON.stringify(getProductsBasket));
    }
}}); 
}

//******************************** Constante qui permet de calculer le total du panier ********************************//    

const totalCart = async () => { 
  console.log("total", totalCart)

  let total = 0;
  for (let product of getProductsBasket) {   // Fonction qui permet de calculer le prix total des produits dans le panier
    total += product.quantity * product.price;
  }
  return total;
} 

/*let totalPriceProduct = [];
console.log(totalPriceProduct);

let getTotalPriceProduct = document.getElementsByClassName("cart__price")
  for(let t = 0 ; t < getTotalPriceProduct.length ; t++);

const productTotal = `${getProductsBasket.quantity}` * `${getProductsBasket.price}`;

totalPriceProduct.push(productTotal);

const reducer = (accumulator, curr) => accumulator + curr;
const totalPrice = totalPriceProduct.reduce(reducer);

let htmlPrice = document.querySelector("#totalPrice");
htmlPrice.innerHTML = `${totalPrice}`;
`
<div class="cart__price">
  <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice">${totalPrice}</span> €</p>
</div>
`
localStorage.setItem("basket", JSON.stringify(getProductsBasket));
};*/