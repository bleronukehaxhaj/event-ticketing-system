const url = 'http://localhost:8080/api/booked-tickets';


const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId');
const ticketId = localStorage.getItem('selectedTicketId')
document.getElementById("btnBack").href = `../pages/details-event.html?eventId=${eventId}`;
const totalPrice=localStorage.getItem('selectedTicketPrice')

const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const emailBook = document.getElementById('email');
const phoneNumber = document.getElementById('phoneNumber');
const btnBookEvent = document.getElementById('btnBookEvent');
const total = document.getElementById('total');
total.innerHTML=`Total: $${totalPrice}`;

async function bookEvent() {

    const bookEventData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: emailBook.value,
        phoneNumber: phoneNumber.value,

    };


    try {
        const response = await fetch(url + "/" + eventId + "/" + ticketId, {
            method: 'POST',
            body: JSON.stringify(bookEventData),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const res = await response.text()
        if (confirm("You booked successfully your ticket!")) {
            window.location.href = '../pages/index.html'
            localStorage.removeItem('selectedTicketId');
            localStorage.removeItem('selectedTicketPrice');
        }
    } catch (error) {
        console.error('Error in createEvent:', error.message);
        alert('An error occurred. Please try again later.');
    }
}

btnBookEvent.addEventListener('click', (event) => {
    event.preventDefault();
    bookEvent();
})


function handlePageUnload() {
    const isTicketSelected = localStorage.getItem('selectedTicketId') !== null;

    if (isTicketSelected) {
        localStorage.removeItem('selectedTicketId');
        localStorage.removeItem('selectedTicketPrice');
    }
}

window.addEventListener('beforeunload', handlePageUnload);