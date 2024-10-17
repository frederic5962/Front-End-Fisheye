// Sélection des éléments
var modal = document.getElementById("myModal");
var btn = document.getElementById("openModal");
var span = document.getElementsByClassName("close")[0];

// Ouvrir le modal lorsque l'utilisateur clique sur le bouton
btn.onclick = function() {
    modal.style.display = "block";
};

// Fermer le modal lorsque l'utilisateur clique sur la croix
span.onclick = function() {
    modal.style.display = "none";
};

// Fermer le modal lorsque l'utilisateur clique en dehors du contenu du modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Soumettre le formulaire
document.getElementById('modalForm').onsubmit = function(event) {
    event.preventDefault();
    // Récupérer les valeurs du formulaire
    var lastName = document.getElementById('last_name').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;


    // Afficher les valeurs 
    alert("Prénom: " + lastName + "\nNom: " + name + "\nEmail: " + email + "\nMessage: " + message); 

    // Fermer le modal après soumission
    modal.style.display = "none";
};
