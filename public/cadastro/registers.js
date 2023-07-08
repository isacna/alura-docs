import { emitCreateUser } from "./socket-front-register.js"


const form = document.getElementById("form-cadastro")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const user = form["input-usuario"].value
    const pass = form["input-senha"].value

    emitCreateUser({ user, pass})
})