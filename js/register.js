// =======================
// 🌧 MATRIX EFFECT
// =======================
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let letters = "01".split("");
let fontSize = 14;
let columns = canvas.width / fontSize;

let drops = [];
for (let i = 0; i < columns; i++) drops[i] = 1;

function draw() {
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        let text = letters[Math.floor(Math.random()*letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;

        drops[i]++;
    }
}

setInterval(draw, 33);

// =======================
// 📞 TELEPHONE MONDIAL
// =======================
const phoneInput = document.querySelector("#phone");

const iti = window.intlTelInput(phoneInput, {
    initialCountry: "auto",
    geoIpLookup: function(callback) {
        fetch("https://ipapi.co/json")
            .then(res => res.json())
            .then(data => callback(data.country_code))
            .catch(() => callback("cd"));
    },
    separateDialCode: true,
});

// =======================
// 📅 FORMAT DATE AUTO
// =======================
let birthInput = document.getElementById("birthdate");

birthInput.addEventListener("input", function(e) {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 2)
        value = value.slice(0,2) + "/" + value.slice(2);

    if (value.length > 5)
        value = value.slice(0,5) + "/" + value.slice(5,9);

    e.target.value = value;
});

// =======================
// 🔐 VALIDATION + ENVOI BACKEND
// =======================
document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    let password = document.getElementById("password").value;
    let confirm = document.getElementById("confirmPassword").value;
    let birthdate = document.getElementById("birthdate").value;
    let message = document.getElementById("message");

    let phoneNumber = iti.getNumber() || phoneInput.value;

    let regex = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!regex.test(birthdate)) {
        message.innerText = "❌ Format date invalide (JJ/MM/AAAA)";
        return;
    }

    if (!phoneNumber || phoneNumber.length < 6) {
    message.innerText = "❌ Numéro invalide";
    return;
    }

    if (password !== confirm) {
        message.innerText = "❌ Les mots de passe ne correspondent pas";
        return;
    }

    // 📦 DONNÉES À ENVOYER
    const data = {
        nom: document.getElementById("nom").value,
        postnom: document.getElementById("postnom").value,
        prenom: document.getElementById("prenom").value,
        birthdate: birthdate,
        lieu: document.getElementById("lieu").value,
        phone: phoneNumber,
        email: document.getElementById("email").value,
        password: password
    };

    try {
        const res = await fetch("https://arkanet-backend.onrender.com/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        message.innerText = result.message;

    } catch (error) {
        console.log(error);
        message.innerText = "❌ Erreur de connexion au serveur";
    }
});

// =======================
// 🔄 NAVIGATION
// =======================
function goLogin() {
    window.location.href = "login.html";
}
