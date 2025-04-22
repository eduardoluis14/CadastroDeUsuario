import express from 'express'
import { PrismaClient } from '@prisma/client'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())


app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data:{
            name:req.body.name,
            email:req.body.email,
            age:req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where:{
            id:req.params.id
        },
        data:{
            name:req.body.name,
            email:req.body.email,
            age:req.body.age
        }
    })

    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) =>{
    await prisma.user.delete({
        where:{
            id:req.params.id
        }
    })
    res.status(201).json({message: " Usuário deletado com sucesso!"})
})

app.get('/usuarios', async (req, res) => {

    let users = []

    if(req.query){
        users = await prisma.user.findMany({
            where:{
                name:req.query.name,
                email:req.query.email,
                age:req.query.age
            }
        })
    }else{
        users =  await prisma.user.findMany()
    }
    res.status(200).json(users)
})

app.listen(3000)




/* 
1 - Tipo de Rota / Método HTTP
2 - Endereço

*/

/* 
Criar a API de usuarios
- Criar um usuario
- Listar todos os usuarios
- Editar um usuario
- Deletar um usuario

luis
gBewF0k1wMkfxe7i
*/