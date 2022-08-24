// Fonction qui récupère les produits depuis le local storage
// Sinon retourne un tableau vide si 'getProductsBasket' est nul
function getProductsBasket(){
  let productsBasket = localStorage.getItem("basket");
  if( productsBasket === null ){
// Affichage d'un panier vide
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML = "Vous n'avez pas d'article dans votre panier";
    return [];
  }
  return JSON.parse(productsBasket);
}

let basket = getProductsBasket();
  if( basket === null ) {
    alert("Veuillez ajouter un produit");
  } else {
    const displayCart = async function() {
      if(basket) {
        await basket;
      }
    document.getElementById("cart__items").innerHTML = basket.map((basket) =>
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
               <p>${basket.price} €</p>
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
     totalPriceCart();
     totalQuantityCart();
    }
    displayCart();
  }

//****************************** Constante qui permet de supprimer les produits du panier ******************************//

const removeProductFromBasket = async () => {
// Une variable qui permet de retrouver les boutons supprimer
  let deleteItem = document.getElementsByClassName("deleteItem");
// Une boucle qui au moment du clique permet de choisir le bon produit
  for( let i = 0 ; i < deleteItem.length ; i++){
    deleteItem[i].addEventListener("click", () => {
// On utilise 'closest' pour récuperer la data id & color sur l'article
  let recupDataIdColor = deleteItem[i].closest("article");
// Variable pour attribuer ces datas
  let dataId = recupDataIdColor.getAttribute("data-id");
  let dataColor = recupDataIdColor.getAttribute("data-color");

// On utilise Filter pour supprimer de maniere précise un élément 
      basket = basket.filter(p => p._id !== dataId && p.color !== dataColor);
// On renvoie les informations au local storage
      localStorage.setItem("basket", JSON.stringify(basket));
// Supprime l'élément       
      recupDataIdColor.remove();
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
  for(let t = 0 ; t < basket.length ; t++){
    const productPriceTotal =+ basket[t].price * basket[t].quantity;
    totalPriceProduct.push(productPriceTotal);
// Additionner les prix avec la méthode reduce()  
    const reducer = (accumulator, currentValue) => accumulator + currentValue;    
    const totalPrice = totalPriceProduct.reduce(reducer, 0);
// Variable qui permet d'afficher le prix total du panier dans l'HTML  
    let htmlPrice = document.querySelector("#totalPrice");
    htmlPrice.innerHTML = `${totalPrice}`;
  }  
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
