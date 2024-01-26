const url = 'http://localhost:8080/api/events';
const urlUser = 'http://localhost:8080/api/events/user';


const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId');


const inputName = document.getElementById('inputName');
const inputDescription = document.getElementById('inputDescription');
const selectEventCategory = document.getElementById('selectEventCategory');
const selectEventStatus = document.getElementById('selectEventStatus');
const inputStartDate = document.getElementById('inputStartDate');
const inputEndDate = document.getElementById('inputEndDate');

const inputStreet = document.getElementById('inputStreet');
const inputCity = document.getElementById('inputCity');
const inputCountry = document.getElementById('inputCountry');
const inputZipCode = document.getElementById('inputZipCode');

const inputVenueName = document.getElementById('inputVenueName');
const inputVenueDescription = document.getElementById('inputVenueDescription');

const inputOrganizerName = document.getElementById('inputOrganizerName');
const inputOrganizerEmail = document.getElementById('inputOrganizerEmail');
const inputOrganizerPhoneNumber = document.getElementById('inputOrganizerPhoneNumber');
const btnUpdate = document.getElementById('btnUpdate');
const btnBack = document.getElementById('btnBack');


async function updateEvent(eventId, event) {
    try {
        const response = await fetch(url + "/" + eventId, {
            method: 'PUT',
            body: JSON.stringify(event),
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
        console.error('Error in updateEvent:', error.message);
        alert('An error occurred. Please try again later.');
    }
}


async function getAllEventCategories() {
    try {
        const response = await fetch(url + "/event-category");

        if (!response.ok) {
            throw new Error(`Failed to fetch event types: ${response.statusText}`);
        }

        const eventCategories = await response.json();

        eventCategories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.text = category;
            selectEventCategory.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching event types:', error.message);
    }
}

async function getAllEventStatus() {
    try {
        const response = await fetch(url + "/event-status");

        if (!response.ok) {
            throw new Error(`Failed to fetch event status: ${response.statusText}`);
        }

        const eventStatusList = await response.json();
        eventStatusList.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.text = status;
            selectEventStatus.appendChild(option);
        });

    } catch (error) {
        console.error('Error fetching event status:', error.message);
    }
}

function validateUpdateForm() {

    const requiredFields = [
        {field: inputName},
        {field: inputDescription},
        {field: inputStartDate},
        {field: inputEndDate},
        {field: inputStreet},
        {field: inputCity},
        {field: inputCountry},
        {field: inputZipCode},
        {field: inputOrganizerName},
        {field: inputOrganizerEmail},
        {field: inputOrganizerPhoneNumber},
        {field: inputVenueName},
        {field: inputVenueDescription},
    ];

    let isValid = true;

    requiredFields.forEach(({field, message}) => {
        const trimmedValue = field.value.trim();
        if (!trimmedValue) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });


    const startDateValue = inputStartDate.value;
    const endDateValue = inputEndDate.value;

    if (!startDateValue || !endDateValue) {
        if (!startDateValue) {
            inputStartDate.classList.add('is-invalid');
        } else {
            inputStartDate.classList.remove('is-invalid');
        }

        if (!endDateValue) {
            inputEndDate.classList.add('is-invalid');
        } else {
            inputEndDate.classList.remove('is-invalid');
        }

        isValid = false;
    } else {
        const startDate = new Date(startDateValue).toISOString();
        const endDate = new Date(endDateValue).toISOString();

        if (endDate < startDate) {
            inputEndDate.classList.add('is-invalid');
            isValid = false;
        } else {
            inputEndDate.classList.remove('is-invalid');
        }
    }

    return isValid;
}


async function modifyEvent() {
    if (!validateUpdateForm()) {
        return;
    }
    const eventData = {
        name: inputName.value,
        description: inputDescription.value,
        eventCategory: selectEventCategory.value,
        eventStatus: selectEventStatus.value,
        startDate: inputStartDate.value,
        endDate: inputEndDate.value,
        published: false,
        address: {
            street: inputStreet.value,
            city: inputCity.value,
            country: inputCountry.value,
            zipCode: inputZipCode.value
        },
        organizer: {
            name: inputOrganizerName.value,
            email: inputOrganizerEmail.value,
            phoneNumber: inputOrganizerPhoneNumber.value
        },
        venue: {
            name: inputVenueName.value,
            description: inputVenueDescription.value
        }
    };
    const response = await updateEvent(eventId, eventData);
    if (response){
        window.location.href=`../pages/details-user-event.html?eventId=${eventId}`;
    }

}


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


async function loadEventForm() {
    const event = await getUserEventById(eventId);

    inputName.value = event.name;
    inputDescription.value = event.description;
    selectEventCategory.value = event.eventCategory;
    selectEventStatus.value = event.eventStatus;
    inputStartDate.value = event.startDate;
    inputEndDate.value = event.endDate;


    inputOrganizerName.value = event.organizer.name;
    inputOrganizerEmail.value = event.organizer.email;
    inputOrganizerPhoneNumber.value = event.organizer.phoneNumber;

    inputVenueName.value = event.venue.name;
    inputVenueDescription.value = event.venue.description;


    inputStreet.value = event.address.street;
    inputCity.value = event.address.city;
    inputCountry.value = event.address.country;
    inputZipCode.value = event.address.zipCode;

}

const eventData = {
    name: inputName.value,
    description: inputDescription.value,
    eventCategory: selectEventCategory.value,
    eventStatus: selectEventStatus.value,
    startDate: inputStartDate.value,
    endDate: inputEndDate.value,
    published: false,
    address: {
        street: inputStreet.value,
        city: inputCity.value,
        country: inputCountry.value,
        zipCode: inputZipCode.value
    },
    organizer: {
        name: inputOrganizerName.value,
        email: inputOrganizerEmail.value,
        phoneNumber: inputOrganizerPhoneNumber.value
    },
    venue: {
        name: inputVenueName.value,
        description: inputVenueDescription.value
    }
};


btnUpdate.addEventListener('click', (event) => {
    event.preventDefault();
    modifyEvent();
});

btnBack.href = `../pages/details-user-event.html?eventId=${eventId}`;

getAllEventStatus();
getAllEventCategories();
loadEventForm();