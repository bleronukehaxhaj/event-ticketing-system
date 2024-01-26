const url = 'http://localhost:8080/api/events/user';

async function getUserAllEvents() {
    try {
        const response = await fetch(url,{
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
        console.error('Error in getAllEvents:', error.message);
    }
}

async function loadUserEvents() {
    const data = await getUserAllEvents();

    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.innerHTML = "";

    data.forEach(event => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = ` 
            <div class="card event-card">
                <img src="https://picsum.photos/200/100" class="card-img-top" alt="Event 1">
                <div class="card-body">
                    <h5 class="card-title">${event.name}</h5>
                    <p class="card-text">${event.startDate}</p>
                    <p class="card-text">${event.address.city}</p>
                    <a href="../pages/details-user-event.html?eventId=${event.id}" class="btn btnCreateEvent">Details</a>
                </div>
            </div>
        `;

        eventsContainer.appendChild(card)

    });
}

loadUserEvents();