const connectionsDocs = []

function findConnection(doc, user){
    return connectionsDocs.find((connection) => {
        return connection.nomeDocumento === doc && connection.nameUser === user
    })
}

function addConnection(connection){
    connectionsDocs.push(connection)
}

function removeConnection(doc, user) {
    const index = connectionsDocs.findIndex((connection) => {
        return connection.nomeDocumento === doc && connection.nameUser === user
    })

    if(index != -1) {
        connectionsDocs.splice(index, 1)
    }
}

function getUsersInDocs(doc){
    return connectionsDocs
        .filter((connection) => connection.nomeDocumento === doc)
        .map((connection) => connection.nameUser)
}

export { addConnection, getUsersInDocs, removeConnection,findConnection }