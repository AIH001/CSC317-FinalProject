document.addEventListener("DOMContentLoaded", () => {
  console.log("Signup script loaded"); // Debugging
  const form = document.getElementById("signupForm");
  form.addEventListener("submit", handleSignup);
});

async function handleSignup(event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text(); // Parse error as plain text
      throw new Error(
        errorText || "Failed to create an account. Please try again."
      );
    }

    const data = await response.json();
    alert(data.message);
    window.location.href = "/views/login.html"; // Redirect to login page
  } catch (error) {
    alert(`Error: ${error.message}`); // Show error message
    console.error("Signup error:", error); // Debugging
  }
}
