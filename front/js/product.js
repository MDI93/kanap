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


// Bouton ajout au panier 
const addCart = () => {
  let bouton = document.getElementById("addToCart");
  console.log(bouton);

// Au clique ajoute les éléments sélectionnés (Couleur & quantité) au localStorage  
  bouton.addEventListener("click", () => {
    let addProductStorage = JSON.parse(localStorage.getItem("productStorage"));
    let selectColor = document.getElementById("colors");
      console.log(selectColor.value);
      console.log(addProductStorage); 
    let addQuantity = document.getElementById("quantity")
      console.log(addQuantity)

// Tableau data du produit à ajouter au panier
const addObject = Object.assign({}, {
  id: `${id}`, 
  quantity: `${addQuantity.value}`,
  color: `${selectColor.value}`,
});                             

// Conditions
// Si null alors nouveau tableau de couleur et quantité, push to local storage
  if ( addProductStorage == null ) {
    addProductStorage = [];
    addProductStorage.push(addObject);
    console.log(addProductStorage);
    localStorage.setItem("productStorage", JSON.stringify(addProductStorage)); 
// Sinon si différent de null alors boucle FOR récupère ID et Value pour la quantité
  } else if(addProductStorage != null) {
      console.log(addProductStorage.indexOf(itemsData._id) !== -1)
    if(addProductStorage.indexOf(itemsData._id) !== -1){
      console.log(addProductStorage.indexOf)
      for( i = 0 ; i < addProductStorage.length ; i++) {
        console.log("test");
// Si le tableau du storage est égal au tableau data 
        if ( 
          addProductStorage[i]._id == itemsData._id && addProductStorage[i].color == selectColor.value ) {
// Tu retournes la couleur && la quantité selectionné par rapport au tableau [i] 
          return (
            addProductStorage[i].quantity = parseInt(addProductStorage[i].quantity) + parseInt(addQuantity.value), // Canapé La nouvelle variable est egale a la somme des deux
            console.log(addProductStorage[i].quantity),
            localStorage.setItem("productStorage", JSON.stringify(addProductStorage)),
            addProductStorage = JSON.parse(localStorage.getItem("productStorage")));
            } else {
              addProductStorage.push(addObject);
              console.log(addProductStorage);
              localStorage.setItem("productStorage", JSON.stringify(addProductStorage));
            }
        }} else {
          addProductStorage.push(addObject);
          console.log(addProductStorage);
          localStorage.setItem("productStorage", JSON.stringify(addProductStorage));
        }
    };
       // Le local storage n'est pas mis a jour instantanement, Revoir la quantité
  }); 
  return (addProductStorage = JSON.parse(localStorage.getItem("productStorage")));
}  