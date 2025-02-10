//변수 선언 - DOM
const strawberry = document.getElementById("strawberry");
const grape = document.getElementById("grape");
const banana = document.getElementById("banana");
const peach = document.getElementById("peach");
const main = document.getElementById("main");

strawberry.addEventListener("click", () => {
  main.src = "./img/strawberry.webp";
});
grape.addEventListener("click", () => {
  main.src = "./img/grape.jpeg";
});
banana.addEventListener("click", () => {
  main.src = "./img/banana.jpeg";
});
peach.addEventListener("click", () => {
  main.src = "./img/peach.jpeg";
});
