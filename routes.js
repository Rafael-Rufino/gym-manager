const { Router } = require('express')
const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')
//Rotas 
routes.get('/', function (req, res) {
    return res.redirect("/instructors")

})
routes.get('/instructors', instructors.index);



routes.get('/instructors/create', function (req, res) {
    return res.render("instructors/create")

})


routes.get('/instructors/:id', instructors.show)

//editar
routes.get('/instructors/:id/edit', instructors.edit)



/*Pegando os dados do formulario*/
routes.post('/instructors', instructors.post)

// atualizar 
routes.put('/instructors', instructors.put)

// delete
routes.delete('/instructors', instructors.delete)

routes.get('/members', function (req, res) {
    return res.send("members")

})

module.exports = routes