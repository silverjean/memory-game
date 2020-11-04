// imagens do jogo
let arrayImg = [];
for (let i = 0; i < 10; i++) {
  arrayImg.push(`../img/img${i}.png`);
}
let bgImg = "../img/capa.jpg";
let clickBlock = false;
let showingCard = false;
let positionShowCard = -1;
let valueShowCard = 0;
let ponts = 0;

//variavel dos pares do jogo
let cards = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10];

function loadImg() {
  let divImg = document.querySelectorAll(".memory img");
  divImg.forEach(function (img, i) {
    img.src = bgImg;
    img.setAttribute("data-value", i);
    img.style.opacity = 0.6;
  });

  document.getElementById("reset").onclick = start;
}

function start() {
  for (let index = 0; index < cards.length; index++) {
    const element = Math.trunc(Math.random() * cards.length);
    let trade = cards[element];
    cards[element] = cards[index];
    cards[index] = trade;
  }
  let divImg = document.querySelectorAll(".memory img");
  divImg.forEach(function (img, i) {
    img.onclick = clickImg;
    img.style.opacity = 1;
  });

  bgImg = "../img/capa.jpg";
  clickBlock = false;
  showingCard = false;
  positionShowCard = -1;
  valueShowCard = 0;
  ponts = 0;
}

function clickImg(event) {
  if (clickBlock) return;
  const p = +event.target.getAttribute("data-value");
  const value = cards[p];
  event.target.src = arrayImg[value - 1];
  event.target.onclick = null;

  if (!showingCard) {
    showingCard = true;
    positionShowCard = p;
    valueShowCard = value;
  } else {
    if (value == valueShowCard) {
      ponts++;
    } else {
      const position = positionShowCard;
      clickBlock = true;
      setTimeout(function () {
        event.target.src = bgImg;
        event.target.onclick = clickImg;
        let img = document.querySelector(".memory #i" + position);
        img.src = bgImg;
        img.onclick = clickImg;
        clickBlock = false;
      }, 1500);
    }
    showingCard = false;
    positionShowCard = -1;
    valueShowCard = 0;
  }
  if ((ponts = 10)) {
    document.getElementById("reset").disabled = false;
  }
}

loadImg();
