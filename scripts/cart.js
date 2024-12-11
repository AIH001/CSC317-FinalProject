// Add Product to Cart
async function addToCart(productId) {
  const response = await fetch("/api/cart/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  const result = await response.json();
  alert(result.message);
}

// Fetch Cart Items
async function fetchCart() {
  const response = await fetch("/api/cart");
  const cartItems = await response.json();

  const container = document.querySelector(".cart-container");
  container.innerHTML = "";

  cartItems.forEach((item) => {
    const cartItem = `
        <div class="cart-item">
          <h2>${item.name}</h2>
          <p>$${item.price.toFixed(2)}</p>
          <button onclick="removeFromCart(${item.id})">Remove</button>
        </div>
      `;
    container.innerHTML += cartItem;
  });
}

// Remove Item from Cart
async function removeFromCart(productId) {
  const response = await fetch("/api/cart/remove", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId }),
  });

  const result = await response.json();
  alert(result.message);
  fetchCart(); // Refresh cart
}

// Fetch cart items when the page loads
document.addEventListener("DOMContentLoaded", fetchCart);
