/////////  Navbar     /////////////////////////////////

const navBar = document.querySelector("nav");
const contactNavbar = document.getElementById("contactNavbar");
let positionAccueil = accueil.getBoundingClientRect().top;
let positionAboutMe = aboutMe.getBoundingClientRect().top;
let positionPortFolio = portFolio.getBoundingClientRect().top;

window.addEventListener("scroll", (e) => {
  if (window.scrollY == 0) {
    navBar.style.top = "0";
    btnAccueil.style.color = "#38bdf8";
    btnAboutMe.style.color = "#f8fafc";
    btnPortFolio.style.color = "#f8fafc";
    contactNavbar.style.display = "none";
  }
  if (window.scrollY > positionAccueil && window.scrollY < positionAboutMe) {
    navBar.style.top = "-50px";
    btnAccueil.style.color = "#38bdf8";
    btnAboutMe.style.color = "#f8fafc";
    btnPortFolio.style.color = "#f8fafc";
    contactNavbar.style.display = "none";
  }
  if (window.scrollY >= positionAboutMe && window.scrollY < positionPortFolio) {
    navBar.style.top = "0";
    btnAccueil.style.color = "#f8fafc";
    btnAboutMe.style.color = "#38bdf8";
    btnPortFolio.style.color = "#f8fafc";
    contactNavbar.style.display = "inline-block";
  }
  if (window.scrollY >= positionPortFolio) {
    navBar.style.top = "0";
    btnAccueil.style.color = "#f8fafc";
    btnAboutMe.style.color = "#f8fafc";
    btnPortFolio.style.color = "#38bdf8";
    contactNavbar.style.display = "inline-block";
  }
});

////////// Anim title /////////////////////////////////////

const target = document.getElementById("animTitle");
let array = ["Jerome Baland", "développeur web", "à votre écoute"];
let wordIndex = 0;
let letterIndex = 0;

const createLetter = () => {
  const letter = document.createElement("span");
  target.appendChild(letter);
  letter.textContent = array[wordIndex][letterIndex];
  setTimeout(() => {
    letter.remove();
  }, 4000);
};

const loop = () => {
  setTimeout(() => {
    if (wordIndex >= array.length) {
      wordIndex = 0;
      letterIndex = 0;
      loop();
    } else if (letterIndex < array[wordIndex].length) {
      createLetter();
      letterIndex++;
      loop();
    } else {
      wordIndex++;
      letterIndex = 0;
      setTimeout(() => {
        loop();
      }, 4000);
    }
  }, 80);
};
loop();

///////// Background portfolio //////////////

const imgFolio = document.querySelectorAll(".portFolio a");

imgFolio.forEach((a) => {
  const titleFolio = a.querySelector("h3");
  let name = titleFolio.textContent.split(" ").join("_");
  a.style.background = `url(./assets/img/${name}.png) top/cover no-repeat`;
});

////////// Formulaire /////////////////////////////////////

const form = document.querySelector("form");
const formBtn = document.querySelector("#formBtn");

let lastname, firstname, email, message;
let dataForm = {};

const inputs = document.querySelectorAll(
  'input[type="text"],input[type="email"],textarea',
);
const span = document.querySelector("#result");

const errorDisplay = (tag, message, valid) => {
  const input = document.querySelector("#" + tag);
  if (!valid) {
    input.classList.add("error");
    span.textContent = message;
    span.style.color = "red";
  } else {
    input.classList.remove("error");
    span.textContent = message;
  }
};
const btnChecked = (valid) => {
  if (lastname && firstname && email && message) {
    formBtn.classList.add("btnActive");
  } else {
    if (valid == true) {
      formBtn.textContent = "Message envoyé";
      formBtn.style.background = "green";
    }
    formBtn.classList.remove("btnActive");
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "lastName":
        lastnameChecked(e.target.value);
        break;
      case "firstName":
        firstnameChecked(e.target.value);
        break;
      case "email":
        emailChecked(e.target.value);
        break;
      case "message":
        messageChecked(e.target.value);
        break;
      default:
        null;
    }
    btnChecked();
  });
});

const lastnameChecked = (value) => {
  if ((value.length > 0 && value.length < 3) || value.length > 20) {
    errorDisplay(
      "lastName",
      "Votre nom doit être compris entre 3 et 20 caractères",
    );
    lastname = null;
  } else if (!value.match(/^[a-zA-Z_-]*$/)) {
    errorDisplay(
      "lastName",
      "Votre nom ne doit pas contenir de caractères spéciaux",
    );
    lastname = null;
  } else {
    errorDisplay("lastName", "", true);
    lastname = value;
  }
};
const firstnameChecked = (value) => {
  if ((value.length > 0 && value.length < 3) || value.length > 20) {
    errorDisplay(
      "firstName",
      "Votre prénom doit être compris entre 3 et 20 caractères",
    );
    firstname = null;
  } else if (!value.match(/^[a-zA-Z_-]*$/)) {
    errorDisplay(
      "firstName",
      "Votre prénom ne doit pas contenir de caractères spéciaux",
    );
    firstname = null;
  } else {
    errorDisplay("firstName", "", true);
    firstname = value;
  }
};
const emailChecked = (value) => {
  if (!value.match(/^[\w_.-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "L'adresse mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};
const messageChecked = (value) => {
  if (value.length > 0 && value.length < 10) {
    errorDisplay(
      "message",
      "Votre message doit contenir un minimum de 10 caractères",
    );
    message = null;
  } else {
    errorDisplay("message", "", true);
    message = value;
  }
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (lastname && firstname && email && message) {
    let data = new FormData(e.target);
    fetch(e.target.action, {
      method: form.method,
      body: data,
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        submitError("Merci ! Votre message a été envoyé.", true);
        inputs.forEach((input) => (input.value = ""));
        lastname = null;
        firstname = null;
        email = null;
        message = null;
        btnChecked(true);
        form.reset();
      } else {
        submitError("Oups ! Il y a eu un problème.");
      }
    });
  } else {
    return;
  }
});

const submitError = (message, valid) => {
  if (!valid) {
    span.textContent = message;
    span.style.color = "red";
  } else {
    span.style.color = "green";
    span.textContent = message;
  }
};

///////////////////////////////////////////////////////////////////////////
