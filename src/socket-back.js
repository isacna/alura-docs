import {
  findDocument,
  updateDocument,
  getDocuments,
  addDocument,
  deleteDocument
} from "./documentDB.js";
import io from "./server.js";

io.on("connection", (socket) => {
  socket.on("getDocuments", async (returnDocuments) => {
    const documents = await getDocuments();

    returnDocuments(documents);
  });

  socket.on("add_document", async (name) => {
    const thereDocument = (await findDocument(name)) !== null;

    if (thereDocument) {
      socket.emit("document_exists", name);
    } else {
      const result = await addDocument(name);

      if (result.acknowledged) {
        io.emit("add_document_interface", name);
      }
    }
  });

  socket.on("select_document", async (nameDocument, returnDocument) => {
    socket.join(nameDocument);

    const document = await findDocument(nameDocument);

    if (document) {
      returnDocument(document.text);
    }
  });

  socket.on("editor_text", async ({ text, nameDocument }) => {
    const update = await updateDocument(nameDocument, text);

    if (update.modifiedCount) {
      socket.to(nameDocument).emit("client_editor_text", text);
    }
  });

  socket.on("delete_document", async(name) => {
    const result = await deleteDocument(name)

    if(result.deletedCount) {
      io.emit("delete_document_success", name)
    }
  })

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});
