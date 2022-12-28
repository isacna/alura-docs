import { emitEditorText, selectDocument, emitDeleteDocument } from "./socket-front-document.js";

const parameters = new URLSearchParams(window.location.search);
const nameDocument = parameters.get("nome");

const titleDocument = document.getElementById("titulo-documento");
const editText = document.getElementById("editor-texto");
const deleteButton = document.getElementById("excluir-documento");

titleDocument.textContent = nameDocument || "Documento sem título";

selectDocument(nameDocument);

editText.addEventListener("keyup", () => {
  emitEditorText({ text: editText.value, nameDocument });
});

function updateEditorText(text) {
  editText.value = text;
}

deleteButton.addEventListener("click", () => {
  emitDeleteDocument(nameDocument);
});

function alertAndRedirect(name) {
  if (name === nameDocument) {
    alert(`Document ${name} is deleted.`);
    window.location.href = "/";
  }
}

export { updateEditorText, alertAndRedirect };
