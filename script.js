document.addEventListener('DOMContentLoaded', () => {
    const users = {}; // Store user data with email as the key

    // Screens
    const openScreen = document.getElementById('openScreen');
    const signupScreen = document.getElementById('signupScreen');
    const rewardScreen = document.getElementById('rewardScreen');
    const transactionScreen = document.getElementById('transactionScreen');

    // Input fields
    const openEmail = document.getElementById('openEmail');
    const openPassword = document.getElementById('openPassword');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const nameInput = document.getElementById('name');
    const rewardName = document.getElementById('rewardName');
    const rewardEmail = document.getElementById('rewardEmail');
    const voucherCode = document.getElementById('voucherCode');
    const walletAddress = document.getElementById('walletAddress');
    const businessName = document.getElementById('businessName');
    const businessEmail = document.getElementById('businessEmail');

    // Initialize EmailJS
    emailjs.init("sz2ImWOwFnVKy4qrF");

    // Login
    document.getElementById('loginBtn').addEventListener('click', () => {
        const email = openEmail.value.trim();
        const password = openPassword.value.trim();

        if (users[email] && users[email].password === password) {
            openScreen.classList.add('hidden');
            rewardScreen.classList.remove('hidden');
            rewardEmail.value = email;
            rewardName.value = users[email].name;
        } else {
            alert("Invalid email or password.");
        }
    });

    // Signup
    document.getElementById('signupSubmitBtn').addEventListener('click', () => {
        const email = signupEmail.value.trim();
        const password = signupPassword.value.trim();
        const confirmPass = confirmPassword.value.trim();
        const name = nameInput.value.trim();

        if (!email || !password || !confirmPass || !name) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPass) {
            alert("Passwords do not match.");
            return;
        }

        if (users[email]) {
            alert("This email is already registered.");
            return;
        }

        users[email] = { name, password };
        alert("Signup successful! Please log in.");
        signupScreen.classList.add('hidden');
        openScreen.classList.remove('hidden');
    });

    // Submit Reward
    document.getElementById('submitRewardBtn').addEventListener('click', () => {
        const name = rewardName.value.trim();
        const email = rewardEmail.value.trim();
        const voucher = voucherCode.value.trim();
        const wallet = walletAddress.value.trim();
        const business = businessName.value.trim();
        const businessEmailValue = businessEmail.value.trim();

        if (!voucher || !wallet || !business || !businessEmailValue) {
            alert("Please fill in all fields.");
            return;
        }

        // Update Transaction Screen
        transactionScreen.classList.remove('hidden');
        rewardScreen.classList.add('hidden');
        document.getElementById('transName').textContent = name;
        document.getElementById('transEmail').textContent = email;
        document.getElementById('transVoucherCode').textContent = voucher;
        document.getElementById('transWallet').textContent = wallet;
        document.getElementById('transBusinessName').textContent = business;
        document.getElementById('transBusinessEmail').textContent = businessEmailValue;

        // Send Email using EmailJS
        emailjs.send("service_4b371jn", "template_y0f3pw9", {
            name,
            email,
            voucher_code: voucher,
            wallet_address: wallet,
            business_name: business,
            business_email: businessEmailValue,
        })
        .then(() => {
            alert("Reward data emailed successfully!");
        })
        .catch((error) => {
            console.error("Error:", error);
            alert("Failed to send reward data.");
        });
    });

    // Navigation
    document.getElementById('backToReward').addEventListener('click', () => {
        transactionScreen.classList.add('hidden');
        rewardScreen.classList.remove('hidden');
    });

    document.getElementById('backToLogin').addEventListener('click', () => {
        rewardScreen.classList.add('hidden');
        openScreen.classList.remove('hidden');
    });

    document.getElementById('signupBtn').addEventListener('click', () => {
        openScreen.classList.add('hidden');
        signupScreen.classList.remove('hidden');
    });

    document.getElementById('backToOpen').addEventListener('click', () => {
        signupScreen.classList.add('hidden');
        openScreen.classList.remove('hidden');
    });
});
