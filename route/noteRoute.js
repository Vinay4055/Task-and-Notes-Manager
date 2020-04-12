const { Router } = require('express')
const { notes} = require('../js/dbCofiguration/db')

const route = Router()

route.get('/:id',async(req,res) => {
  let id = req.params.id
  console.log("Id = ",id)
  const allNotes = await notes.findAll(
    {
      attributes: ['id', 'note', 'taskId'],
      where:{
        taskId:id
      }
    }
  )
  console.log("Notes Frm Back = ",allNotes )
  
   res.send(allNotes)
  
})
route.post('/:id',async(req,res) => {
  let taskId = req.params.id
  console.log("taskId = "+taskId)
  let note = req.body.note
  console.log("Note = "+note)
  await notes.create(
    {
      note : note,
      taskId : taskId
  }
  )
})
module.exports = route