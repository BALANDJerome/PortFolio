const navBar = document.querySelector("nav");

window.addEventListener("scroll", (e) => {
  console.log();
  if (window.scrollY > 880) {
    navBar.style.top = "0";
  } else if (window.scrollY == 0) {
    navBar.style.top = "0";
  } else {
    navBar.style.top = "-50px";
  }
});

const imgFolio = document.querySelectorAll(".portFolio a");

imgFolio.forEach((a) => {
  let name = a.text.split(" ").join("_");
  a.style.background = `url(./assets/img/${name}.png) top/cover no-repeat`;
});
