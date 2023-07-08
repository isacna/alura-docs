import { getCookie } from "../utils/cookies.js"
import { alertarERedirecionar, atualizaTextoEditor, handleAuthorization, updateInterfaceUser } from "./documento.js";

const socket = io("/usuarios", {
  auth: {
    token: getCookie("tokenJwt")
  }
});

socket.on("authorize_success", handleAuthorization)

socket.on("connect_error", (error) => {
  alert(error)
  window.location.href = "./login/index.html"
})

function selecionarDocumento(dados) {
  socket.emit("selecionar_documento", dados, (texto) => {
    atualizaTextoEditor(texto);
  });
}

socket.on("user_already_in_the_document", () => {
  alert("Documento já aberto em outra página")
  window.location.href = "/"
})

socket.on("users_the_docs", updateInterfaceUser)

function emitirTextoEditor(dados) {
  socket.emit("texto_editor", dados);
}

socket.on("texto_editor_clientes", (texto) => {
  atualizaTextoEditor(texto);
});

function emitirExcluirDocumento(nome) {
  socket.emit("excluir_documento", nome);
}

socket.on("excluir_documento_sucesso", (nome) => {
  alertarERedirecionar(nome);
});

export { emitirTextoEditor, selecionarDocumento, emitirExcluirDocumento };
