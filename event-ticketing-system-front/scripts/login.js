const userUrl = 'http://localhost:8080/api/users';

const inputPassword = document.getElementById('inputPassword');
const inputEmail = document.getElementById('inputEmail');
const btnLogin = document.getElementById('btnLogin');
function validateLoginFields() {
    const password = inputPassword.value.trim();
    const email = inputEmail.value.trim();

    if (!password || !email) {
        alert('Please enter valid values for all fields.');
        return false;
    }

    return true;
}

async function loginUser() {
    if (!validateLoginFields()) {
        return;
    }
    const password = inputPassword.value;
    const email = inputEmail.value;



    const userDto = {
        password: password,
        email: email
    };

    try {
        const response = await fetch(userUrl + "/login", {
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
        window.location.href='../pages/index.html'
    } catch (error) {
        console.error('Error during registration:', error.message);
        alert('Registration failed. Please try again.');
    }
}

btnLogin.addEventListener('click', (event) => {
    event.preventDefault();
    loginUser();
});
