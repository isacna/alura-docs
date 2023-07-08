import { scryptSync, timingSafeEqual } from "crypto"

function authenticateUser(pass, user){
    const hashTest = scryptSync(pass, user.salPass, 64)
    
    const hashReal = Buffer.from(user.hashPass, "hex")

    const authenticate = timingSafeEqual(hashTest,hashReal)

    return authenticate
}

export default (authenticateUser)