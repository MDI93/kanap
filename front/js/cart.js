// Afficher les éléments présent dans le local Storage (basket)

let getProductsBasket = JSON.parse(localStorage.getItem("basket"))
 console.log(getProductsBasket)

const productsInCart = async function() {
  if(getProductsBasket) {
    await getProductsBasket;
    console.log(getProductsBasket);
  }

  document.document.getElementById("cart__items").innerHTML = basket.map((basket) =>
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
//btnOrderProduct();
}

productsInCart();

// const btnOrderProduct = async () => {
//   let orderProduct = document.querySelector(".cart__order__form__submit");
//   orderProduct.addEventListener("click", (e) => {
//   if(orderProduct == null){
//     alert("Veuillez ajoutez un produit")
//   } else {
//     return true;
//   }
//     e.preventDefault();
//   })};
//   console.log("btn order", btnOrderProduct);

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
    console.log(dataId)
  let dataColor = recupIdColor.getAttribute("data-color");
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
    const productPriceTotal =+ getProductsBasket[t].price * getProductsBasket[t].quantity;
    totalPriceProduct.push(productPriceTotal);
      console.log("constante", totalPriceProduct)
// Additionner les prix avec la méthode reduce()  
    const reducer = (accumulator, currentValue) => accumulator + currentValue;    
    const totalPrice = totalPriceProduct.reduce(reducer, 0);
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
    const totalQuantity = totalQuantityProduct.reduce(reducer, 0);
      console.log("totalQuantity", totalQuantity)
  // Variable qui permet d'afficher la quantité totale du panier dans l'HTML  
    let htmlQuantity = document.querySelector("#totalQuantity");
    htmlQuantity.innerHTML = `${totalQuantity}`;
      console.log(htmlQuantity);
  } 
};
//-------------------------------------------> Fin Quantité totale du panier <-------------------------------------------//

//************************ Constante qui permet de modifier la quantité des produits du panier ************************//

const modifQuantityBasket = () => {

  let addQuantityFromBasket = document.getElementsByClassName("itemQuantity")
      console.log("Bouton select + -", addQuantityFromBasket);
// Une boucle qui au moment du clique permet de choisir le nombre de quantité
  for( let m = 0 ; m < addQuantityFromBasket.length ; m++){
    addQuantityFromBasket[m].addEventListener("change", () => {
      console.log("clique", addQuantityFromBasket[m].addEventListener)
// Recupère la nouvelle valeur au moment du clique      
    let moreQuantity = addQuantityFromBasket[m].value;
     console.log(moreQuantity);
// On utilise 'closest()' pour récuperer la data id & color sur l'article      
    let recupIdColor = addQuantityFromBasket[m].closest("article");
      console.log(recupIdColor)
// Variable pour attribuer ces datas      
    let dataId = recupIdColor.getAttribute("data-id");
      console.log(dataId)
    let dataColor = recupIdColor.getAttribute("data-color");
      console.log(dataColor)

    console.log("avant find", getProductsBasket);
// On utilise 'find()'     
    let foundProducts = getProductsBasket.find(p => p.id === dataId && p.color === dataColor);
      console.log("methode find", foundProducts) 

    let index = getProductsBasket.indexOf(foundProducts)
      console.log(index)
    
    getProductsBasket.fill(foundProducts.quantity = moreQuantity, index, index);

    localStorage.setItem("basket", JSON.stringify(getProductsBasket));
      
    totalQuantityCart();
    totalPriceCart();
  });
}};
//-------------------------------------------> Fin Modif quantité du panier <-------------------------------------------//

//********************************************** Formulaire de commande  **********************************************//

//********************************************** Bouton formulaire & commande  **********************************************//

// Bouton de commande
let btnOrderForm = document.querySelector(".cart__order__form__submit");
  console.log(btnOrderForm);
