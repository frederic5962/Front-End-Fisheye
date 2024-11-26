 function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function submitForm() {
    document.getElementById("contact_form").onsubmit = function(event) {
        event.preventDefault();

        const firstName = document.getElementById("firstName").value;
        const lastName = document.getElementById("lastName").value;
        const email = document.getElementById("email").value;
        const message = document.getElementById("message").value;
        
      const data = {
        firstName,
        lastName,
        email,
        message
      };
      alert("Message envoyé !");
      console.log(data);

      const modal = document.getElementById("contact_modal");
      modal.style.display = "none";
    };
    }


