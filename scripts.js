document.addEventListener('DOMContentLoaded', () => {
    const rewardScreen = document.getElementById('rewardScreen');
    const transactionScreen = document.getElementById('transactionScreen');

    const rewardName = document.getElementById('rewardName');
    const rewardEmail = document.getElementById('rewardEmail');
    const voucherCode = document.getElementById('voucherCode');
    const walletAddress = document.getElementById('walletAddress');
    const businessName = document.getElementById('businessName');
    const businessEmail = document.getElementById('businessEmail');

    const emailRecipient = "diaahussein110@gmail.com";
    const serviceID = "service_4b371jn";
    const templateID = "template_y0f3pw9";
    const userID = "sz2ImWOwFnVKy4qrF";

    // Rewards Submission
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

        // Send email via emailjs
        emailjs.send(serviceID, templateID, {
            name,
            email,
            voucher_code: voucher,
            wallet_address: wallet,
            business_name: business,
            business_email: businessEmailValue,
            to_email: emailRecipient
        })
        .then(() => {
            alert("Reward data has been emailed successfully!");
        })
        .catch(error => {
            console.error("EmailJS Error:", error);
            alert("Failed to send reward data. Please try again.");
        });

        // Reset the form after submission
        rewardName.value = '';
        rewardEmail.value = '';
        voucherCode.value = '';
        walletAddress.value = '';
        businessName.value = '';
        businessEmail.value = '';
    });

    // Back Button to Reward Screen
    document.getElementById('backToReward').addEventListener('click', () => {
        transactionScreen.classList.add('hidden');
        rewardScreen.classList.remove('hidden');
    });
});
