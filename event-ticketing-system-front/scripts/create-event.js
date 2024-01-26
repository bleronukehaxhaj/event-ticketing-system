const url = 'http://localhost:8080/api/events';
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
const btnCreate = document.getElementById('btnCreate');


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

function validateCreateForm() {

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

        const currentDate = new Date().toISOString();
        if (startDate < currentDate) {
            inputStartDate.classList.add('is-invalid');
            isValid = false;
        } else {
            inputStartDate.classList.remove('is-invalid');
        }

        if (endDate < startDate) {
            inputEndDate.classList.add('is-invalid');
            isValid = false;
        } else {
            inputEndDate.classList.remove('is-invalid');
        }
    }

    return isValid;
}

async function createEvent() {
    if (!validateCreateForm()) {
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

    localStorage.getItem("authToken");
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(eventData),
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("authToken")
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const res = await response.text()
        window.location.href = '../pages/index.html'
        console.log(res)
    } catch (error) {
        console.error('Error in createEvent:', error.message);
        alert('An error occurred. Please try again later.');
    }
}

getAllEventCategories()
getAllEventStatus()
btnCreate.addEventListener('click', (event) => {
    event.preventDefault();
    createEvent();
});