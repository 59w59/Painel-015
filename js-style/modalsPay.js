// ========== Modals de Pagamento =================

var payOneModal = document.getElementById("payOne");
var payTwoModal = document.getElementById("payTwo");
var payThreeModal = document.getElementById("payThree");

var closeOne = document.getElementById("closePayOne");
var closeTwo = document.getElementById("closePayTwo");
var closeThree = document.getElementById("closePayThree");


closeOne.onclick = function () {
    payOneModal.style.display = "none";
}
closeTwo.onclick = function () {
    payTwoModal.style.display = "none";
}
closeThree.onclick = function () {
    payThreeModal.style.display = "none";
}

