"use strict";
;
const butonIncrement = document.querySelector(".btn-increment");
const butonDecrement = document.querySelector(".btn-decrement");
let inpQuantity = document.querySelector(".inp-quantity").value;
console.log(typeof inpQuantity);
butonIncrement.addEventListener("click", function (e) {
    inpQuantity = Number(inpQuantity) + 1;
    console.log("thanh cong");
    console.log(inpQuantity);
});
/script>;
