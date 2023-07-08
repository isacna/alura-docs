import jwt from "jsonwebtoken"

function authorizeUser(socket, next) {
    const tokenJwt = socket.handshake.auth.token;

    try {
        const payloadToken = jwt.verify(tokenJwt, process.env.SECRET)
        
        socket.emit("authorize_success", payloadToken)

        next()
    } catch (error) {
        next(error)
    }
}

export default authorizeUser