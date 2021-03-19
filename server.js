const express = require('express')
const routes = require("./routes")

//template engine
const nunjucks = require('nunjucks')

const server = express()


server.use(express.static('public'))
server.use(routes)
//trazendo o html pra o nunjucks
server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})



// Criando o servidor
server.listen(5500, () =>{
    console.log("Server is running")
})


