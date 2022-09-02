// Récupération du panier
let basket = JSON.parse(localStorage.getItem('basket'));

(async function () {
//Récupération des produits
  const products = await getProducts();
// Affichage panier vide
  emptyCart();
//  Affichage des produits
  displayBasket(basket, products);
// Appel des constante modifier, supprimer et totaux
  removeProductFromBasket();
  modifQuantityBasket();
  totalPriceCart();
  totalQuantityCart();
})();

// Affichage du panier lorsqu'il est vide
function emptyCart() {
    let productsBasket = localStorage.getItem("basket");
      if( productsBasket === null || productsBasket === 0 ){
  // Affichage d'un panier vide
        document.querySelector("#totalQuantity").innerHTML = "0";
        document.querySelector("#totalPrice").innerHTML = "0";
        document.querySelector("h1").innerHTML = "Vous n'avez pas d'article dans votre panier";
    }
      return JSON.parse(productsBasket);
};

function getProducts() {
  return fetch('http://localhost:3000/api/products')
    .then((response) => response.json())
    .then((products) => products)
    .catch((error) => alert(error));
}

function getProductFromId(id, products) {
  return (products || []).find((product) => product._id === id);
}
// Fonction permettant l'affichage du panier
const displayBasket = (basket, products) => {
  if ( basket ){
    cart__items.innerHTML = basket
      .map((product, i) => {
        return ` 
    <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${product.imageUrl}" id="productIMG" alt="Photographie d'un ${product.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2 id="title">${product.name}</h2>
        <p>${product.color}</p>
        <p id="price-${i}" class="totalPrice">${getProductFromId(product.id, products)?.price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" id="id-input-test" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem" id="${product.id}" data-id="${product.id}" data-couleur="${product.color}">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
      })
      .join('');}}
      

//****************************** Constante qui permet de supprimer les produits du panier ******************************//

// Fonction permettant de supprimer un produit du panier
const removeProductFromBasket = () => {
  let removeItems = document.querySelectorAll('.deleteItem');
// Au clique du bouton "supprimer" le produit sera retirer du panier
removeItems.forEach((deleteItem) => {
  deleteItem.addEventListener('click', () => {
    let productsInBasket = basket.length;
// On récupére les éléments afin de les supprimer
  for (i = 0; i < productsInBasket; i++) {
// Cas où il n'y a qu'un seul type de produits dans le panier
    if (basket[i].quantity >= 1 && productsInBasket == 1) {
          return (localStorage.removeItem('basket'), (location.href = 'cart.html'));
        }
// Cas où il y a plus d'un seul type de produits dans le panier
    if (basket[i].quantity >= 1 && 
        productsInBasket != 1 && 
        basket[i].id == deleteItem.dataset.id && 
        basket[i].couleur == deleteItem.dataset.color) 
        {
        basket.splice(i, 1);
        localStorage.setItem('basket', JSON.stringify(basket));
        location.href = 'cart.html';
        }
      }
    });
  });
};

//******************************** Constante qui permet de calculer le total du panier ********************************//

//----------------------------------------------> Prix total du panier <----------------------------------------------//

// Fonction permettant de calculer le prix du panier
const totalPriceCart = () => {
// Tableau vide pour y mettre les prix
  let totalPriceProduct = [];
// On renvoie dans le panier
  let products = JSON.parse(localStorage.getItem('basket'));
// Boucle qui récupère les prix
for(let t = 0 ; t < products.length ; t++) {
// Constante qui permet de calculer le prix et la quantité présente dans le panier
    const totalPrice = 
    parseInt(document.getElementById(`price-${t}`).textContent.slice(0, -1)) * basket[t].quantity;
    totalPriceProduct.push(totalPrice);
  };
// On affiche le résultat
  totalPrice.textContent = `${eval(totalPriceProduct.join('+'))}`;
  
};

//--------------------------------------------> Fin Prix total du panier <---------------------------------------------//  

//--------------------------------------------> Quantité totale du panier <--------------------------------------------//

const totalQuantityCart = async () => {
// Tableau vide pour y mettre les quantités présentent dans le local storage (getProductsBasket)
  let totalQuantityProduct = [];
// Aller chercher les quantités dans le panier
  for(let q = 0 ; q < basket.length ; q++){
    const productQuantityTotal =+ basket[q].quantity;
    totalQuantityProduct.push(productQuantityTotal);
  // Additionner les prix avec la méthode reduce()  
    const reducer = (accumulator, currentValue) => accumulator + currentValue;     
    const totalQuantity = totalQuantityProduct.reduce(reducer, 0);
  // Variable qui permet d'afficher la quantité totale du panier dans l'HTML  
    let htmlQuantity = document.querySelector("#totalQuantity");
    htmlQuantity.innerHTML = `${totalQuantity}`;
  } 
};

//-------------------------------------------> Fin Quantité totale du panier <-------------------------------------------//

//************************ Constante qui permet de modifier la quantité des produits du panier ************************//

const modifQuantityBasket = () => {

  let addQuantityFromBasket = document.getElementsByClassName("itemQuantity")
// Une boucle qui au moment du clique permet de choisir le nombre de quantité
  for( let m = 0 ; m < addQuantityFromBasket.length ; m++){
    addQuantityFromBasket[m].addEventListener("change", () => {
// Recupère la nouvelle valeur au moment du clique      
    let moreQuantity = addQuantityFromBasket[m].value;
// On utilise 'closest()' pour récuperer la data id & color sur l'article      
    let recupDataIdColor = addQuantityFromBasket[m].closest("article");
// Variable pour attribuer ces datas      
    let dataId = recupDataIdColor.getAttribute("data-id");
    let dataColor = recupDataIdColor.getAttribute("data-color");

// On utilise 'find()'     
    let foundProducts = basket.find(p => p.id === dataId && p.color === dataColor);
    let index = basket.indexOf(foundProducts)
      basket.fill(foundProducts.quantity = moreQuantity, index, index);

    localStorage.setItem("basket", JSON.stringify(basket));
      
    totalQuantityCart();
    totalPriceCart();
  });
}}

//-------------------------------------------> Fin Modif quantité du panier <-------------------------------------------//

//********************************************** Formulaire de commande  **********************************************//

//********************************************** Bouton formulaire & commande  **********************************************//

// Bouton de commande
let btnOrderForm = document.querySelector(".cart__order__form__submit");

// Au moment du clique on en envoie le formulaire dans le local storage.
btnOrderForm.addEventListener("click", (e) => {
// Format d'expression régulière pour le prénom, le nom, et le nom de la ville.
const formNameRegex = (value) => {
  return /^[A-Za-z\s]{3,20}$/.test(value);
};
// Format d'expression régulière pour une adresse postale.    
const formAddresRegex = (value) => {
  return /^[A-Za-z0-9\s,.'-]{3,50}$/.test(value);
};
// Format d'expression régulière pour une adresse eMail.
const formMailRegex = (value) => {
  return /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-{1,3}]+)*$/.test(value);
};
// Récupération des valeurs du formulaire par une classe
class form {
  constructor (){
    this.firstName = document.getElementById("firstName").value,
    this.lastName = document.getElementById("lastName").value,
    this.address = document.getElementById("address").value,
    this.city = document.getElementById("city").value,
    this.email = document.getElementById("email").value
  }
}
// On crée une nouvelle constante depuis la classe "form"
const formContact = new form ();

//---------------------------------------------------------------------------------------------------------------------//
// Condition et messages d'erreur pour le prénom du client
function firstNameControleValidation() {
  const formInputFirstName = formContact.firstName;
  if (formNameRegex(formInputFirstName)){
    let formError = document.getElementById("firstNameErrorMsg");
    formError.innerHTML = "";
    return true; 
  } else {
    let formError = document.getElementById("firstNameErrorMsg");
    formError.innerHTML = "Le champ est requis. Veuillez saisir un prénom valide!."
    formError.style.color = '#B22222';
    return false;
  };
};
//---------------------------------------------------------------------------------------------------------------------//
// Conditions et messages d'erreur pour le nom du client  
function lastNameControleValidation() {
  const formInputLastName = formContact.lastName;
  if (formNameRegex(formInputLastName)){
    let formError = document.getElementById("lastNameErrorMsg");
    formError.innerHTML = "";
    return true; 
  } else {
    let formError = document.getElementById("lastNameErrorMsg");
    formError.innerHTML = "Le champ est requis. Veuillez saisir un nom valide!";
    formError.style.color = '#B22222';
    return false;
  };
}  
//---------------------------------------------------------------------------------------------------------------------//
// Conditions et messages d'erreur pour l'adresse du client
function addressControleValidation() {
  const formInputAdress = formContact.address;
  if (formAddresRegex(formInputAdress)){
    let formError = document.getElementById("addressErrorMsg");
    formError.innerHTML = "";
    return true;
  } else {
    let formError = document.getElementById("addressErrorMsg");
    formError.innerHTML = "Le champ est requis. Veuillez saisir une adresse valide!";
    formError.style.color = '#B22222';
    return false;
  };
}
//---------------------------------------------------------------------------------------------------------------------//
// Conditions et messages d'erreur pour le nom de la ville du client    
function cityControleValidation() {
  const formInputCity = formContact.city;
  if (formNameRegex(formInputCity)){
    let formError = document.getElementById("cityErrorMsg");
    formError.innerHTML = "";
    return true; 
  } else {
    let formError = document.getElementById("cityErrorMsg");
    formError.innerHTML = "Le champ est requis. Veuillez saisir une ville valide!";
    formError.style.color = '#B22222';
    return false;
  };
}
//---------------------------------------------------------------------------------------------------------------------//
// Conditions et messages d'erreur pour l'adresse eMail  
function emailControleValidation() {   
  const formInfoEmail = formContact.email;    
  if (formMailRegex(formInfoEmail)){
    let formError = document.getElementById("emailErrorMsg");
    formError.innerHTML = "";
    return true;
  } else {
    let formError = document.getElementById("emailErrorMsg");
    formError.innerHTML = "Le champ est requis. Veuillez saisir une adresse e-mail valide!";
    formError.style.color = '#B22222';
    return false;
  }   
}

// Si le panier est vide message d'erreur et bloque l'envoie
  if( basket.length < 1 ){
    e.preventDefault();
    alert("Veuillez ajouter un produit");
    return false;
  } else {
    basket;
    e.preventDefault();
  }

// Si le formulaire est incomplet retourner un message
  if (firstNameControleValidation() &&
  lastNameControleValidation() && 
  addressControleValidation() && 
  cityControleValidation() &&  
  emailControleValidation()) {
    localStorage.setItem("formContact", JSON.stringify(formContact));
    e.preventDefault();
  } else {
    e.preventDefault();
    alert("Veuillez compléter tout les champs");
    return false;
  };

// Condition qui bloque l'envoie du formulaire si tout les champs ne sont pas validés

//*********************************************** Envoi de la commande  ***********************************************//

// On crée  un tableau qui récupère seulement les ID des produits

let basketId = [];

for(product of basket){
  basketId.push(product.id)
}

// Récupération des données client et panier avant envoie
let contactInfo;
let order;
let products = basketId;

function submitOrderProductsForm() {
  contactInfo = JSON.parse(localStorage.getItem("formContact"));
  // Définition de l'objet commande
  order = {
    contact: {
      firstName: contactInfo.firstName,
      lastName: contactInfo.lastName,
      address: contactInfo.address,
      city: contactInfo.city,
      email: contactInfo.email,
    },
    products: products,
  }
}

// Envoi des données vers le serveur avec la méthode POST Fetch
const submitOrder = 
  submitOrderProductsForm();
  fetch("http://localhost:3000/api/products/order",{
    method: "POST",
    headers: {
      'Content-Type' : 'application/json;charset=UTF-8'
    },
    body: JSON.stringify(order)
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      document.location.href = `confirmation.html?id=${response.orderId}`;
    })
    .catch(function () {
      alert('Une erreur est survenue');
    })

  e.preventDefault();
}
);

//-------------------------------------------> Fin Formulaire de commande <-------------------------------------------//