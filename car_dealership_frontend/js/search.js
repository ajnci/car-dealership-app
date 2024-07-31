document.getElementById('search-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const query = document.getElementById('search-query').value.trim();
    const searchResults = document.getElementById('search-results');

    // Clear previous results
    searchResults.innerHTML = '';

    if (query === '') {
        searchResults.innerHTML = '<p>Please enter a search query.</p>';
        return;
    }

    const url = `http://13.53.139.82:8000/api/car/get/?model=${encodeURIComponent(query)}`;


    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(cars => {
        if (cars.length === 0) {
            searchResults.innerHTML = '<p>No cars found.</p>';
        } else {
            cars.forEach(car => {
                const carItem = document.createElement('div');
                carItem.className = 'car-item';
                // carItem.innerHTML = `
                //     <img src="${car.image}" alt="${car.make} ${car.model}" class="car-image">
                //     <div class="car-details">
                //         <h2>${car.make} ${car.model}</h2>
                //         <p>Year: ${car.year}</p>
                //     </div>
                // `;
                carItem.innerHTML = `
                    <img src="${car.image}" alt="${car.make} ${car.model}" class="car-image" style="max-width: 150px; max-height: 100px; object-fit: cover; margin-right: 20px; border-radius: 4px;">
                    <div class="car-details">
                        <h2>${car.make} ${car.model}</h2>
                        <p>Year: ${car.year}</p>
                    </div>
                `;

                searchResults.appendChild(carItem);
            });
        }
    })
    .catch(error => {
        console.error('Error fetching car details:', error);
        searchResults.innerHTML = '<p>Error fetching search results.</p>';
    });
});
