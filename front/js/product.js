// Afficher chaque produit sur une page détail au moment du clique

// Récuperer URL pour un seul Produit
var search_params = new URL(document.location).searchParams;   

if(search_params.has('id')) {
  var id = search_params.get('id');
  console.log(id)
}

// Afficher un seul produit en fonction de son 'ID'
let productData = Object;

const oneProductKanap = async function () {
  await fetch(` http://localhost:3000/api/products/${id} `)
  .then((response) => response.json())
  .then((promise) => {
    productData = promise;  
});
}

// Fonction qui permet d'afficher notre canapé
const getOneKanap =  async () => {
  await oneProductKanap();

// Ajout de l'image du canapé  
  document.getElementById("item__img").innerHTML = 
  ` <img src="${productData.imageUrl}" alt="Photographie d'un canapé"> `      

// Ajout du nom du canapé
  document.getElementById("title").innerHTML = 
  ` ${productData.name} ` 

// Ajout du prix du canapé
  document.getElementById("price").innerHTML =
  ` ${productData.price} ` 

// Ajout de la description du canapé
  document.getElementById("description").innerHTML = 
  ` ${productData.description} `  

// Sélection de la couleur du canapé 
  let selectColor = document.getElementById("colors");
    console.log("Choix des couleurs", selectColor);

    console.log("Tableau des couleurs", productData.colors);

// Boucle qui récupere les couleurs du tableau en fonction de l'ID
  productData.colors.forEach 
  ( color => {
    console.log("Une couleur",color);

// Crée nouvelle option en fonction du nombre de couleurs présentent dans le tableau de cet ID  
  let tagOption = document.createElement("option"); 

// Affiche la couleur en fonction des options  
  tagOption.innerHTML = `${color}`;
// Choisit la couleur dans l'ordre du tableau  
  tagOption.value = `${color}`; 

// On lui demande d'aller chercher son enfant à afficher
  selectColor.appendChild(tagOption);
    console.log("Affiche une option",tagOption);
  });
  addBasket(productData);
};

getOneKanap()

// Bouton ajout au panier 
const addBasket = () => {
  let bouton = document.getElementById("addToCart");
  console.log(bouton);

// Au clique ajoute les éléments sélectionnés (Couleur & quantité) au localStorage  
  bouton.addEventListener("click", () => {
    let getProductBasket = JSON.parse(localStorage.getItem("basket"));
      console.log(getProductBasket);  

    let selectColor = document.getElementById("colors");
      console.log(selectColor.value);

    let addQuantityProduct = document.getElementById("quantity");
      console.log(addQuantityProduct);

// Tableau data du produit à ajouter au panier
const addInfoProduct = Object.assign({}, {
  id: `${id}`, 
  quantity: `${addQuantityProduct.value}`,
  color: `${selectColor.value}`,
  imageUrl: `${productData.imageUrl}`,
  name: `${productData.name}`,
  price: `${productData.price}`,
});                             

// Si le panier comporte déjà un canapé
  if (!getProductBasket ) {
    getProductBasket = [];
  }
  // On vérifie si le canapé est déjà dans le panier (id + couleur)
  // La Fonction Find permet de rappatrier directement l'objet s'il trouve la condition
  // On peut donc directement le modifier pour la quantité
  const addQuantityBasket = getProductBasket.find((product) => 
    product.id === addInfoProduct.id && product.color === addInfoProduct.color);
      if (addQuantityBasket) {
        addQuantityBasket.quantity = parseInt(addQuantityBasket.quantity) + parseInt(addInfoProduct.quantity)
      // Sinon, si le produit n'est pas commandé, on le push directement dans le Local Storage
      } else {
        getProductBasket.push(addInfoProduct);
      }
      // On repousse dans le panier
      localStorage.setItem("basket", JSON.stringify(getProductBasket))})
  } 