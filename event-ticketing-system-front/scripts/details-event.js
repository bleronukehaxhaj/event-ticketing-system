const urlUser = 'http://localhost:8080/api/events/user';
const url = 'http://localhost:8080/api/events';
const urlTicket = 'http://localhost:8080/api/tickets';

const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId');

async function getEventById(eventId) {
    try {
        const response = await fetch(url + "/" + eventId, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getEventById:', error.message);
        alert('An error occurred. Please try again later.');
    }
}

async function loadEvent() {
    const eventData = await getEventById(eventId);
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const rawStartDate = new Date(eventData.startDate);
    const formattedStartDate = rawStartDate.toLocaleDateString('en-US', options);

    const rawEndDate = new Date(eventData.endDate);
    const formattedEndDate = rawEndDate.toLocaleDateString('en-US', options);


    const eventContainer = document.getElementById('eventContainer');
    eventContainer.innerHTML = "";

    const eventCard = `
 <div class="sticky-div bg-white d-flex justify-content-between align-items-center p-1">
                <h2 class="text-left">${eventData.name}</h2>
                <a href="../pages/book-event.html?eventId=${eventId}" class="btn btnCreateEvent" id="btnBookNow">Book Now</a>
            </div>
            <div class="event-details mt-4">
                <img src="https://picsum.photos/1200/800" class="img-fluid" alt="Event Image">
                <h3 class="mt-4">Event Details</h3>
                <p>Description: ${eventData.description}</p>
                <p>Venue: ${eventData.venue.name}</p>
                <p>Address: ${eventData.address.street}, ${eventData.address.city}, ${eventData.address.country}, ${eventData.address.zipCode}</p>
                <p>Event Category: ${eventData.eventCategory}</p>
                <p>Start Date: ${formattedStartDate}</p>
                <p>End Date: ${formattedEndDate}</p>
                <p>Organizer Phone: ${eventData.organizer.phoneNumber}</p>

            </div>
            <div>
            `;
    eventContainer.innerHTML = eventCard;

    const bookNowBtn = document.getElementById('btnBookNow');


    if (eventData.eventStatus === 'ACTIVE') {
        bookNowBtn.innerHTML = 'Book Now';
        bookNowBtn.classList.remove('disableBtn');

    } else {
        bookNowBtn.innerHTML = `${eventData.eventStatus}`
        bookNowBtn.classList.add('disableBtn');
        bookNowBtn.removeAttribute('href');

    }
    eventData.tickets.forEach(ticket => {
        addTicketRow(ticket);
    });
}

function addTicketRow(ticket) {
    const ticketsBody = document.getElementById("ticketsBody");


    const ticketRow = `
    <div class="col-md-2">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${ticket.ticketType}</h5>
          <p class="card-text">Price: $${ticket.price}</p>
          <button class="btn btnSelectTicket" 
                  data-ticket-id="${ticket.id}"
                  data-ticket-price="${ticket.price}">Select Ticket</button>
        </div>
        `;
    ticketsBody.innerHTML += ticketRow;
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('btnSelectTicket')) {
        const selectedTicketId = event.target.dataset.ticketId;
        const selectedTicketPrice = event.target.dataset.ticketPrice;


        document.querySelectorAll('.card').forEach(card => {
            card.classList.remove('selected-card');
        });


        event.target.closest('.card').classList.add('selected-card');

        document.querySelectorAll('.select-ticket-btn').forEach(button => {
            button.innerHTML = 'Select Ticket';
            button.classList.remove('selected');
        });
        event.target.innerHTML = 'Selected';
        event.target.classList.add('selected');


        localStorage.setItem('selectedTicketId', selectedTicketId);
        localStorage.setItem('selectedTicketPrice', selectedTicketPrice);

    }

    if (event.target.id === 'btnBookNow') {
        const isTicketSelected = localStorage.getItem('selectedTicketId') !== null;

        if (!isTicketSelected) {
            alert('Please select a ticket before booking.');
            event.preventDefault();
        }
    }
});



loadEvent()