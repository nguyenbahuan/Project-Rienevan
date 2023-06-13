const template_cart = document.querySelector(".template_cart");

if (localStorage.getItem("cart")) {
  let storage = localStorage.getItem("cart");
  cart = JSON.parse(storage);
  cart.map((item) => {
    template_cart.innerHTML += `<div class="flex ">
    <div class="w-[85px] h-[85px] border border-white overflow-hiden"><img src="${item.img}" alt=""
        class="cart_img w-full object-cover h-full" /></div>
    <div class="ml-3 flex-1 flex flex-column justify-between">
      <h2 class="font-bold cart_name">${item.name}</h2>
      <span class="cart_size">size: 44</span>
      <span class="cart_quantyti">so luong: ${item.Quantyti}</span>

    </div>
    <div class="mr-[10px] flex justify-between flex-column">
      <span class="text-end"><i class="fa-solid fa-rectangle-xmark text-[25px]"></i></span>
      <h2>${item.price}đ</h2>
    </div>
  </div>
  <hr class="my-[15px]">
  </hr>`;
  });
}
