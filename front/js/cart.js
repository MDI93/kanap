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
// Au moment du clique on en envoie le formulaire dans le local storage
btnOrderForm.addEventListener("click", (e) => {
  let formInputFirstName = document.getElementById("firstName")
  console.log(formInput);
// Autorise les lettres minuscules, majuscules, les tirets et les espaces.  
  let formRegex = /^[a-zA-Z-\s]$/; 
  console.log(formRegex);

  if (formInputFirstName.value.trim() == ""){
    let formError = document.getElementById("firstNameErrorMsg");
    formError.innerHTML = "Le champs est requis.";
    formError.style.color = 'red';
    e.preventDefault(); 
  } else if (formRegex.test(formInputFirstName.value) == false) {
    let formError = document.getElementById("firstNameErrorMsg");
    formError.innerHTML = "Le nom doit comporter des lettres et tirets seulement";
    formError.style.color = 'red';
    e.preventDefault(); 
  }

  const formInfoCustomer = {
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    address: localStorage.getItem("address"),
    city: localStorage.getItem("city"),
    email: localStorage.getItem("email"),
  }
  console.log("formulaire", formInfoCustomer)  
  e.preventDefault();
});
  






/*let sendFormInfo = document.getElementsByClassName("cart__order");

sendFormInfo.addEventListener('submit', function(e){
  let formInputFirstName = document.getElementById("firstName")
  console.log(formInput);
  let formRegex = /^[a-zA-Z-\s]$/; // Autorise les lettres minuscules, majuscules, les tirets et les espaces.
  console.log(formRegex);

  if (formInputFirstName.value.trim() == ""){
    let formError = docuement.getElementById("firstNameErrorMsg");
    formError.innerHTML = "Le champs est requis.";
    formError.style.color = 'red';
    e.preventDefault(); 
  } else if (formRegex.test(formInputFirstName.value) == false) {
    let formError = docuement.getElementById("firstNameErrorMsg");
    formError.innerHTML = "Le nom doit comporter des lettres et tirets seulement";
    formError.style.color = 'red';
    e.preventDefault(); 
  }
  
})*/

/*localStorage.setItem("firstName", document.getElementById("firstName").value);
console.log("firstName", document.getElementById("firstName").value);

localStorage.setItem("lastName", document.getElementById("lastName").value);
console.log("lastName", document.getElementById("lastName").value);

localStorage.setItem("address", document.getElementById("address").value);
console.log("address", document.getElementById("address").value);

localStorage.setItem("city", document.getElementById("city").value);
console.log("city", document.getElementById("city").value);  

localStorage.setItem("email", document.getElementById("email").value);
console.log("email", document.getElementById("email").value);  
*/




//-------------------------------------------> Fin Formulaire de commande <-------------------------------------------//
