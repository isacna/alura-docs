import { MongoClient } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()

const client = new MongoClient(
`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@aluracluster.pi5dk8z.mongodb.net/?retryWrites=true&w=majority`
);

let documentsCollections;

try {
  await client.connect();

  const db = client.db("alura-websockets");
  documentsCollections = db.collection("documentos");

  console.log("Connected it database a success");
} catch (error) {
  console.log(error);
}

export { documentsCollections };
