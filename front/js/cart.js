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
  
  function removeProductFromBasket(product) {
    let basket = getProductBasket();
    basket = basket.filter(p => p._id != product._id);  // Fonction qui permet de supprimer un produit du panier
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
const getProductBasket = async function () {
  await fetch(` basket `)
  .then((response) => response.json())
  .then((promise) => {
    productData = promise;  
  });
};


let getProductsBasket = JSON.parse(localStorage.getItem("basket"));

/* function getProductBasket() {
	let basket = localStorage.getItem("basket");
	if(basket == null){
		return [];
	} else {
		return JSON.parse(basket);
	}
}*/

/*
Afficher les donnees de chaque produit hors du productStorage
Avoir le bon prix avec la bonne quantité
Faire fonctionner le bouton supprimer
Quantité modifiable même dans le panier
Avoir un panier vide (localStorage vide) a chaque fois
Afficher un total avec le nombre d'article et le prix
*/

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
          <div class="cart__item__content__settings__delete" data-id="${basket.id}" data-color="${basket.color}">>
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
  </section>
  `
);
//modifQuantityBasket();
removeProductFromBasket();
}

productsInBasket()

// Une constante pour supprimer les produits du panier
const removeProductFromBasket = async () => {
// Une variable qui permet de retrouver les boutons supprimer
  let deleteItem = document.getElementsByClassName("deleteItem");
      console.log("Bouton supprimer", deleteItem);
// Une boucle au moment du clique pour choisir le bon ID
  for( let i = 0 ; i < deleteItem.length ; i++){
    deleteItem[i].addEventListener("click", () => {
      console.log("Supprimer", deleteItem.addEventListener);
  
      let removeProduct = getProductBasket[i]._id; // fonction a revoir
      console.log("retrait des produits", removeProduct);

// On utilise Filter pour supprimer de maniere précise un élément 
      getProductBasket = getProductBasket.filter(p => p._id !== removeProduct._id);
// On renvoie les informations au local storage
      localStorage.setItem("basket", JSON.stringify(getProductBasket));
    });
  }};




// Constante qui permet de modifier la quantité de produits du panier
const modifQuantityBasket = async (product, quantity) => {
  console.log(modifQuantityBasket);
  let basket = getProductBasket();
  let foundProduct = basket.find(p => p._id == product._id);
    if (foundProduct != undefined) {
      foundProduct.quantity += quantity;  // Fonction qui permet d'ajouter un produit au panier
      if(foundProduct.quantity <= 0) {
        removeProductFromBasket(foundProduct);
      } else {
      getProductBasket(basket); 
      }
    }};

// Constante qui permet de calculer le total du panier 
const totalPriceProduct = [];

z = 0;

if (getProductBasket[z].id === getProductBasket[z].id) {

const productTotal =
getProductBasket[z].quantity * basket[v].price;

totalPriceProduct.push(productTotal);

const reducer = (accumulator, curr) => accumulator + curr;
const totalPrice = totalPriceProduct.reduce(reducer);

let htmlPrice = document.querySelector("#totalPrice");
htmlPrice.innerHTML = `${totalPrice}`;
}

totalPriceProduct();

/*const getTotalPriceProduct = () => {
  await getProductBasket;
  console.log("total", getTotalPriceProduct);
  let basket = getProductBasket();
  let total = 0;
    for (let product of basket) {   // Fonction qui permet de calculer le prix total des produits dans le panier
      total += product.quantity * product.price;
    }
    return total;
  };

getTotalPriceProduct();*/


  


/*
const moreQuantityBasket = async ((product) => {
  console.log("more quantity", productsInBasket)

    let basket = getProductBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if (foundProduct != undefined) {
      foundProduct.quantity += quantity;  // Fonction qui permet d'ajouter un produit au moment du panier
      if(foundProduct.quantity <= 0) {
        removeProductFromBasket(foundProduct);
      } else {
        saveProductBasket(basket); 
      }
}})

const total = async ((product) => { 
  console.log("total", total)

document.getElementsByClassName("cart__price").innerHTML = getProductBasket.map((product)
`
<div class="cart__price">
  <p>Total (<span id="totalQuantity"></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
</div>`);
})*/
