document.addEventListener('DOMContentLoaded', () => {
    const fullOrigin = window.location.origin;
    const apiUrl = fullOrigin.split(':').slice(0, 2).join(':');
    const carListContainer = document.getElementById('car-list');

    // Fetch and display cars from the API
    function fetchCars() {
        fetch(`${apiUrl}:8000/api/car/get/`, {
        })
        .then(response => response.json())
        .then(data => displayCars(data))
        .catch(error => {
            console.error('Error fetching cars:', error);
            // If there's an error fetching from API, fall back to sample data
            displayCars(sampleCars);
        });
    }

    // Display car data in the UI
    function displayCars(cars) {
        carListContainer.innerHTML = '';
        cars.forEach(car => {
            const carItem = document.createElement('div');
            carItem.classList.add('car-item');
            carItem.setAttribute('data-id', car.id);
            carItem.innerHTML = `
                <img src="${car.image}" alt="${car.make} ${car.model}" class="car-image">
                <div class="car-details">
                    <h2>${car.make} ${car.model}</h2>
                    <p>Year: ${car.year}</p>
                </div>
            `;
            carListContainer.appendChild(carItem);
        });
    }

    // Fetch and display cars on page load
    fetchCars();
});
