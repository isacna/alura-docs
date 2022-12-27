import { updateEditorText } from "./document.js";

const socket = io();

function selectDocument(name) {
  socket.emit("select_document", name, (text) => {
    updateEditorText(text);
  });
}

function emitEditorText(data) {
  socket.emit("editor_text", data);
}

socket.on("client_editor_text", (text) => {
  updateEditorText(text);
});

export { emitEditorText, selectDocument };
