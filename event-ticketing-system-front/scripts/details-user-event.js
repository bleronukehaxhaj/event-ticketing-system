const urlUser = 'http://localhost:8080/api/events/user';
const url = 'http://localhost:8080/api/events';
const urlTicket = 'http://localhost:8080/api/tickets';


const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId');


async function getUserEventById(eventId) {
    try {
        const response = await fetch(urlUser + "/" + eventId, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("authToken")
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

let isPublished = false;
let eventData = null;

async function loadEvent() {
     eventData = await getUserEventById(eventId);

    isPublished = eventData.published;

    const cardBody = document.getElementById('card-body');
    cardBody.innerHTML = "";

    const eventCard = `
<div class="d-flex justify-content-end">
        <button id="btnPublish" class="btn btn-success" onclick="changePublish()">${isPublished ? 'Unpublish' : 'Publish'}</button>
    </div>
    <h5 class="card-title" id="eventName">${eventData.name}</h5>
            <p class="card-text" id="eventDescription">${eventData.description}</p>

            <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Category:</strong> <span id="eventCategory">${eventData.eventCategory}</span></li>
                <li class="list-group-item"><strong>Status:</strong> <span id="eventStatus">${eventData.eventStatus}</span></li>
                <li class="list-group-item"><strong>Start Date:</strong> <span id="eventStartDate">${eventData.startDate}</span></li>
                <li class="list-group-item"><strong>End Date:</strong> <span id="eventEndDate">${eventData.endDate}</span></li>
                <li class="list-group-item">
                    <strong>Address:</strong>
                    <ul>
                        <li><strong>Street:</strong> <span id="eventAddressStreet">${eventData.address.street}</span></li>
                        <li><strong>City:</strong> <span id="eventAddressCity">${eventData.address.city}</span></li>
                        <li><strong>Country:</strong> <span id="eventAddressCountry">${eventData.address.country}</span></li>
                        <li><strong>Zip Code:</strong> <span id="eventAddressZipCode">${eventData.address.zipCode}</span></li>
                    </ul>
                </li>
                <li class="list-group-item">
                    <strong>Organizer:</strong>
                    <ul>
                        <li><strong>Name:</strong> <span id="eventOrganizerName">${eventData.organizer.name}</span></li>
                        <li><strong>Email:</strong> <span id="eventOrganizerEmail">${eventData.organizer.email}</span></li>
                        <li><strong>Phone Number:</strong> <span id="eventOrganizerPhoneNumber">${eventData.organizer.phoneNumber}</span></li>
                    </ul>
                </li>
                <li class="list-group-item">
                    <strong>Venue:</strong>
                    <ul>
                        <li><strong>Name:</strong> <span id="eventVenueName">${eventData.venue.name}</span></li>
                        <li><strong>Description:</strong> <span id="eventVenueDescription">${eventData.venue.description}</span></li>
                    </ul>
                </li>
            </ul>

            <div class="mt-3">
                <a href="../pages/update-event.html?eventId=${eventId}" class="btn btnCreateEvent">Update</a>
                <button class="btn btnDelete" id="btnDelete">Delete</button>
                <a href="../pages/list-user-events.html" class="btn btnBack" >Back</a>
            </div>
            
          
`;
    cardBody.innerHTML = eventCard;
    eventData.tickets.forEach(ticket => {
        addTicketRow(ticket);
    });

}


function addTicketRow(ticket) {
    const tableBody = document.getElementById("ticketTableBody");


    const tableRow = `<tr>
                <td>${ticket.ticketType}</td>
                <td>${ticket.capacity}</td>
                <td>${ticket.price}</td>
                <td>
                    <a id="updateButton" class="btn btn-light" data-ticket='${JSON.stringify(ticket)}'>Update</a>
                    <a id="btnDeleteTicket" class="btn btn-danger" data-ticketId='${ticket.id}'>Delete</a>
                </td>
            </tr>`;
    tableBody.innerHTML += tableRow;
}

async function getAllTicketTypes() {
    try {
        const response = await fetch(url + "/ticket-type");

        if (!response.ok) {
            throw new Error(`Failed to fetch event types: ${response.statusText}`);
        }

        const ticketTypes = await response.json();
        const ticketType = document.getElementById('ticketType');
        ticketTypes.forEach(type => {
            const option = document.createElement('option');
            option.value = type;
            option.text = type;
            ticketType.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching event types:', error.message);
    }
}


function getTicketData() {
    const ticketType = document.getElementById("ticketType").value;
    const capacity = document.getElementById("capacity").value;
    const price = document.getElementById("price").value;

    const ticketTypeValue = ticketType.trim();
    const capacityValue = capacity.trim();
    const priceValue = price.trim();


    if (!ticketTypeValue || !capacityValue || !priceValue) {
        return null;
    }

    return {
        ticketType: ticketType,
        capacity: capacity,
        price: price
    };
}


let isUpdate = false;
let selectedTicketId = null;


async function saveTicket() {

    const newTicket = getTicketData();
    if (!newTicket) {
        alert("Please fill in all fields.");
        return;
    }
    if (isUpdate) {
        await updateTicket(selectedTicketId, newTicket);
    } else {
        await addNewTicket(newTicket);
    }

}

const addTicketModal = new bootstrap.Modal(document.getElementById('addTicketModal'));
const closeButton = document.getElementById('btn-close');

function openUpdateModal(ticket) {
    isUpdate = true;
    selectedTicketId = ticket.id
    document.getElementById('ticketType').value = ticket.ticketType;
    document.getElementById('capacity').value = ticket.capacity;
    document.getElementById('price').value = ticket.price;

    document.getElementById('btnSaveTicket').innerText = isUpdate ? 'Update Ticket' : 'Add Ticket';

    addTicketModal.show();
}

function closeUpdateModal() {
    addTicketModal.hide();
}

closeButton.addEventListener('click', closeUpdateModal);

function openUpdateModal(ticket) {
    isUpdate = true;
    selectedTicketId = ticket.id;

    // Set values for update or clear for add
    document.getElementById('ticketType').value = ticket.ticketType || '';
    document.getElementById('capacity').value = ticket.capacity || '';
    document.getElementById('price').value = ticket.price || '';

    document.getElementById('btnSaveTicket').innerText = isUpdate ? 'Update Ticket' : 'Add Ticket';

    addTicketModal.show();
}

function openAddModal() {
    isUpdate = false;
    selectedTicketId = null;

    // Clear form fields
    document.getElementById('ticketType').value = '';
    document.getElementById('capacity').value = '';
    document.getElementById('price').value = '';

    document.getElementById('btnSaveTicket').innerText = 'Add Ticket';

    addTicketModal.show();
}

document.getElementById('btnAddTicket').addEventListener('click', openAddModal);

async function updateTicket(ticketId, ticketData) {
    try {
        const response = await fetch(urlTicket + `/${ticketId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketData),
        });

        if (!response.ok) {
            throw new Error(`Failed to update ticket: ${response.statusText}`);
        }
        location.reload();
    } catch (error) {
        console.error('Error updating ticket:', error.message);
    }
}


async function addNewTicket(ticketData) {
    try {
        const response = await fetch(urlTicket + "/" + eventId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketData),
        });

        if (!response.ok) {
            throw new Error(`Failed to add new ticket: ${response.statusText}`);
        }
        location.reload();
    } catch (error) {
        console.error('Error adding new ticket:', error.message);
    }
}


const btnSaveTicket = document.getElementById('btnSaveTicket');
btnSaveTicket.addEventListener('click', (event) => {
    event.preventDefault();
    saveTicket();

});

async function deleteTicketById(ticketId) {
    try {
        const response = await fetch(urlTicket + "/" + ticketId, {
            method: 'DELETE',

        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.text();
    } catch (error) {
        console.error('Error in deleteEventById:', error.message);
        alert('An error occurred. Please try again later.');
    }
}

async function deleteTicket(ticketId) {
    if (confirm("Are you sure you want to delete this ticket?")) {
        const response = await deleteTicketById(ticketId);
        location.reload();
    }
}


async function deleteEventById(eventId) {
    try {
        const response = await fetch(url + "/" + eventId, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("authToken")
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return await response.text();
    } catch (error) {
        console.error('Error in deleteEventById:', error.message);
        alert('An error occurred. Please try again later.');
    }
}

async function deleteEvent() {
    if (confirm("Are you sure you want to delete this event?")) {
        const response = await deleteEventById(eventId);
        window.location.href = '../pages/list-user-events.html'
    }
}


document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.id === 'btnDelete') {
        event.preventDefault();
        deleteEvent();
    }

    if (target.id === 'updateButton') {
        event.preventDefault();
        let ticketData = target.getAttribute('data-ticket');
        openUpdateModal(JSON.parse(ticketData));
    }

    if (target.id === 'btnDeleteTicket') {
        event.preventDefault();
        let ticketId = target.getAttribute('data-ticketId');
        deleteTicket(ticketId);
    }
    if (target.id === 'btnBookedTickets') {
        const btnBookedTickets= document.getElementById('btnBookedTickets');
        btnBookedTickets.href=`../pages/booked-event-tickets.html?eventId=${eventId}`
    }
});


async function changePublish() {

    try {
        if (eventData.tickets.length === 0) {
            // Show alert and return, preventing further execution
            alert('Cannot publish event without tickets!');
            return;
        }
        const response = await fetch(url + "/" + eventId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                published: !isPublished,

            }),
        });

        if (!response.ok) {
            throw new Error(`Failed to update event status: ${response.statusText}`);
        }
        const btnPublish = document.getElementById('btnPublish')

        if (isPublished) {
            btnPublish.innerText = 'Publish';
        } else {
            btnPublish.innerText = 'Unpublish';
        }


        isPublished = !isPublished;

    } catch (error) {
        console.error('Error updating event status:', error.message);
    }
}


loadEvent()
getAllTicketTypes()