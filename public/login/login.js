import { emitAuthenticateUser } from "./socket-front-login.js"


const form = document.getElementById("form-login")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const user = form["input-usuario"].value
    const pass = form["input-senha"].value

    emitAuthenticateUser({ user, pass })
})