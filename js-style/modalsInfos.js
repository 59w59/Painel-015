var modalOne = document.getElementById("modalOne");
var modalTwo = document.getElementById("modalTwo");
var modalThree = document.getElementById("modalThree");

var planOne = document.getElementById("planOne");
var planTwo = document.getElementById("planTwo");
var planThree = document.getElementById("planThree");


planOne.onclick = function (event) {
    event.preventDefault();
    modalOne.style.display = "flex";
}
planTwo.onclick = function (event) {
    event.preventDefault();
    modalTwo.style.display = "flex";
}
planThree.onclick = function (event) {
    event.preventDefault();
    modalThree.style.display = "flex";
}

window.onclick = function (event) {
    if (event.target == modalOne) {
        modalOne.style.display = "none";
    } else if (event.target == modalTwo) {
        modalTwo.style.display = "none";
    } else if (event.target == modalThree) {
        modalThree.style.display = "none";
    }
}

var closeOne = document.getElementById("closeOne");
var closeTwo = document.getElementById("closeTwo");
var closeThree = document.getElementById("closeThree");

closeOne.onclick = function () {
    modalOne.style.display = "none";
}
closeTwo.onclick = function () {
    modalTwo.style.display = "none";
}
closeThree.onclick = function () {
    modalThree.style.display = "none";
}