// Function to create the pop-up
function createSignUpPopup() {
    // Create the pop-up container
    const popupContainer = document.createElement("div");
    popupContainer.id = "email-signup-popup";
    popupContainer.style.position = "fixed";
    popupContainer.style.top = "50%";
    popupContainer.style.left = "50%";
    popupContainer.style.transform = "translate(-50%, -50%)";
    popupContainer.style.width = "400px";
    popupContainer.style.backgroundColor = "#fff";
    popupContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
    popupContainer.style.borderRadius = "10px";
    popupContainer.style.padding = "20px";
    popupContainer.style.zIndex = "1000";
    popupContainer.style.textAlign = "center";
    popupContainer.style.fontFamily = "Arial, sans-serif";

    // Create the title
    const title = document.createElement("h2");
    title.textContent = "Stay Updated!";
    title.style.marginBottom = "10px";

    // Create the description
    const description = document.createElement("p");
    description.textContent = "Sign up with your email to receive the latest deals and updates.";
    description.style.marginBottom = "20px";

    // Create the email input
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.placeholder = "Enter your email";
    emailInput.style.width = "100%";
    emailInput.style.padding = "10px";
    emailInput.style.marginBottom = "15px";
    emailInput.style.border = "1px solid #ddd";
    emailInput.style.borderRadius = "5px";

    // Create the sign-up button
    const signUpButton = document.createElement("button");
    signUpButton.textContent = "Sign Up";
    signUpButton.style.width = "100%";
    signUpButton.style.padding = "10px";
    signUpButton.style.backgroundColor = "#007BFF";
    signUpButton.style.color = "#fff";
    signUpButton.style.border = "none";
    signUpButton.style.borderRadius = "5px";
    signUpButton.style.cursor = "pointer";

    // Add click event to the button
    signUpButton.addEventListener("click", () => {
        const email = emailInput.value.trim();
        if (email) {
            alert(`Thank you for signing up, ${email}!`);
            document.body.removeChild(popupContainer); // Remove the pop-up
        } else {
            alert("Please enter a valid email address.");
        }
    });

    // Create the close button
    const closeButton = document.createElement("span");
    closeButton.textContent = "×";
    closeButton.style.position = "absolute";
    closeButton.style.top = "10px";
    closeButton.style.right = "10px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontSize = "20px";

    // Add click event to the close button
    closeButton.addEventListener("click", () => {
        document.body.removeChild(popupContainer); // Remove the pop-up
    });

    // Append elements to the container
    popupContainer.appendChild(closeButton);
    popupContainer.appendChild(title);
    popupContainer.appendChild(description);
    popupContainer.appendChild(emailInput);
    popupContainer.appendChild(signUpButton);

    // Append the container to the body
    document.body.appendChild(popupContainer);
}

// Trigger the pop-up (example: after 5 seconds)
setTimeout(createSignUpPopup, 5000);
