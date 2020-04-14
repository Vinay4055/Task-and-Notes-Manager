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
    if((req.body.task.title.length == 0)){
      return res.status(400).send({ response: 'Task Title not provided' })//Task name not provided
    }

    if ( (!isNaN(Number(req.body.task.title))) ) {

      return res.status(400).send({ response: 'Task Title Should must Contain some alphabets' })
    }
    
  
    const newTask = await tasks.create({
        title: req.body.task.title,
        description: req.body.task.description,
        dueDate: req.body.task.dueDate,
        priority:req.body.task.priority,
        status:"InComplete"
      })
let noteArray=req.body.task.note;
for(note of noteArray){
  if(note.length != 0){
  const newNote = await notes.create({
    note:note,
    taskId:newTask.id
 
})

  }
}
  
    res.status(201).send({ response: 'New task added', data: newTask })
  })

  route.patch('/dueDate/:id',async (req,res) => {

    let taskId = req.params.id
    let task = await tasks.findByPk(taskId)
    let dueDate = req.body.dueDate
    console.log("Due Date = "+dueDate)
    task.dueDate = dueDate
    await task.save();
    res.status(201).send({ success: 'DueDate Updated', data: dueDate })
  })



  route.patch('/priority/:id',async (req,res) => {

    let taskId = req.params.id
    let task = await tasks.findByPk(taskId)
    let priority = req.body.priority
    
    task.priority = priority
    await task.save();
    res.status(201).send({ success: 'Priority Updated', data: priority })
  })


  route.patch('/status/:id',async (req,res) => {

    let taskId = req.params.id
    let task = await tasks.findByPk(taskId)
    let status = req.body.status
    
    task.status = status
    await task.save();
    res.status(201).send({ success: 'Status Updated', data: status })
  })



  module.exports = route