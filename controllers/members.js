const fs = require('fs')
const data = require("../data.json")
const { date } = require('../utils')

//members
exports.index =  function (req, res) {
    return res.render("members/index", { members:data.members})
}

// show
exports.show = function (req, res) {
    // req.params
    const { id } = req.params

    const foundMember = data.members.find(function (member) {
        return id == member.id
    })

    if (!foundMember) return res.send("member not found!")



    const member = {
        ...foundMember,
        birth: date(foundMember.birth).birthDay
    }

    return res.render("members/show", { member })
}

exports.create = function (req, res) {
    return res.render('members/create')
}

// create
exports.post = function (req, res) {
    const keys = Object.keys(req.body)
    // validação
    for (key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fildes')
        }
    }



    // tartamento dos dados
    birth = Date.parse(req.body.birth)

    let id = 1
    const lastMember = data.members[data.members.length - 1]

    if(lastMember){
        id = lastMember.id + 1;
    }

    // desestruturando o body

    data.members.push({
        id,
        ...req.body,
        birth,
     
    })

    // enviar os dados para o json
    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("write file error!")
        return res.redirect(`/members/${id}`)
    })

}

// Edit
exports.edit = function (req, res) {
    // req.params
    const { id } = req.params

    const foundMember = data.members.find(function (member) {
        return id == member.id
    })


    if (!foundMember) return res.send("Member not found!")


    const member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }



    return res.render('members/edit', { member});
}

// put
exports.put = function (req, res) {
    const { id } = req.body
    let index = 0

    const foundMember = data.members.find(function (member, foundIndex){
    if (id == member.id){
        index = foundIndex
        return true
    }
    })

    if(!foundMember) return res.send("member not found!")


    const member = {
        ...foundMember,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.members[index] = member

    fs.writeFile("data.json", JSON.stringify(data, null,2), function(err){
        if(err) return res.send("write error!")

        return res.redirect(`/members/${id}`)
    })



}

// delete 

exports.delete = function (req, res) {
    const {id} = req.body
    const filteredMembers = data.members.filter(function (member){
        return member.id != id
        
    })

    data.members = filteredMembers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if(err) return res.send("write file erro!")
        return res.redirect("/members")


    })

}

