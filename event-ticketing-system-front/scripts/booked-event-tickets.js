const url = 'http://localhost:8080/api/booked-tickets';


const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId');

async function getBookedTickets() {
    try {
        const response = await fetch(url + `/event/${eventId}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getAllEvents:', error.message);
        // alert('An error occurred. Please try again later.');
    }
}


function addTableRow(bookedTicket) {
    const tableBody = document.getElementById("bookedTicketTableBody");


    const tableRow = `<tr>
                <td>${bookedTicket.firstName}</td>
                <td>${bookedTicket.lastName}</td>
                <td>${bookedTicket.email}</td>
                <td>${bookedTicket.phoneNumber}</td>
                <td>${bookedTicket.ticket.ticketType}</td>
                <td>${bookedTicket.ticket.price}</td>
            </tr>`;
    tableBody.innerHTML += tableRow;
}

async function loadBookedTickets() {
    const bookedTickets = await getBookedTickets(eventId);

    bookedTickets.forEach(bookedTicket => {
        addTableRow(bookedTicket);
    });

}



document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.id === 'btnBack') {
        const btnBack= document.getElementById('btnBack');
        btnBack.href=`../pages/details-user-event.html?eventId=${eventId}`
    }
});

loadBookedTickets();