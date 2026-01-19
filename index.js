const navBar = document.querySelector("nav");

//window.addEventListener("scroll", (e) => {
//  if (window.scrollY > 880) {
//    navBar.style.top = "0";
//  } else if (window.scrollY == 0) {
//    navBar.style.top = "0";
//  } else {
//    navBar.style.top = "-50px";
//  }
//});

const imgFolio = document.querySelectorAll(".portFolio a");

imgFolio.forEach((a) => {
  let name = a.text.split(" ").join("_");
  a.style.background = `url(./assets/img/${name}.png) top/cover no-repeat`;
});

//////////////////////////////////////////

let positionAccueil = accueil.getBoundingClientRect().top;
let positionAboutMe = aboutMe.getBoundingClientRect().top;
let positionPortFolio = portFolio.getBoundingClientRect().top;

window.addEventListener("scroll", (e) => {
  if (window.scrollY == 0) {
    navBar.style.top = "0";
    btnAccueil.style.color = "#38bdf8";
    btnAboutMe.style.color = "black";
    btnPortFolio.style.color = "black";
  }
  if (window.scrollY > positionAccueil && window.scrollY < positionAboutMe) {
    navBar.style.top = "-50px";
    btnAccueil.style.color = "#38bdf8";
    btnAboutMe.style.color = "black";
    btnPortFolio.style.color = "black";
  }
  if (window.scrollY >= positionAboutMe && window.scrollY < positionPortFolio) {
    navBar.style.top = "0";
    btnAccueil.style.color = "black";
    btnAboutMe.style.color = "#38bdf8";
    btnPortFolio.style.color = "black";
  }
  if (window.scrollY >= positionPortFolio) {
    navBar.style.top = "0";
    btnAccueil.style.color = "black";
    btnAboutMe.style.color = "black";
    btnPortFolio.style.color = "#38bdf8";
  }
});
