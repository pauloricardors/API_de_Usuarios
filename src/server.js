import express from 'express'
import mongoose from 'mongoose';

const server = express()
server.use(express.json())
mongoose.connect('mongodb+srv://Paulo:<senha>@users.notwj.mongodb.net/?retryWrites=true&w=majority&appName=Users');

const Usuarios = mongoose.model('Usuarios', {
    nome: String,
    sobrenome: String,
    sexo: String,
    idade: Number,
    cor_pele: String,
    email: String,
    senha: String,
});

server.get('/', async (req, res) => {
    const users = await Usuarios.find()
    return res.send(users)
})

server.post('/', async (req, res) => {
    const users = new Usuarios({
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        sexo: req.body.sexo,
        idade: req.body.idade,
        cor_pele: req.body.cor_pele,
        email: req.body.email,
        senha: req.body.senha
    })

    await users.save()
    return res.send(users)
})

server.put('/:id', async (req, res) => {
    const user = await Usuarios.findByIdAndUpdate(req.params.id, {
        nome: req.body.nome,
        sobrenome: req.body.sobrenome,
        sexo: req.body.sexo,
        idade: req.body.idade,
        cor_pele: req.body.cor_pele,
        email: req.body.email,
        senha: req.body.senha
    }, {
        new: true
    })

    return res.send(user)
})

server.delete('/:id', async (req, res) => {
    const users = await Usuarios.findByIdAndRemove(req.params.id)
    return res.send(users)
})

server.listen(3000, () => {
    console.log('Rodando...')
})