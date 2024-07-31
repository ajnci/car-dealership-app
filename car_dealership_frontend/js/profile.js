document.addEventListener('DOMContentLoaded', () => {
    const profileForm = document.getElementById('profile-form');
    const logoutButton = document.getElementById('logout-button');

    // Retrieve the access token and refresh token from localStorage
    const accessToken = localStorage.getItem('accessToken'); // Ensure this is set upon login
    const refreshToken = localStorage.getItem('refreshToken'); // Ensure this is set upon login

    if (!accessToken) {
        // Redirect to login page if no token is found
        window.location.href = 'index.html';
        return;
    }

    // Fetch user profile data from the API
    fetch('http://13.53.139.82:8000/api/users/profile/', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.status === 401) {
            // Unauthorized access, redirect to login
            localStorage.removeItem('accessToken'); // Clear potentially invalid token
            localStorage.removeItem('refreshToken'); // Clear potentially invalid refresh token
            // window.location.href = 'index.html';
            throw new Error('Unauthorized');
        }
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response)
        return response.json();
    })
    .then(data => {
        if (data) {
            document.getElementById('name').value = data.first_name || '';
            document.getElementById('username').value = data.username || '';
            document.getElementById('email').value = data.email || '';
        }
    })
    .catch(error => {
        console.error('Error fetching profile:', error);
        // Optionally redirect to login if fetch fails due to authentication issues
        window.location.href = 'index.html';
    });

    // Handle form submission
    profileForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get the updated profile data from the form
        const updatedProfile = {
            first_name: document.getElementById('name').value,
            username: document.getElementById('username').value,
            email: document.getElementById('email').value
        };

        // Update the profile via the API
        fetch('http://13.53.139.82:8000/api/users/profile/', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProfile)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Profile updated:', data);
            alert('Profile updated successfully!');
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        });
    });

    // Handle logout
    logoutButton.addEventListener('click', () => {
        if (!refreshToken) {
            console.error('No refresh token found');
            return;
        }

        fetch('http://13.53.139.82:8000/api/users/logout/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ refresh: refreshToken }) // Send refresh token for invalidation
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Clear the tokens from localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');

            // Redirect to the sign-in page
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Error logging out:', error);
            alert('Error logging out. Please try again.');
        });
    });
});
