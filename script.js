document.addEventListener('DOMContentLoaded', () => {
    const users = {}; // Object to store user data with email as the key

    const openScreen = document.getElementById('openScreen');
    const signupScreen = document.getElementById('signupScreen');
    const rewardScreen = document.getElementById('rewardScreen');
    const transactionScreen = document.getElementById('transactionScreen');

    const openEmail = document.getElementById('openEmail');
    const openPassword = document.getElementById('openPassword');
    const signupEmail = document.getElementById('signupEmail');
    const signupPassword = document.getElementById('signupPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    const nameInput = document.getElementById('name');
    const rewardEmail = document.getElementById('rewardEmail');
    const rewardName = document.getElementById('rewardName');
    const voucherCode = document.getElementById('voucherCode');
    const walletAddress = document.getElementById('walletAddress');
    const businessName = document.getElementById('businessName');
    const businessEmail = document.getElementById('businessEmail');

    // Login Functionality
    document.getElementById('loginBtn').addEventListener('click', () => {
        const email = openEmail.value.trim();
        const password = openPassword.value.trim();

        if (users[email] && users[email].password === password) {
            // Successful login
            openScreen.classList.add('hidden');
            rewardScreen.classList.remove('hidden');

            // Populate rewards screen fields
            rewardEmail.value = email;
            rewardName.value = users[email].name;
        } else {
            alert("Invalid email or password.");
        }
    });

    // Signup Functionality
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

        // Register user
        users[email] = { name, password };
        alert("Signup successful! Please log in.");

        // Clear signup form
        signupEmail.value = '';
        signupPassword.value = '';
        confirmPassword.value = '';
        nameInput.value = '';

        // Navigate back to login
        signupScreen.classList.add('hidden');
        openScreen.classList.remove('hidden');
    });

    // Rewards Submission Functionality
    document.getElementById('submitRewardBtn').addEventListener('click', () => {
        const name = rewardName.value.trim();
        const email = rewardEmail.value.trim();
        const voucher = voucherCode.value.trim();
        const wallet = walletAddress.value.trim();
        const business = businessName.value.trim();
        const businessEmailValue = businessEmail.value.trim();

        if (!name || !email || !voucher || !wallet || !business || !businessEmailValue) {
            alert("Please complete all fields.");
            return;
        }

        // Navigate to transaction screen
        transactionScreen.classList.remove('hidden');
        rewardScreen.classList.add('hidden');

        // Populate transaction screen
        document.getElementById('transName').textContent = name;
        document.getElementById('transEmail').textContent = email;
        document.getElementById('transVoucherCode').textContent = voucher;
        document.getElementById('transWallet').textContent = wallet;
        document.getElementById('transBusinessName').textContent = business;
        document.getElementById('transBusinessEmail').textContent = businessEmailValue;

        // Clear reward form fields
        voucherCode.value = '';
        walletAddress.value = '';
        businessName.value = '';
        businessEmail.value = '';
    });

    // Back Button from Transaction to Reward Screen
    document.getElementById('backToReward').addEventListener('click', () => {
        transactionScreen.classList.add('hidden');
        rewardScreen.classList.remove('hidden');
    });

    // Back Button from Reward to Login Screen
    document.getElementById('backToLogin').addEventListener('click', () => {
        rewardScreen.classList.add('hidden');
        openScreen.classList.remove('hidden');

        // Clear login fields
        openEmail.value = '';
        openPassword.value = '';
    });

    // Navigate to Signup Screen
    document.getElementById('signupBtn').addEventListener('click', () => {
        openScreen.classList.add('hidden');
        signupScreen.classList.remove('hidden');
    });

    // Back Button from Signup to Login Screen
    document.getElementById('backToOpen').addEventListener('click', () => {
        signupScreen.classList.add('hidden');
        openScreen.classList.remove('hidden');
    });
});