// Au moment du clique on en envoie le formulaire dans le local storage.
btnOrderForm.addEventListener("click", (e) => {
// Format d'expression régulière pour le prénom, le nom, et le nom de la ville.
const formNameRegex = (value) => {
  return /^[A-Za-z\s]{3,20}$/.test(value);
};
  console.log("Regex prénom nom ville", formNameRegex);
// Format d'expression régulière pour une adresse postale.    
const formAddresRegex = (value) => {
  return /^[A-Za-z0-9\s,.'-]{3,50}$/.test(value);
};
  console.log("Regex adresse", formAddresRegex);
// Format d'expression régulière pour une adresse eMail.
const formMailRegex = (value) => {
  return /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
};
    console.log("Regex mail", formMailRegex);

  
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
    formError.innerHTML = "Le champ est requis. Le prénom doit comporter un minimum de 3 caractères, maximum 20 caractères et sans symboles @&:#()°/.";
    formError.style.color = 'red';
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
    formError.innerHTML = "Le champ est requis. Le nom doit comporter un minimum de 3 caractères, maximum 20 caractères et sans symboles @&:#()°/.";
    formError.style.color = 'red';
    return false;
  };
}  
//---------------------------------------------------------------------------------------------------------------------//
// Conditions et messages d'erreur pour l'adresse du client
function addressControleValidation() {
  const formInputAdress = formContact.address;
    console.log(formInputAdress);
  if (formAddresRegex(formInputAdress)){
    let formError = document.getElementById("addressErrorMsg");
    formError.innerHTML = "";
    return true;
  } else {
    let formError = document.getElementById("addressErrorMsg");
    formError.innerHTML = "Le champ est requis. L'adresse doit comporter un minimum de 3 caractères, maximum 50 caractères et sans symboles @&:#()°/.";
    formError.style.color = 'red';
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
    formError.innerHTML = "Le champ est requis. Le nom de la ville doit comporter un minimum de 3 caractères, maximum 20 caractères et sans symboles @&:#()°/.";
    formError.style.color = 'red';
    return false;
  };
}
//---------------------------------------------------------------------------------------------------------------------//
// Conditions et messages d'erreur pour l'adresse eMail  
function emailControleValidation() {   
  const formInfoEmail = formContact.email;
    console.log(formInfoEmail);      
  if (formMailRegex(formInfoEmail)){
    let formError = document.getElementById("emailErrorMsg");
    formError.innerHTML = "";
    return true;
  } else {
    let formError = document.getElementById("emailErrorMsg");
    formError.innerHTML = "Le champ est requis. L'adresse e-Mail n'est pas valide.";
    formError.style.color = 'red';
    return false;
  }   
}
// Condition qui bloque l'envoie du formulaire si tout les champs ne sont pas validés
if( firstNameControleValidation(), 
    lastNameControleValidation(),
    addressControleValidation(),
    cityControleValidation(),
    emailControleValidation()) {
  localStorage.setItem("formConctact", JSON.stringify(formContact));
} else {
  e.preventDefault();
  alert("Veuillez compléter correctement tout les champs")
  return false; 
};
console.log(formContact);

// Envoie de l'objet "sendOrderProductsForm" vers le serveur
let products = getProductsBasket;
let contact = formContact;

const submitOrderProductsForm = {
  products,
  contact
};
console.log(submitOrderProductsForm);

const submitOrder = fetch("http://localhost:3000/api/products/order",{
  method: "POST",
  headers: {
    'Content-Type' : 'application/json;charset=UTF-8'
  },
  body: JSON.stringify(submitOrderProductsForm)
})
  .then(res => res.json())
  .then(data => console.log(data)) 
  .catch(error => console.log(error)) 
;

  console.log("Envoi de l'objet vers le serveur", submitOrder)

  e.preventDefault();
// Vide le local storage au moment du clique sur le bouton commander  
  //localStorage.clear();
}
);
//-------------------------------------------> Fin Formulaire de commande <-------------------------------------------//
