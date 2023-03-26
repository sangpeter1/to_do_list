const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const{conn,Task} = require('./db')
const path = require('path')

app.use(express.json())
app.use('/dist',express.static('dist'))
app.use('/assets',express.static('assets'))

app.get('/',(req,res) => res.sendFile(path.join(__dirname,'index.html')))
app.get('/api/tasks',async(req,res) => {
    try{
        res.send(await Task.findAll({
            order:[['priority','asc']]
        }))
    }
    catch(ex){
        next(ex)
    }
})

app.post('/api/tasks',async(req,res,next) => {
    try{
        res.status(201).send(await Task.create(req.body))
    }
    catch(ex){
        next(ex)
    }
})

app.put('/api/tasks/:id',async(req,res,next)=>{
    try{
        const task = await Task.findByPk(req.params.id)
        await task.update(req.body)
        res.send(task)
    }
    catch(ex){
        next(ex)
    }
})

app.use((err,req,res,next)=>{
    console.log(err)
    res.send({error:err})
})

app.listen(port,async()=>{
    try{
        await conn.sync({force:true})
        console.log(`listening on port ${port}`)
        const[milk,trash,car] = await Promise.all(['Get the milk','Take out Trash','Repair the car'].map(name => {return Task.create({name})}))
        milk.update({isComplete:true,priority:1})
    }
    catch(ex){
        console.log(ex)
    }
})