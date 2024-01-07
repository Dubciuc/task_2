function searchUser() {
    const fNameInput = document.getElementById('fName');
    const fName = fNameInput.value;

    fetch(`http://localhost:3001/utilizator-fName/${fName}`)
        .then(response => response.json())
        .then(data => {
            const rezultateCautare = document.getElementById('lista_date');
            rezultateCautare.innerHTML = '';

            if (data) {
                const li = document.createElement('li');
                li.innerHTML = `<strong>First Name:</strong> ${data.fName}<br><strong>Last Name:</strong> ${data.lName}<br><strong>Age:</strong> ${data.age}<br><strong>Email:</strong> ${data.email}`
                rezultateCautare.appendChild(li);
            } else {
                const li = document.createElement('li');
                li.textContent = 'Utilizatorul nu a fost găsit.';
                rezultateCautare.appendChild(li);
            }
        })
        .catch(error => console.error('Eroare la cerere:', error));
}