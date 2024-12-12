function togglePassword() {
    const passwordField = document.getElementById('login-password');
    const toggleButton = passwordField.nextElementSibling;

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.textContent = '🙈';
    } else {
        passwordField.type = 'password';
        toggleButton.textContent = '👁️'
    }
}

function toggleRegisterPassword() {
    const passwordField = document.getElementById('register-password');
    const toggleButton = passwordField.nextElementSibling;

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.textContent = '🙈';
    } else {
        passwordField.type = 'password';
        toggleButton.textContent = '👁️';
    }
}

function toggleRegisterConfirmPassword() {
    const passwordField = document.getElementById('register-confirm-password');
    const toggleButton = passwordField.nextElementSibling;

    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleButton.textContent = '🙈';
    } else {
        passwordField.type = 'password';
        toggleButton.textContent = '👁️'
    }
}

function showRegister() {
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('register-form').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('register-form').classList.add('hidden');
}

function isValidPhoneNumber(phoneNumber) {
    // Regular expression to validate Indian phone numbers (Jio and VI specific patterns)
    const jioRegex = /^[6-9]\d{9}$/;
    const viRegex = /^[7-9]\d{9}$/;
    return jioRegex.test(phoneNumber) || viRegex.test(phoneNumber);
}

function isValidPassword(password) {
    // Regular expression to validate password strength
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%^&+=!]).{6,10}$/;
    return passwordRegex.test(password);
}

function sendOTP() {
    const phoneNumber = document.getElementById('register-number').value;
    const otpButton = document.getElementById('send-otp-button');
    const otpMessage = document.getElementById('otp-message');

    if (phoneNumber === '') {
        showBlankFieldPopup(); // Show the pop-up if phone number is missing
    } else if (isValidPhoneNumber(phoneNumber)) {
        showOTPConfirmationPopup(); // Show the pop-up image for OTP confirmation
        otpButton.classList.add('hidden')// Change the button text to "Please Wait For OTP..."
        otpMessage.classList.remove('hidden')
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        localStorage.setItem('otp', otp);// Generate a unique OTP
        setTimeout(() => { // Display a pop-up message with a delay of 5-6 seconds
            alert(`Your OTP (One Time Password) for register is: ${otp} Do not share it with anyone.`);
            document.getElementById('otp-section').classList.remove('hidden');
            otpMessage.classList.add('hidden');// Remove the "Please Wait For the OTP..." after 5 second
        }, 5000); // 5000 milisecond = 5 second
    } else {
        showPhoneErrorPopup(); // Show the pop-up image if the phone number is invalid
    }
}

function showOTPConfirmationPopup() {
    const otpConfirmationPopup = document.getElementById('otp-confirmation-popup');
    otpConfirmationPopup.classList.remove('hidden');
    setTimeout(() => {
        hideOTPConfirmationPopup();
    }, 2000); // Hide the pop-up after 
}

function hideOTPConfirmationPopup() {
    const otpConfirmationPopup = document.getElementById('otp-confirmation-popup');
    otpConfirmationPopup.classList.add('hidden');
}

function showPhoneErrorPopup() {
    const phoneErrorPopup = document.getElementById('phone-error-popup');
    phoneErrorPopup.classList.remove('hidden');
    setTimeout(() => {
        hidePhoneErrorPopup();
    }, 2000); // Hide the pop-up after 2 after 
}

function hidePhoneErrorPopup() {
    const phoneErrorPopup = document.getElementById('phone-error-popup');
    phoneErrorPopup.classList.add('hidden');
}

function showBlankFieldPopup() {
    const blankFieldPopup = document.getElementById('blank-field-poup');
    blankFieldPopup.classList.remove('hidden');
    setTimeout(() => {
        hideBlankFieldPopup();
    }, 2000); // Hide the pop-up after 2s
}

function hideBlankFieldPopup() {
    const blankFieldPopup = document.getElementById('blank-field-popup');
    blankFieldPopup.classList.add('hidden');
}

function verifyOTP() {
    const enteredOTP = document.getElementById('register-otp').value;
    const generatedOTP = localStorage.getItem('otp');
    const otpButton = document.getElementById('send-otp-button');
    const otpMessage = document.getElementById('otp-message');
    const verifyingMessage = document.getElementById('verifying-message');

    verifyingMessage.classList.remove('hidden');
    otpMessage.classList.add('hidden');

    // Show "Verifying...🔍" text and delay for 3s
    setTimeout(() => {
        if (enteredOTP === generatedOTP) {
            showOTPVerifiedPopup(); // Show the image pop-up if OTP is verified
            document.getElementById('otp-section').classList.add('hidden');
            document.getElementById('register-username').disabled = false;
            document.getElementById('register-password').disabled = false;
            document.getElementById('register-confirm-password').disabled = false;
            document.getElementById('register-button').disabled = false;
        } else {
            showInvalidOTPPopup(); // Show the image pop-up if OTP in invalid
            otpButton.classList.remove('hidden'); // Show the "Send OTP" button
            otpMessage.classList.add('hidden'); // Hide the "Please Wait For OTP.. " message if OTP is invalid
        }
        verifyingMessage.classList.add('hidden'); // Remove the "Verifying..." text
    }, 3000); // Delay for 3s
}

