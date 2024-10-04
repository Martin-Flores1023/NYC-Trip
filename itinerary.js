// HTML element references
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const noMessage = document.getElementById('noMessage');
const itinerarySection = document.getElementById('itinerarySection');
const itineraryList = document.getElementById('itineraryList');
const addItemButton = document.getElementById('addItemButton');
const itemInput = document.getElementById('itemInput');
const timeInput = document.getElementById('timeInput');
const imageInput = document.getElementById('imageInput');

// Initialize the itinerary
let itinerary = JSON.parse(localStorage.getItem('itinerary')) || [];

// Load itinerary from localStorage when the page loads
window.onload = function () {
    loadItinerary();
};

// Show itinerary section when "Yes" is clicked
yesButton.addEventListener('click', () => {
    itinerarySection.style.display = 'block';
    noMessage.style.display = 'none';
});

// Show "No" message when "No" is clicked
noButton.addEventListener('click', () => {
    noMessage.style.display = 'block';
    itinerarySection.style.display = 'none';
});

// Add item to the itinerary
addItemButton.addEventListener('click', () => {
    const itemText = itemInput.value;
    const itemTime = timeInput.value;
    const itemImage = imageInput.files[0] ? URL.createObjectURL(imageInput.files[0]) : null;

    if (itemText) {
        const newItem = {
            text: itemText,
            time: itemTime,
            image: itemImage
        };

        // Add item to the itinerary array
        itinerary.push(newItem);

        // Save itinerary to localStorage
        localStorage.setItem('itinerary', JSON.stringify(itinerary));

        // Update the UI
        addItemToUI(newItem);

        // Clear the input fields
        itemInput.value = '';
        timeInput.value = '';
        imageInput.value = '';
    }
});

// Load the saved itinerary items from localStorage
function loadItinerary() {
    itinerary.forEach(item => {
        addItemToUI(item);
    });
}

// Add an item to the UI
function addItemToUI(item) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
        <strong>${item.text}</strong> at ${item.time ? item.time : 'any time'}
        ${item.image ? `<br><img src="${item.image}" alt="Image" width="100" height="100">` : ''}
        <button class="deleteItemButton">Delete</button>
    `;
    itineraryList.appendChild(listItem);

    // Add event listener to the delete button
    const deleteButton = listItem.querySelector('.deleteItemButton');
    deleteButton.addEventListener('click', () => {
        // Remove the item from the itinerary array
        itinerary = itinerary.filter(i => i !== item);

        // Save the updated itinerary to localStorage
        localStorage.setItem('itinerary', JSON.stringify(itinerary));

        // Remove the item from the UI
        listItem.remove();
    });
}
