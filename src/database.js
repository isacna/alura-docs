import { MongoClient } from "mongodb";

const client = new MongoClient(
  "mongodb+srv://alura:123@aluracluster.pi5dk8z.mongodb.net/?retryWrites=true&w=majority"
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
