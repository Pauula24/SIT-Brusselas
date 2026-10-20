//MENÚ HAMBURGUESA
const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");

menuBtn.addEventListener("click", function() {
    menu.classList.toggle("active");
    menuBtn.textContent = menu.classList.contains("active") ? "×" : "☰";
});

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(function(link) {
    link.addEventListener("click", function(event) {
        const targetId = link.getAttribute("href");

        if (targetId === "#") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (targetId.startsWith("#")) {
            event.preventDefault();

            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({ behavior: "smooth" });
            }
        }

        menu.classList.remove("active");
        menuBtn.textContent = "☰";
    });
});


//CLARO/OSCURO

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    themeBtn.textContent = document.body.classList.contains("dark-mode") ? "☀" : "☾";
});


//MOOD

const moodButtons = document.querySelectorAll(".mood-buttons button");
const moodInfo = document.getElementById("moodInfo");
const moodImage = document.getElementById("moodImage");

moodButtons.forEach(function(button) {
    button.addEventListener("click", function() {

        moodButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const mood = button.getAttribute("data-mood");

    //Mood reset
        if (mood === "rest") {

    moodImage.src = "img/descanso.jpg";

    moodInfo.innerHTML =
        "<strong>SLOW DOWN</strong><br>" + "A space to pause, rest and enjoy.";

    } 
    
    //Mood discover
    else if (mood === "discover") {

    moodImage.src = "img/Charlas.jpg";

    moodInfo.innerHTML =
        "<strong>SIT & TALK</strong><br>" +
        "Discover and try different design pieces.";

    }

    //Mood play
    else if (mood === "play") {

    moodImage.src = "img/Play2.jpg";

    moodInfo.innerHTML =
        "<strong>MAKE YOUR SEAT</strong><br>" +
        "Workshop to create your own piece.";

    } 
    
    //Mood meet
    else if (mood === "meet") {

    moodImage.src = "img/conocer.jpg";

    moodInfo.innerHTML =
        "<strong>SIT! NIGHT</strong><br>" +
        "Music, design and connection.";
    }
    });
});


//TICKETS

const prices = {
    day: 25,
    full: 45,
    vip: 70
};

const plusButtons = document.querySelectorAll(".plus-btn");
const minusButtons = document.querySelectorAll(".minus-btn");

plusButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const type = button.dataset.ticket;
        const quantity = document.getElementById(type + "Quantity");
        let number = Number(quantity.textContent);

        if (number < 5) {
            number = number + 1;
        }

        quantity.textContent = number;
        updateTotal();
    });
});

minusButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const type = button.dataset.ticket;
        const quantity = document.getElementById(type + "Quantity");
        let number = Number(quantity.textContent);

        if (number > 0) {
            number = number - 1;
        }

        quantity.textContent = number;
        updateTotal();
    });
});

//TICKETS

function updateTotal() {

    const day = Number(document.getElementById("dayQuantity").textContent);
    const full = Number(document.getElementById("fullQuantity").textContent);
    const vip = Number(document.getElementById("vipQuantity").textContent);

    const total =
        day * prices.day +
        full * prices.full +
        vip * prices.vip;

    document.getElementById("totalPrice").textContent = total + " $";
}


//MODAL TICKETS

//Variables de html (identificación)
const buyButton = document.querySelector(".buy-btn");
const ticketModal = document.getElementById("ticketModal");
const modalClose = document.getElementById("modalClose");
const modalBuy = document.getElementById("modalBuy");

const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");

const purchaseMessage = document.getElementById("purchaseMessage");

//Al pulsar recoge el calculo de entradas
buyButton.addEventListener("click", function() {
    const day = Number(document.getElementById("dayQuantity").textContent);
    const full = Number(document.getElementById("fullQuantity").textContent);
    const vip = Number(document.getElementById("vipQuantity").textContent);

    //Los tipos de tickets metidos en el modal (total)
    document.getElementById("modalDay").textContent = day;
    document.getElementById("modalFull").textContent = full;
    document.getElementById("modalVip").textContent = vip;
   
    document.getElementById("modalTotal").textContent =
    document.getElementById("totalPrice").textContent;

    document.getElementById("modalDayRow").style.display = day > 0 ? "flex" : "none";
    document.getElementById("modalFullRow").style.display = full > 0 ? "flex" : "none";
    document.getElementById("modalVipRow").style.display = vip > 0 ? "flex" : "none";

    ticketModal.classList.add("active");
});

 //Resetea la ventana modal

function resetModal() {
    ticketModal.classList.remove("active");
    nameInput.value = "";
    emailInput.value = "";
    purchaseMessage.textContent = "";

    document.querySelector(".modal-small").style.display = "";
    document.querySelector(".modal-content h2").style.display = "";
    document.querySelectorAll(".modal-content label").forEach(function(label) {
        label.style.display = "";
    });

//Después de resetear vuelve a poner los contadores a 0 (como antes - limpia)
    nameInput.style.display = "";
    emailInput.style.display = "";
    document.querySelector(".modal-summary").style.display = "";
    document.querySelector(".modal-total").style.display = "";
    modalBuy.style.display = "";

    document.getElementById("dayQuantity").textContent = "0";
    document.getElementById("fullQuantity").textContent = "0";
    document.getElementById("vipQuantity").textContent = "0";

    document.getElementById("totalPrice").textContent = "0 $";
}

//Botón cerrar
modalClose.addEventListener("click", resetModal);

//Comprar entradas 
modalBuy.addEventListener("click", function() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    //Si los datos estan vacios( sin rellenar)
    if (name === "" || email === "") {
        purchaseMessage.textContent = "PLEASE FILL IN YOUR DETAILS.";
        purchaseMessage.style.color = "var(--orange)";
        return;
    }

    document.querySelector(".modal-small").style.display = "none";
    document.querySelector(".modal-content h2").style.display = "none";
    document.querySelectorAll(".modal-content label").forEach(function(label) {
        label.style.display = "none";
    });

    // Si todo es correcto
    nameInput.style.display = "none";
    emailInput.style.display = "none";
    document.querySelector(".modal-summary").style.display = "none";
    document.querySelector(".modal-total").style.display = "none";
    modalBuy.style.display = "none";

    purchaseMessage.textContent = "THANK YOU FOR YOUR PURCHASE!";
});

//FORMULARIO DE CONTACTO

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault(); //evita que la páguinas se recargue

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensaje = document.getElementById("mensaje").value.trim();

    // Comprueba si esta vacio 
    if (nombre === "" || email === "" || mensaje === "") {
        formMessage.textContent = "Please complete all fields.";
        return;
    }

    //Si todo es correto 
    formMessage.textContent = "Thank you! We have received your message.";
    contactForm.reset();
});

