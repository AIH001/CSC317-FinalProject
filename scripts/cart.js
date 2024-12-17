// Add Product to Cart
async function addToCart(productId) {
  try {
    const response = await fetch("/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });

    const result = await response.json();
    alert(result.message); // Show feedback to the user
  } catch (err) {
    console.error("Error adding to cart:", err);
    alert("Failed to add product to cart.");
  }
}

// Fetch Cart Items
async function fetchCart() {
  try {
    const response = await fetch("/api/cart");
    const cartItems = await response.json();

    const container = document.getElementById("cart-items-container");
    const totalElement = document.getElementById("cart-total");

    // Clear the container
    container.innerHTML = "";

    if (cartItems.length === 0) {
      // Display a "Cart is Empty" message
      container.innerHTML = "<p>Your cart is currently empty.</p>";
      totalElement.textContent = "$0.00";
      return;
    }

    let total = 0;

    // Dynamically add cart items
    cartItems.forEach((item) => {
      total += item.price;

      const cartItemHTML = `
        <div class="cart-item">
          <img src="${item.image_url}" alt="${item.name}" class="cart-item-image" />
          <div class="cart-item-details">
            <h2>${item.name}</h2>
            <p>Price: $${item.price.toFixed(2)}</p>
            <button class="cta-btn" onclick="removeFromCart(${item.id})">Remove</button>
          </div>
        </div>
      `;
      container.innerHTML += cartItemHTML;
    });

    // Update the total price
    totalElement.textContent = `$${total.toFixed(2)}`;
  } catch (err) {
    console.error("Error fetching cart items:", err);
  }
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
