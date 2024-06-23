document.addEventListener("DOMContentLoaded", async () => {
  const productList = document.getElementById("product-list");

  try {
    const response = await fetch("/findAll");
    const products = await response.json();
    console.log("products:", products);
    products.reverse();

    products.forEach((product) => {
      const productContent = document.createElement("div");
      productContent.classList.add("product");
      productContent.dataset.productId = product.p_id;
      productContent.innerHTML = `
                <h3>${product.p_name}</h3>
                <img src="${product.p_image}" alt="${product.p_name}" />
                <p>${product.p_description}</p>
                <p>Quantity: ${product.p_quantity}</p>
                <p>Price: $${product.p_price}</p>
                <div class="button-container">
                <button class="add-to-cart-btn" onclick="addToCart(${product.p_id})">Add to Cart</button>
                <button class="remove-btn" onclick="removeProduct(${product.p_id})">Remove</button>
                </div>
            `;
      productList.appendChild(productContent);
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
});

async function addToCart(productId) {
  try {
    const response = await fetch(`/findProduct/${productId}`);
    const product = await response.json();
    addProductToCart(product);
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
}

async function removeProduct(productId) {
  try {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this product!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      const response = await fetch(`/deleteProduct/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the product from the UI
        const productToRemove = document.querySelector(
          `[data-product-id="${productId}"]`
        );
        if (productToRemove) {
          productToRemove.remove();
          Swal.fire("Deleted!", "Your product has been deleted.", "success");
          console.log(`Product with ID ${productId} removed successfully`);
        } else {
          console.error(`Product with ID ${productId} not found in the UI`);
        }
      } else {
        console.error("Failed to remove product:", response.statusText);
        Swal.fire("Error!", "Failed to remove product.", "error");
      }
    }
  } catch (error) {
    console.error("Error removing product:", error);
    Swal.fire("Error!", "Error removing product.", "error");
  }
}