function showOTPVerifiedPopup() {
    const otpVerifiedPopup = document.getElementById('otp-verified-popup');
    otpVerifiedPopup.classList.remove('hidden');
    setTimeout(() => {
        otpVerifiedPopup.classList.add('hidden');
    }, 2000); // Hide the pop-up after 2s
}

function showInvalidOTPPopup() {
    const invalidOTPPopup = document.getElementById('invalid-otp-popup');
    invalidOTPPopup.classList.remove('hidden');
    setTimeout(() => {
        invalidOTPPopup.classList.add('hidden');
    }, 2000); // Hide the Pop-up after 2s
}

function register() {
    const name = document.getElementById('register-name').value;
    const phoneNumber = document.getElementById('register-number').value;
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    if (name === '' || phoneNumber === '' || username === '' || password === '' || confirmPassword === '') {
        showBlankFieldPopup(); // Show the pop-up image if any field is blank
            return;
        }

        if (password !== confirmPassword) {
            showPasswordMismatchPopup(); // Show the image pop-up for password mismatch
            return;
        }

        if (!isValidPassword(password)) {
            showPasswordStrenghthPopup(); // Show the pop-up for password strength
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (!users[username]) {
            users[username] = { name, phoneNumber, password, balance: 0, history: [], email: '', photo: '' };
            localStorage.setItem('users', JSON.stringify(users));
            showRegistrationSuccessPopup();
            showLogin();
        } else {
            showUsernameExistsPopup(); // Show the image pop-up for username already exist
        }
    }

    function showPasswordMismatchPopup() {
        const passwordMismatchPopup = document.getElementById('password-mismatch-popup');
        passwordMismatchPopup.classList.remove('hidden');
        setTimeout(() => {
            passwordMismatchPopup.classList.add('hidden');
        }, 2000); // Hide the pop-up after 2s
    }

    function showPasswordStrenghthPopup() {
        const passwordStrengthPopup = document.getElementById('password-strength-popup');
        passwordStrengthPopup.classList.remove('hidden');
        setTimeout(() => {
            passwordStrengthPopup.classList.add('hidden');
        }, 2000); // Hide the pop-up after 2s
    }

    function showUsernameExistsPopup() {
        const usernameExistsPopup = document.getElementById('username-exists-popup');
        usernameExistsPopup.classList.remove('hidden');
        setTimeout(() => {
            usernameExistsPopup.classList.add('hidden');
        }, 2000); // Hide the pop-up after 2s
    }

    function showRegistrationSuccessPopup() {
        const RegistrationSuccessPopup = document.getElementById('registration-success-popup');
        RegistrationSuccessPopup.classList.remove('hidden');
        setTimeout(() => {
            RegistrationSuccessPopup.classList.add('hidden')
        }, 4000) // Hide the pop-up after 2s
    }

    // function showBlankFieldPopup() {
    //     const blankFieldPopup = document.getElementById('blank-field-popup');

    //     blankFieldPopup.classList.remove('hidden');
    //     setTimeout(() => {
    //         hideBlankFieldPopup();
    //     }, 2000); // Hide the pop-up after 2 second
    // }

    // function hideBlankFieldPopup() {
    //     const blankFieldPopup = document.getElementById('blank-field-popup');
    //     blankFieldPopup.classList.add('hidden');
    // }

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username === '' || password === '') {
        showBlankFieldPopup(); //Show the pop_up image if any field is blank
        return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username] && users[username].password === password) {
        localStorage.setItem('currentUser', username);
        window.location.href = 'index.html';
    } else {
        showErrorPopup();
    }
}

function showErrorPopup() {
    const errorPopup = document.getElementById('error-popup');
    
    errorPopup.classList.remove('hidden');
    setTimeout(() => {
        hideErrorPopup();
    }, 2000); // Hide the pop-up after 2 seconds
}

function hideErrorPopup() {
    const errorPopup = document.getElementById('error-popup');
    errorPopup.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('currentUser')) {
        window.location.href = 'index.html';
    }
});
