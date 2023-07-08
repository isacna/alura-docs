import { createUser, findUser } from "../db/usersDb.js"

function logEventsRegister(socket, io) {
    socket.on("create_user", async (dados) => {
        const user = await findUser(dados.user)

        if (user === null) {

            const result = await createUser(dados)

            if (result.acknowledged) {
                socket.emit("register_success")
            } else {
                socket.emit("register_error")
            }
        } else {
            socket.emit("register_existing")
        }

    })
}

export default logEventsRegister