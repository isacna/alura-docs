import { defineCookie } from "../utils/cookies.js"

const socket = io()

function emitAuthenticateUser(data){
    socket.emit("authenticate_user", data)
}

socket.on("user_not_found", () => alert("Usuário não encontrado!"))
socket.on("authenticate_success", (tokenJwt) => {
    defineCookie("tokenJwt",tokenJwt)

    alert("Usuário autenticado com sucesso")

    window.location.href = "/"
})
socket.on("authenticate_error", () => alert("Erro ao realizar a autenticação"))

export { emitAuthenticateUser }