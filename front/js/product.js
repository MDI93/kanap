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
} 

getOneKanap()