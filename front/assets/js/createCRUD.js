async function submitForm() {
    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;

    const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fName, lName, age, email }),
    });
}