import { documentsCollections } from "./database.js";
import io from "./server.js";



io.on("connection", (socket) => {
  console.log("WebSocket is connected, id:", socket.id);

  socket.on("select_document", async (nameDocument, returnDocument) => {
    socket.join(nameDocument);

    const document = await findDocument(nameDocument);

    console.log(document)

    if (document) {
      returnDocument(document.text);
    }
  });

  socket.on("editor_text", ({ text, nameDocument }) => {
    const document = findDocument(nameDocument);

    if (document) {
      document.text = text;
      socket.to(nameDocument).emit("client_editor_text", text);
    }
  });

  socket.on("disconnect", (motivo) => {
    console.log(`Cliente "${socket.id}" desconectado!
    Motivo: ${motivo}`);
  });
});

function findDocument(name) {
  const document = documentsCollections.findOne({
    name: name
  })

  return document
}