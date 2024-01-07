function updateEmail() {
    const nameInput = document.getElementById('fName');
    const newEmailInput = document.getElementById('newEmail');

    const fName = nameInput.value;
    const newEmail = newEmailInput.value;

    fetch(`http://localhost:3001/update-email/${fName}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newEmail: newEmail }),
    })
        .then(response => response.json())
        .then(data => {
            const resultUpdateEmail = document.getElementById('lista_date');
            resultUpdateEmail.innerHTML = '';

            if (data) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>First Name:</strong> ${data.fName}<br><strong>Last Name:</strong> ${data.lName}<br><strong>Age:</strong> ${data.age}<br><strong>Email:</strong> ${data.email}`
                resultUpdateEmail.appendChild(li);
            } else {
                const li = document.createElement('li');
                li.textContent = 'Utilizatorul nu a fost găsit sau nu a fost actualizat.';
                resultUpdateEmail.appendChild(li);
            }
        })
        .catch(error => console.error('Eroare la cerere:', error));
}