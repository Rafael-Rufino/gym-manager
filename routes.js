const { Router } = require('express')
const express =  require('express')
const routes = express.Router()
const instructors = require('./instructors')
//Rotas 
routes.get('/', function (req, res) {
    return res.redirect("/instructors")
    
})
routes.get('/instructors', function (req, res) {
    return res.render("instructors/index")
    
})
routes.get('/instructors/create', function (req, res) {
    return res.render("instructors/create")
    
})

/*Pegando os dados do formulario*/
routes.post('/instructors', instructors.post)



routes.get('/members', function (req, res) {
    return res.send("about")
    
})

module.exports = routes