const cart = [];

function addProductToCart(product) {
  cart.push(product);
  updateCart();
  showCartDropdown();
}

function updateCart() {
  const cartContent = document.getElementById("cart-content");
  cartContent.innerHTML = "";

  let totalPrice = 0;

  cart.forEach((product, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const productImage = document.createElement("img");
    productImage.src = product.p_image;
    productImage.alt = product.p_name;

    const productInfo = document.createElement("span");
    productInfo.innerHTML = `${product.p_name} <br><br> $${product.p_price}`;

    const removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    removeButton.classList.add("remove-cart-btn");
    removeButton.onclick = function () {
      confirmRemoveFromCart(index);
    };

    cartItem.appendChild(productImage);
    cartItem.appendChild(productInfo);
    cartItem.appendChild(removeButton);

    cartContent.appendChild(cartItem);

    totalPrice += product.p_price; // Add the product price to the total price
  });

  // Display the total price
  const totalPriceElement = document.createElement("div");
  totalPriceElement.classList.add("cart-total");
  totalPriceElement.innerHTML = `Total: $${totalPrice.toFixed(2)}`;
  cartContent.appendChild(totalPriceElement);

  cartContent.style.display = cart.length > 0 ? "block" : "none";
}

function confirmRemoveFromCart(index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You want to remove this product from your cart?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, remove it!",
    cancelButtonText: "No, keep it",
  }).then((result) => {
    if (result.isConfirmed) {
      removeFromCart(index);
      Swal.fire(
        "Removed!",
        "Your product has been removed from the cart.",
        "success"
      );
    }
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
  showCartDropdown();
}

function showCartDropdown() {
  const cartContent = document.getElementById("cart-content");
  if (cart.length > 0) {
    cartContent.style.display = "block";
  } else {
    cartContent.style.display = "none";
  }
}

document.querySelector(".cart a").addEventListener("click", function (event) {
  event.preventDefault();
  const cartContent = document.getElementById("cart-content");
  cartContent.style.display =
    cartContent.style.display === "block" ? "none" : "block";
});
