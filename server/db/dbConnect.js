import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()

const client = new MongoClient(
  `mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@aluracluster.hp6fqol.mongodb.net/?retryWrites=true&w=majority`
  );

let documentosColecao,usersCollection;

try {
  await client.connect();

  const db = client.db("alura-websockets");
  documentosColecao = db.collection("documentos");
  usersCollection = db.collection("users")

  console.log("Conectado ao banco de dados com sucesso!");
} catch (erro) {
  console.log(erro);
}

export { documentosColecao, usersCollection };
