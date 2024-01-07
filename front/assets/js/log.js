
document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3001/submit-form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (data.success) {
            // Login successful, proceed to another page
            window.location.href = 'admin.html';
        } else {
            // Invalid email or password, show alert and disable the button
            alert(data.message);
            document.getElementById('enter').disabled = true;
        }

        console.log('Response from server:', data);
    } catch (error) {
        console.error('Error:', error);

        const result = response.json();
    console.log('Raspuns de la server:', result);
}})