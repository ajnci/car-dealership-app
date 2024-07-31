document.addEventListener('DOMContentLoaded', () => {
    const fullOrigin = window.location.origin;
    const apiUrl = fullOrigin.split(':').slice(0, 2).join(':');
    const subscribeForm = document.getElementById('subscribe-form');
    const emailInput = document.getElementById('email-input');
    const responseMessage = document.getElementById('response-message');

    subscribeForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        const email = emailInput.value.trim();
        
        if (email) {
            try {
                // Make a POST request to your API endpoint
                const response = await fetch(`${apiUrl}/api/users/subscribe`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                });

                if (response.ok) {
                    const result = await response.json();
                    // Display success message
                    responseMessage.innerHTML = `<p style="color:green;">${result.message}</p>`;
                } else {
                    // Display error message
                    responseMessage.innerHTML = `<p style="color:red;">Failed to subscribe. Please try again later.</p>`;
                }
            } catch (error) {
                // Display error message
                responseMessage.innerHTML = `<p style="color:red;">An error occurred: ${error.message}</p>`;
            }
        } else {
            // Display validation error
            responseMessage.innerHTML = `<p style="color:red;">Please enter a valid email address.</p>`;
        }
    });
});
