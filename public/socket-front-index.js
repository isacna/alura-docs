import { insertLinkDocument, removeLinkDocument } from "./index.js";

const socket = io()

socket.emit("getDocuments", (documents)=>{
    documents.forEach((doc) => {
        insertLinkDocument(doc.name)
    })
});

function emitAddDocument(name) {
    socket.emit("add_document", name)
}

socket.on("add_document_interface", (name) => {
    insertLinkDocument(name)
})

socket.on("document_exists", (name) => {
    alert(`The document ${name} already exists`)
})

socket.on("delete_document_success", (name) => {
    removeLinkDocument(name)
})

export {emitAddDocument}