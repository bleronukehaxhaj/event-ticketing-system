const userUrl = 'http://localhost:8080/api/users';


const btnLogout = document.getElementById('btnLogout');

async function logoutUser() {


    const token = localStorage.getItem("authToken")


    try {
        const response = await fetch(userUrl + "/logout", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({authToken: token}),
        });

        if (!response.ok) {
            throw new Error(`Registration failed: ${response.statusText}`);
        }

        const data = await response.text();
        console.log(data);
        localStorage.removeItem("authToken");
        location.reload();
        window.location.href = "./index.html"

    } catch (error) {
        console.error('Error during registration:', error.message);
        alert('Logout failed. Please try again.');
    }
}

btnLogout.addEventListener('click', (event) => {
    event.preventDefault();
    logoutUser();
});

document.addEventListener('DOMContentLoaded', function () {
    const profileDropdown = document.getElementById('navbarDropdown');
    const btnNavCreateEvent = document.getElementById('btnNavCreateEvent');
    const btnNavLogin = document.getElementById('btnNavLogin');


    const token = localStorage.getItem('authToken');

    if (token) {
        profileDropdown.style.display = 'block';
        btnNavLogin.style.display = 'none';
        btnNavCreateEvent.href = './create-event.html';
    } else {
        profileDropdown.style.display = 'none';
        btnNavCreateEvent.href = './login.html';
    }


});

document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.id === 'btnCreateEventBody') {
        const btnCreateEventBody = document.getElementById('btnCreateEventBody');
        const authToken = localStorage.getItem('authToken');

        if (authToken) {
            btnCreateEventBody.href = './create-event.html';
        } else {
            btnCreateEventBody.href = './login.html';
        }
    }

});

let intentionalNavigation = false;

function handlePageUnload() {
    const isTicketSelected = localStorage.getItem('selectedTicketId') !== null;

    if (isTicketSelected && !intentionalNavigation) {
        localStorage.removeItem('selectedTicketId');
        localStorage.removeItem('selectedTicketPrice');
    }
    intentionalNavigation = false;
}

window.addEventListener('beforeunload', handlePageUnload);


document.addEventListener('click', function (event) {

    if (event.target.id === 'btnBookNow') {
        intentionalNavigation = true;

    }
});