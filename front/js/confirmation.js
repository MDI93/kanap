// On cherche le orderId dans le urlsp
const newUrl = new URLSearchParams(window.location.search);
const confirmationOrderNumber = newUrl.get('id');

// Fonction pour afficher le numéro de commande
function displayOrderNumber(){
    document.getElementById('orderId').innerText = confirmationOrderNumber;
    alert('Votre commande est validée !');
// Vide le local storage au moment du clique sur le bouton commander 
    localStorage.clear();
}
displayOrderNumber();