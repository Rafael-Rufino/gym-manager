const fs = require('fs')
const data = require("../data.json")
const { age, date } = require('../utils')



//instructors
exports.index =  function (req, res) {
    return res.render("instructors/index", { instructors:data.instructors})
}

// show
exports.show = function (req, res) {
    // req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return id == instructor.id
    })

    if (!foundInstructor) return res.send("Instructor not found!")



    const instructor = {
        ...foundInstructor,
        age: age(foundInstructor.birth),
        services: foundInstructor.services.split(","),
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),
    }

    return res.render("instructors/show", { instructor })
}

//create
exports.create = function (req, res) {
    return res.render("instructors/create")
} 
// post
exports.post = function (req, res) {
    const keys = Object.keys(req.body)
    // validação
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fildes')
        }
    }

    let { avatar_url, birth, name, services, gender } = req.body

    // tartamento dos dados
    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    // desestruturando o body

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at,
    })

    // enviar os dados para o json
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write file error!")
        return res.redirect("/instructors")
    })

}

// Edit
exports.edit = function (req, res) {
    // req.params
    const { id } = req.params

    const foundInstructor = data.instructors.find(function (instructor) {
        return id == instructor.id
    })

    if (!foundInstructor) return res.send("Instructor not found!")

    const instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth).iso
    }

    return res.render('instructors/edit', { instructor});
}

// put
exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundInstructor = data.instructors.find(function (instructor, foundIndex){
    if (id == instructor.id){
        index = foundIndex
        return true
    }
    })

    if(!foundInstructor) return res.send("instructor not found!")


    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.instructors[index] = instructor

    fs.writeFile("data.json", JSON.stringify(data, null,2), function(err){
        if(err) return res.send("write error!")

        return res.redirect(`/instructors/${id}`)
    })



}

// delete 

exports.delete = function (req, res) {
    const {id} = req.body
    const filteredInstructors = data.instructors.filter(function (instructor){
        return instructor.id != id
        
    })

    data.instructors = filteredInstructors;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("write file erro!")
        return res.redirect("/instructors")


    })

}

