import createHashAndPass from "../utils/createHashAndPass.js";
import { usersCollection } from "./dbConnect.js";

function findUser(user){
    return usersCollection.findOne({user})
}

function createUser({user, pass}) {
    const { hashPass, salPass} = createHashAndPass(pass)

    return usersCollection.insertOne({ user, hashPass, salPass})
}

export { createUser, findUser }