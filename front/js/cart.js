/*
Afficher les donnees de chaque produit hors du productStorage
Avoir le bon prix avec la bonne quantité
Faire fonctionner le bouton supprimer
Quanitité modifiable même dans le panier
Avoir un panier vide (localStorage vide) a chaque fois
Afficher un total avec le nombre d'article et le prix
*/
let itemsData = Object;

const item = async function () {
  await fetch(` http://localhost:3000/api/products/order`)
  .then((response) => response.json())
  .then((promise) => {
    itemsData = promise;  
});
}


let addProductToCart = JSON.parse(localStorage.getItem("productStorage"));

const itemsInCart = async function() {
  console.log("PanierSuite");
  if(addProductToCart) {
    await addProductToCart;
    console.log(addProductToCart);
  }

  cart__items.innerHTML = addProductToCart.map((productStorage) =>
  ` 
  <section id="cart__items">
    <article class="cart__item" data-id="${productStorage._id}" data-color="${productStorage.color}">
      <div class="cart__item__img">
        <img src="" alt="Photographie d'un canapé">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2></h2>
          <p>${productStorage.color}</p>
          <p>${productStorage.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productStorage.quantity}">
          </div>
          <div class="cart__item__content__settings__delete" data-id="${productStorage._id}" data-color="${productStorage.color}">>
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    </article>
  </section>
  `,
  );
/*const addObjects = Object.assign({}, {
    imageUrl: `${}`, 
    name: `${}`,
    price: `${}`,
  });*/  
}

itemsInCart()

  /*let selectOneItem = document.getElementsByClassName("cart__item");
  console.log("Choix des produits",selectOneItem);

  console.log("Tableau des produits", itemsData._id);

// Boucle qui récupere les couleurs du tableau en fonction de l'ID
itemsData._id.forEach 
( itemCart => {
  console.log("Un produit", itemCart);

// Crée nouvelle option en fonction du nombre de couleurs présentent dans le tableau de cet ID  
let tagArticle = document.createElement("Article"); 

// Affiche la couleur en fonction des options  
tagArticle.innerHTML = `${addProductToCart}`;
// Choisit la couleur dans l'ordre du tableau  
tagArticle.value = `${addProductToCart}`; 

// On lui demande d'aller chercher son enfant à afficher
selectOneItem.appendChild(tagArticle);
  console.log("Affiche un produit",tagArticle);
});
};
itemsInCart()
  /*cart__items.innerHTML = addProductToCart.map((productStorage) => 
` 
<section id="cart__items">
  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}"> // tagArticle
    <div class="cart__item__img">
      <img src="${productStorage.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productStorage.name}</h2>
        <p>${productStorage.color}</p>
        <p>${productStorage.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="">
        </div>
        <div class="cart__item__content__settings__delete" data-id="{product-ID}" data-color="{product-color}">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
</section>
`
/*,
  document.getElementsByClassName("cart__price") =
`
<div class="cart__price">
<p>Total (<span id="totalQuantity">${productStorage.quantity}</span> articles) : 
<span id="totalPrice">"${productStorage.quantity * productStorage.price}"</span> €</p>
</div>
`,
``*/


  /*await fetch(` http://localhost:3000/api/cart/${id} `)
  .then((response) => response.json())
  .then((promise) => {
    itemsData = promise;  */



/* document.getElementById("cart__items").innerHTML = 
` 
<section id="cart__items">
  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${itemsData.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>"${itemsData.name}"</h2>
        <p>"${selectColor.value}"</p>
        <p>"${itemsData.price}"/p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
</section>
`*/
