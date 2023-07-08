import "dotenv/config"

import io from "./servidor.js";
import logStartEvents from "./logsEvents/logStartEvents.js";
import logEventsDocument from "./logsEvents/documents.js";
import logEventsRegister from "./logsEvents/registers.js";
import logEventsLogin from "./logsEvents/login.js";
import authorizeUser from "./middlewares/authorizeUser.js";

const nspUsers = io.of('/usuarios')

nspUsers.use(authorizeUser)

nspUsers.on("connection", (socket) => {
  logStartEvents(socket, nspUsers)
  logEventsDocument(socket, nspUsers)
})

io.of("/").on("connection", (socket) => {

  logEventsRegister(socket, io)
  logEventsLogin(socket, io)
});
