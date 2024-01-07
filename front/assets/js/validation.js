let email = document.getElementById('email')
let password = document.getElementById('password')
let button = document.getElementById('enter')

button.disabled = true

let validRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;


email.addEventListener('input', validEmail = () => {
    if (email.value.match(validRegex)) {
        email.classList.remove('error')
        email.classList.add('succes')
    } else {
        email.classList.add('error')
        email.classList.remove('succes')
    }

    validInputs()
})

password.addEventListener('input', validPassword = () => {
    if (password.value.length < 8) {
        password.classList.add('error')
        password.classList.remove('succes')
        document.getElementById('message_password').innerText = 'Parola trebuie sa contina minim 8 caractere'
    } else {
        password.classList.remove('error')
        password.classList.add('succes')
        document.getElementById('message_password').innerText = ''
    }

    validInputs()
})

let validInputs = () => {
        button.disabled = !(email.classList.contains('succes') && password.classList.contains('succes'));
}