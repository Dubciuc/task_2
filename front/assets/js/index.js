document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3001/date')
        .then(response => response.json())
        .then(data => {
            const listaDate = document.getElementById('lista_date');
            data.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<strong>First Name:</strong> ${item.fName}<br><strong>Last Name:</strong> ${item.lName}<br><strong>Age:</strong> ${item.age}<br><strong>Email:</strong> ${item.email}`;
                listaDate.appendChild(li);
            });
        })
        .catch(error => console.error('Eroare la cerere:', error));
});