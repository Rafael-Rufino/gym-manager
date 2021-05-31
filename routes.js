const { Router } = require('express')
const express = require('express')
const routes = express.Router()
const instructors = require('./controllers/instructors')
const members = require('./controllers/members')

routes.get('/', function (req, res) {
    return res.redirect("/instructors")

})
routes.get('/instructors', instructors.index);

routes.get('/instructors/create', instructors.create)

routes.get('/instructors/:id', instructors.show)

//editar
routes.get('/instructors/:id/edit', instructors.edit)

/*Pegando os dados do formulario*/
routes.post('/instructors', instructors.post)

// atualizar 
routes.put('/instructors', instructors.put)

// delete
routes.delete('/instructors', instructors.delete)



//==========================Members========================================

routes.get('/members', members.index);

routes.get('/members/create', members.create);

routes.get('/members/:id', members.show)

//editar
routes.get('/members/:id/edit', members.edit)

/*Pegando os dados do formulario*/
routes.post('/members', members.post)

// atualizar 
routes.put('/members', members.put)

// delete
routes.delete('/members', members.delete)

module.exports = routes