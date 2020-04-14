async function addTaskOnServer(task){
    
    const resp = await fetch('/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({task:task})
      })
     

     resp.body.getReader().read().then((v) =>
     {
      let string = new TextDecoder("utf-8").decode(v.value);
      let jsonResp = JSON.parse(string)
      document.getElementById('response').innerHTML="<font color = \"red\">"+jsonResp.response+"</font>"
      console.log(jsonResp.error)
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

  resp.body.getReader().read().then((v) =>
     {
      let string = new TextDecoder("utf-8").decode(v.value);
      let jsonResp = JSON.parse(string)
      document.getElementById('response').innerHTML="<font color = \"red\">"+jsonResp.response+"</font>"
      console.log(jsonResp.error)
    })


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
