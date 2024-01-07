function deleteUser() {
    const nameInput = document.getElementById('fName');
    const fName = nameInput.value;

    fetch(`http://localhost:3001/delete-user/${fName}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            const resultDeleteUser = document.getElementById('lista_date');
            resultDeleteUser.innerHTML = '';

            if (data) {
                const li = document.createElement('li');
                li.textContent = `Utilizatorul cu numele ${data.fName} a fost șters.`;
                resultDeleteUser.appendChild(li);
            } else {
                const li = document.createElement('li');
                li.textContent = 'Utilizatorul nu a fost găsit sau nu a fost șters.';
                resultDeleteUser.appendChild(li);
            }
        })
        .catch(error => console.error('Eroare la cerere:', error));
}