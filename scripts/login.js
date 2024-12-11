async function handleLogin(event) {
  event.preventDefault(); // Prevent the form from submitting the default way
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid login credentials");
    }

    const data = await response.json();
    alert(`Welcome, ${data.user.name}!`);
    window.location.href = "/profile.html"; // Redirect on successful login
  } catch (error) {
    alert(error.message); // Show error message
  }
}

// Add event listener to the login form
document.querySelector(".login-form").addEventListener("submit", handleLogin);
