// Afficher chaque produit sur une page détail au moment du clique

// Récuperer URL pour un seul Produit
var search_params = new URL(document.location).searchParams;   

if(search_params.has('id')) {
  var id = search_params.get('id');
  console.log(id)
}

// Afficher un seul produit en fonction de son 'ID'
let itemsData = Object;

const item = async function () {
  await fetch(` http://localhost:3000/api/products/${id} `)
  .then((response) => response.json())
  .then((promise) => {
    itemsData = promise;  
});
}

// Fonction qui permet d'afficher notre canapé
const getOneKanap =  async () => {
  await item();

// Ajout de l'image du canapé  
  document.getElementById("item__img").innerHTML = 
  ` <img src="${itemsData.imageUrl}" alt="Photographie d'un canapé"> `      

// Ajout du nom du canapé
  document.getElementById("title").innerHTML = 
  ` ${itemsData.name} ` 

// Ajout du prix du canapé
  document.getElementById("price").innerHTML =
  ` ${itemsData.price} ` 

// Ajout de la description du canapé
  document.getElementById("description").innerHTML = 
  ` ${itemsData.description} `  

// Sélection de la couleur du canapé 
  let selectColor = document.getElementById("colors");
    console.log("Choix des couleurs",selectColor);

    console.log("Tableau des couleurs",itemsData.colors);

// Boucle qui récupere les couleurs du tableau en fonction de l'ID
  itemsData.colors.forEach 
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
  addCart(itemsData);
};

getOneKanap()

// Ajout des produits au panier
// Bouton ajout au panier 
// Au clique ajoute les éléments sélectionnés (Couleur & quantité) au localStorage
// Tableau data du produit à ajouter au panier
const addCart = () => {
  let bouton = document.getElementById("addToCart");
  console.log(bouton);

  bouton.addEventListener("click", () => {
    let addProductStorage = JSON.parse(localStorage.getItem("productStorage"));
    let selectColor = document.getElementById("colors");
    console.log(selectColor.value);
    console.log(addProductStorage); 

const addColorQuantity = Object.assign({}, itemsData, {
  id: `${id}`, 
  quantity: 0,
  color: `${selectColor.value}`,
});                             
 console.log("Tableau", addColorQuantity);

// Conditions
// Si null alors nouveau tableau de couleur et quantité, push to local storage
// Sinon si différent de null alors boucle FOR récupère ID et Value
// Si le tableau du storage est égal au tableau data 
// Tu retournes la couleur && la quantité selectionné par rapport au tableau [i] 
  if ( addProductStorage == null ) {
    addProductStorage = [];
    addProductStorage.push(addColorQuantity);
    console.log(addProductStorage);
    localStorage.setItem("productStorage", JSON.stringify(addProductStorage)); 
  } else if(addProductStorage != null) {
      for( i = 0 ; i < addProductStorage.length ; i++) {
        console.log("test");
        if ( 
          addProductStorage[i]._id == itemsData.id && 
          addProductStorage[i].colors == selectColor.value );          
          { return(
            addProductStorage[i].quantity++, 
            console.log("quantity++"),
            localStorage.setItem("productStorage", JSON.stringify(addProductStorage)),
            addProductStorage = JSON.parse(localStorage.getItem("productStorage")));
          };
        }}; // Le local storage n'est pas mis a jour instantanement, Revoir la quantité
  }); 
  return (addProductStorage = JSON.parse(localStorage.getItem("productStorage")));
}  