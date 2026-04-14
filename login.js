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
// 📞 TELEPHONE
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
// 🔄 SWITCH LOGIN TYPE
// =======================
const loginType = document.getElementById("loginType");
const phone = document.getElementById("phone");
const email = document.getElementById("email");

loginType.addEventListener("change", function() {
    if (this.value === "phone") {
        phone.style.display = "block";
        email.style.display = "none";
    } else {
        phone.style.display = "none";
        email.style.display = "block";
    }
});

// =======================
// 🔐 VALIDATION
// =======================
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let message = document.getElementById("message");
    let password = document.getElementById("password").value;

    if (loginType.value === "phone") {
        if (!iti.isValidNumber()) {
            message.innerText = "❌ Numéro invalide";
            return;
        }
    } else {
        if (!email.value.includes("@")) {
            message.innerText = "❌ Email invalide";
            return;
        }
    }

    if (password.length < 4) {
        message.innerText = "❌ Mot de passe trop court";
        return;
    }

    message.innerText = "✔ Connexion réussie (simulation)";
});

// =======================
// 🔄 NAVIGATION
// =======================
function goRegister() {
    window.location.href = "register.html";
}