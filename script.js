function switchToSignup() {
    document.getElementById("open-screen").classList.add("hidden");
    document.getElementById("signup-screen").classList.remove("hidden");
}

function switchToLogin() {
    document.getElementById("signup-screen").classList.add("hidden");
    document.getElementById("open-screen").classList.remove("hidden");
}

function forgotPassword() {
    const email = document.getElementById("login-email").value;
    // Here you would handle the logic for resetting the password via email.
    alert(`Reset password link sent to ${email}`);
}

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    // Here you would validate email/password with backend.
    if (email === "test@example.com" && password === "password") {
        document.getElementById("open-screen").classList.add("hidden");
        document.getElementById("reward-screen").classList.remove("hidden");
        document.getElementById("reward-name").value = "Test User"; // Populate with test data
        document.getElementById("reward-email").value = email; // Populate with email
    } else {
        document.getElementById("login-feedback").innerText = "Invalid email or password.";
    }
}

function signup() {
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;
    
    if (password === confirmPassword) {
        // Here you would handle signup logic, such as saving to a database.
        alert(`Signup successful for ${email}`);
        switchToLogin();
    } else {
        alert("Passwords do not match.");
    }
}

function submitReward() {
    const voucherCode = document.getElementById("voucher-code").value;
    const walletAddress = document.getElementById("wallet-address").value;
    const businessName = document.getElementById("business-name").value;
    const businessEmail = document.getElementById("business-email").value;

    // Here you would validate and submit the reward data.
    alert(`Voucher code ${voucherCode} submitted!`);
    switchToTransaction();
}

function switchToTransaction() {
    document.getElementById("reward-screen").classList.add("hidden");
    document.getElementById("transaction-screen").classList.remove("hidden");
}

function backToReward() {
    document.getElementById("transaction-screen").classList.add("hidden");
    document.getElementById("reward-screen").classList.remove("hidden");
}
