// Utility Function to Reset Fields 
function resetFields() {
  document.querySelectorAll('input').forEach(input => (input.value = ""));
}

// Navigation Handlers
document.getElementById("go-to-sign-up").addEventListener("click", () => {
  resetFields();
  document.getElementById("login-screen").classList.add("hidden");
  document.getElementById("sign-up-screen").classList.remove("hidden");
});

document.querySelectorAll(".back-btn").forEach(button => {
  button.addEventListener("click", () => {
    resetFields();
    document.querySelectorAll(".screen").forEach(screen => screen.classList.add("hidden"));
    document.getElementById("login-screen").classList.remove("hidden");
  });
});

// Store User Data Locally
function storeUserData(user) {
  localStorage.setItem("cryptozUser", JSON.stringify(user));
}

// Retrieve User Data
function getUserData() {
  const userData = localStorage.getItem("cryptozUser");
  return userData ? JSON.parse(userData) : null;
}

// Sign-Up Button Handler
document.getElementById("sign-up-btn").addEventListener("click", () => {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("sign-up-email").value.trim();
  const password = document.getElementById("sign-up-password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  if (name && email && password && password === confirmPassword) {
    storeUserData({ name, email, password });
    alert("Sign-Up Successful. Please log in.");
    resetFields();
    document.getElementById("sign-up-screen").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
  } else {
    alert("Please fill all fields correctly and ensure passwords match.");
  }
});

// Login Button Handler
document.getElementById("login-btn").addEventListener("click", () => {
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  const user = getUserData();
  if (user && user.email === email && user.password === password) {
    alert("Login Successful");
    resetFields();
    document.getElementById("name-display").value = user.name; // Populate name
    document.getElementById("email-display").value = user.email; // Populate email
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("rewards-screen").classList.remove("hidden");
  } else {
    alert("Invalid email or password.");
  }
});

// Rewards Submission Handler
document.getElementById("submit-reward-btn").addEventListener("click", () => {
  const voucherCode = document.getElementById("voucher-code").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const walletAddress = document.getElementById("wallet-address").value.trim();
  const businessEmail = document.getElementById("business-email").value.trim();
  const user = getUserData();

  if (voucherCode && amount && walletAddress && businessEmail && user) {
    if (isNaN(amount) || parseFloat(amount) <= 0) {
      alert("Please enter a valid reward amount.");
      return;
    }

    // Send email to company
    sendEmailToCompany({
      name: user.name,
      amount: amount,
      wallet: walletAddress,
      businessEmail: businessEmail,
    });

    alert("Reward Submitted Successfully!");
    resetFields();
    document.getElementById("rewards-screen").classList.add("hidden");
    document.getElementById("transaction-screen").classList.remove("hidden");

    // Update transaction details
    document.getElementById("transaction-date").textContent = new Date().toLocaleString();
    document.getElementById("transaction-amount").textContent = `$${amount}`;
    document.getElementById("transaction-wallet").textContent = walletAddress;
  } else {
    alert("Please fill all fields.");
  }
});

// Function to Send Email to Company
function sendEmailToCompany(details) {
  emailjs.send("service_4b371jn", "template_y0f3pw9", {
    name: details.name,
    amount: details.amount,
    wallet: details.wallet,
    businessEmail: details.businessEmail,
    note: "The app was used, and the customer has requested coins. Please transfer the amount to your bank account.",
  }, "sz2ImWOwFnVKy4qrF")
    .then((response) => {
      console.log("Email sent successfully to company:", response);
    })
    .catch((error) => {
      console.error("Error sending email to company:", error);
    });
}
