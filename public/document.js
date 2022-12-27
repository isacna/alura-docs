import { emitEditorText, selectDocument } from "./socket-front.js";

const parameters = new URLSearchParams(window.location.search)
const nameDocument = parameters.get("nome")

const titleDocument = document.getElementById("titulo-documento")
const editText = document.getElementById("editor-texto");

titleDocument.textContent = nameDocument || "Documento sem título"

selectDocument(nameDocument)

editText.addEventListener("keyup", () => {
  emitEditorText({text: editText.value, nameDocument});
});

function updateEditorText(text) {
  editText.value = text;
}

export { updateEditorText };
