document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');

    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const userData = {
                
                username: document.getElementById('username').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                first_name: document.getElementById('name').value
            };

            // Perform the signup API call
            fetch('http://13.53.139.82:8000/api/users/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.detail === "Success") {
                    console.log('Signup successful:', data);
                    // Redirect to the sign-in page
                    window.location.href = 'index.html';
                } else {
                    console.error('Signup failed:', data);
                }
            })
            .catch(error => console.error('Error signing up:', error));
        });
    }

    // Handle signin form submission
    if (signinForm) {
        signinForm.addEventListener('submit', (event) => {
            event.preventDefault();
            
            const userData = {
                username: document.getElementById('signin-username').value,
                password: document.getElementById('signin-password').value,
            };

            // Perform the signin API call
            fetch('http://13.53.139.82:8000/api/users/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            })
            .then(response => response.json())
            .then(data => {
                if (data.access && data.refresh) {
                    console.log('Signin successful:', data);

                    // Store tokens in localStorage
                    localStorage.setItem('accessToken', data.access); // Adjust according to your API response
                    localStorage.setItem('refreshToken', data.refresh); // Adjust according to your API response

                    // Redirect to the dashboard page
                    window.location.href = 'dashboard.html';
                } else {
                    console.error('Signin failed:', data);
                }
            })
            .catch(error => console.error('Error signing in:', error));
        });
    }
});
