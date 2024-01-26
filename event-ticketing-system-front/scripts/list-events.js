const url = 'http://localhost:8080/api/events';


async function getAllEvents() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error in getAllEvents:', error.message);
        // alert('An error occurred. Please try again later.');
    }
}

async function loadEvents() {
    const data = await getAllEvents();

    const eventsContainer = document.getElementById('eventsContainer');
    eventsContainer.innerHTML = "";
    if (data.length === 0) {
        const noEventsMessage = document.createElement('p');
        noEventsMessage.textContent = "No events available.";
        eventsContainer.appendChild(noEventsMessage);
        return;
    }

    data.forEach(event => {
        const rawDate = new Date(event.startDate);
        const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
        const formattedDate = rawDate.toLocaleDateString('en-US', options);
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = ` 
            <a href="../pages/details-event.html?eventId=${event.id}" class="card event-card mb-5 shadow">
                <img src="https://picsum.photos/200/100" class="card-img-top" alt="Event 1">
                    <div class="card-body">
                        <h5 class="card-title">${event.name}</h5>
                        <p class="card-text">${formattedDate}</p>
                        <p class="card-text">${event.address.city}, ${event.address.country}</p>
                    </div>
            </a>
        `;

        eventsContainer.appendChild(card)

    });
}

loadEvents();