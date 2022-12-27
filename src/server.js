import express from "express"
import url from "url"
import path from "path"
import http from "http"
import { Server } from "socket.io"

import "./database.js"

const app = express();
const port = process.env.port || 3000

const currentPath = url.fileURLToPath(import.meta.url)
const publicDirectory = path.join(currentPath, "../..", "public")
app.use(express.static(publicDirectory))

const serverHttp = http.createServer(app)

serverHttp.listen(port, () => {
    console.log(`Server is running in port ${port}`)
    console.log("http://localhost:3000")
})

const io = new Server(serverHttp)

export default io