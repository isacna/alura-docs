import { documentsCollections } from "./database.js";

function getDocuments(){
    const document = documentsCollections.find().toArray()
    return document
}

function addDocument(name){
  const result = documentsCollections.insertOne({
    name,
    text: ""
  })

  return result
}

function findDocument(name) {
  const document = documentsCollections.findOne({
    name: name,
  });

  return document;
}

function updateDocument(name, text) {
  const update = documentsCollections.updateOne(
    {
      name,
    },
    {
      $set: {
        text,
      },
    }
  );

  return update;
}

function deleteDocument(name){
  const result = documentsCollections.deleteOne({
    name
  })

  return result
}

export { findDocument, updateDocument, getDocuments,addDocument, deleteDocument };
