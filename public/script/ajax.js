async function addTaskOnServer(task){
    
    const resp = await fetch('/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({task:task})
      })
}
async function getAllTasksFromServer(){
  const resp = await fetch('/task',{
    method: 'GET'
 })
 let task = await resp.json()
 return task

}
async function getAllNotesFromServer(id){
  //console.log("Id = ",id)
  const resp = await fetch('/note/'+id,{
    method: 'GET'
  })
  let note = await resp.json()
  return note
}
async function addNewNoteToServer(note,taskId) {
  console.log("New Note = ",note)
  console.log("Task Id = ",taskId)
  const resp = await fetch('/note/'+taskId,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({note:note})
  }
  )
}
async function updateDueDateOnServer(taskId , newValue) {
  
  const resp = await fetch('/task/dueDate/'+taskId,
  {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({dueDate : newValue})
  }
  )

  
}


async function updatePriorityOnServer(taskId , newValue) {
  
  const resp = await fetch('/task/priority/'+taskId,
  {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({priority : newValue})
  }
  )
 
  
}


async function updateStatusOnServer(taskId , newValue) {
  
  const resp = await fetch('/task/status/'+taskId,
  {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({status : newValue})
  }
  )

  
}
