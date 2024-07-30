document.addEventListener('DOMContentLoaded', () => {
    const carListContainer = document.getElementById('car-list');
    const notification = document.getElementById('notification');
    const confirmDeleteButton = document.getElementById('confirm-delete');
    const cancelDeleteButton = document.getElementById('cancel-delete');
    let deleteCarId = null;
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        window.location.href = 'dashboard_prelogin.html';
        return;
    }

    // Fetch and display cars
    function fetchCars() {
        fetch('http://127.0.0.1:8000/api/car/get/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(cars => {
            localStorage.setItem('cars', JSON.stringify(cars)); // Store cars in local storage
            displayCars(cars);
        })
        .catch(error => {
            console.error('Error fetching cars:', error);
            // Fallback to sample data if API fails
            const sampleCars = JSON.parse(localStorage.getItem('cars')) || [];
            displayCars(sampleCars);
        });
    }

    // Display cars in the UI
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
                <div class="car-actions">
                    <button onclick="window.location.href='update.html?id=${car.id}'">Update</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            carListContainer.appendChild(carItem);
        });
        updateDeleteButtons();
    }

    // Handle delete button clicks
    function updateDeleteButtons() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const carItem = e.target.closest('.car-item');
                deleteCarId = carItem.getAttribute('data-id');
                showNotification();
            });
        });
    }

    // Show delete confirmation
    function showNotification() {
        if (notification) {
            notification.style.display = 'block';
        }
    }

    // Confirm delete action
    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener('click', () => {
            if (deleteCarId) {
                fetch('http://127.0.0.1:8000/api/car/delete/', {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: deleteCarId })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(() => {
                    alert('Car deleted successfully');
                    notification.style.display = 'none';
                    fetchCars(); // Refresh car list
                })
                .catch(error => console.error('Error deleting car:', error));
            }
        });
    }

    // Cancel delete action
    if (cancelDeleteButton) {
        cancelDeleteButton.addEventListener('click', () => {
            if (notification) {
                notification.style.display = 'none';
            }
        });
    }

    // Add new car
    const addCarForm = document.getElementById('add-car-form');
    if (addCarForm) {
        addCarForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(addCarForm);
            addCar(formData);
        });
    }

    function addCar(formData) {
        fetch('http://127.0.0.1:8000/api/car/add/', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.detail === "Success") {
                alert('Car added successfully');
                window.location.href = 'dashboard.html';
            } else {
                alert('Error adding car: ' + data.status);
            }
        })
        .catch(error => console.error('Error adding car:', error));
    }

    // Initial fetch of cars
    fetchCars();
});
