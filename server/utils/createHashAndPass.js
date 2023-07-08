import { randomBytes, scryptSync } from "crypto"

function createHashAndPass(pass){
    const salPass = randomBytes(16).toString("hex")

    const hashPass = scryptSync(pass, salPass, 64).toString("hex")

    return { salPass, hashPass}
}

export default createHashAndPass 