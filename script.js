const prizes = [
    "5% de réduction",
    "10% de réduction",
    "15% de réduction",
    "20% de réduction",
    "Un chocolat offert"
];

const button = document.getElementById("spinButton");
const result = document.getElementById("result");

button.addEventListener("click", () => {

    const randomIndex = Math.floor(Math.random() * prizes.length);

    result.textContent = prizes[randomIndex];

});