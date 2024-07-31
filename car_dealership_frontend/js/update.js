document.addEventListener('DOMContentLoaded', () => {
    const updateForm = document.getElementById('update-car-form');
    const carId = new URLSearchParams(window.location.search).get('id');

    if (carId) {
        const cars = JSON.parse(localStorage.getItem('cars')) || [];
        const car = cars.find(c => c.id === parseInt(carId));
        
        if (car) {
            document.getElementById('make').value = car.make || '';
            document.getElementById('model').value = car.model || '';
            document.getElementById('year').value = car.year || '';
            const imagePreview = document.getElementById('image-preview');
            if (car.imageUrl) {
                imagePreview.src = car.imageUrl;
                imagePreview.style.display = 'block';
            }
        } else {
            alert('Car not found');
            window.location.href = 'dashboard.html';
        }
    }

    updateForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Collect form data and convert to JSON
        const formData = new FormData(updateForm);
        const formObject = {};
        formData.forEach((value, key) => formObject[key] = value);
        formObject.id = carId;

        const updateUrl = 'http://13.53.139.82:8000/api/car/update/'; // Remove the ID from the URL

        fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                'Content-Type': 'application/json' // Set Content-Type to application/json
            },
            body: JSON.stringify(formObject) // Convert the form data to JSON
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            alert('Car updated successfully');
            window.location.href = 'dashboard.html';
        })
        .catch(error => console.error('Error updating car:', error));
    });
});
