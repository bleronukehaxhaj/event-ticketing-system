const userUrl = 'http://localhost:8080/api/users';
const inputUsername = document.getElementById('inputUsername');
const inputPassword = document.getElementById('inputPassword');
const inputEmail = document.getElementById('inputEmail');
const btnRegister = document.getElementById('btnRegister');

function validateRegistrationFields() {
    const username = inputUsername.value.trim();
    const password = inputPassword.value.trim();
    const email = inputEmail.value.trim();

    if (!username || !password || !email) {
        alert('Please enter valid values for all fields.');
        return false;
    }

    return true;
}

async function registerUser() {
    if (!validateRegistrationFields()) {
        return;
    }
    const username = inputUsername.value;
    const password = inputPassword.value;
    const email = inputEmail.value;


    const userDto = {
        username: username,
        password: password,
        email: email
    };

    try {
        const response = await fetch(userUrl + "/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDto),
        });

        if (!response.ok) {
            throw new Error(`Registration failed: ${response.statusText}`);
        }

        const data = await response.text();
        console.log(data);
        localStorage.setItem('authToken', data);
        window.location.href = '../pages/index.html';
    } catch (error) {
        console.error('Error during registration:', error.message);
        alert('Registration failed. Please try again.');
    }
}

btnRegister.addEventListener('click', (event) => {
    event.preventDefault();
    registerUser();
});
