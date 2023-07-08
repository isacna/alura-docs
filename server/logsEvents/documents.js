import {
  atualizaDocumento,
  encontrarDocumento,
  excluirDocumento,
} from "../db/documentosDb.js";
import { addConnection, findConnection, getUsersInDocs,removeConnection } from "../utils/connectionsDocs.js";

function logEventsDocument(socket, io) {
  socket.on("selecionar_documento", async ({ nomeDocumento, nameUser }, devolverTexto) => {

    const documento = await encontrarDocumento(nomeDocumento);

    if (documento) {
      const connectionFound = findConnection(nomeDocumento, nameUser)
      if(!connectionFound) {
        socket.join(nomeDocumento);
  
        addConnection({ nomeDocumento, nameUser })

        socket.data = {
          userStatus: true
        }
  
        const usersInDoc = getUsersInDocs(nomeDocumento)
        
        io.to(nomeDocumento).emit("users_the_docs", usersInDoc)
  
        devolverTexto(documento.texto);
      } else {
        socket.emit("user_already_in_the_document")
      }
    }

    socket.on("texto_editor", async ({ texto, nomeDocumento }) => {
      const atualizacao = await atualizaDocumento(nomeDocumento, texto);
  
      if (atualizacao.modifiedCount) {
        socket.to(nomeDocumento).emit("texto_editor_clientes", texto);
      }
    });
  
    socket.on("excluir_documento", async (nome) => {
      const resultado = await excluirDocumento(nome);
  
      if (resultado.deletedCount) {
        io.emit("excluir_documento_sucesso", nome);
      }
    });

    socket.on("disconnect", () => {
      if(socket.data.userStatus){
        removeConnection(nomeDocumento, nameUser)
  
        const usersInDoc = getUsersInDocs(nomeDocumento)
        
        io.to(nomeDocumento).emit("users_the_docs", usersInDoc)
      }

    })
  });


 
}

export default logEventsDocument