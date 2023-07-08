import { findUser } from "../db/usersDb.js"
import authenticateUser from "../utils/authenticateUser.js"
import generateJwt from "../utils/generateJwt.js"

function logEventsLogin(socket,io) {
    socket.on("authenticate_user", async ({user, pass})=> {
        const fUser = await findUser(user)

        if(fUser) {
            const authenticate = authenticateUser(pass, fUser)
    
            if(authenticate) {
                const tokenJwt = generateJwt({ user })
  
                socket.emit("authenticate_success", tokenJwt)
            } else {
                socket.emit("authenticate_error")
            }
        } else {
            socket.emit("user_not_found")
        }

    })
}

export default logEventsLogin