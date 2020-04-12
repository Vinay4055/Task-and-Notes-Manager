const { Router } = require('express')
const { tasks,notes} = require('../js/dbCofiguration/db')

const route = Router()

route.get('/',async(req,res) => {
  const allTasks = await tasks.findAll(
    {
      attributes: ['id', 'title', 'description', 'dueDate', 'status', 'priority']
    }
  )
  
  
   res.send(allTasks)
  
})

route.post('/', async (req, res) => {
    console.log("At server = "+req.body.task.title)
    if (typeof req.body.task.title !== 'string') {
      return res.status(400).send({ error: 'Task name not provided' })
    }
    
  
    const newTask = await tasks.create({
        title: req.body.task.title,
        description: req.body.task.description,
        dueDate: req.body.task.dueDate,
        priority:req.body.task.priority,
        status:"Incomplete"
      })
let noteArray=req.body.task.note;
for(note of noteArray){
  const newNote = await notes.create({
    note:note,
    taskId:newTask.id
 
})
}
  
    res.status(201).send({ success: 'New task added', data: newTask })
  })



  module.exports = route