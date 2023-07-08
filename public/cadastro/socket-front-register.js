const socket = io()

function emitCreateUser(data) {
    socket.emit("create_user", data)
}

socket.on("register_success", () => {
    alert("Cadastro realizado com sucesso!")
    window.location.href = "/login/index.html"
})
socket.on("register_error", () => alert("Erro ao realizar o cadastro!"))
socket.on("register_existing", () => alert("Usuário já existe!"))

export {emitCreateUser}