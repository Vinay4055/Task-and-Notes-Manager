async function addTaskOnServer(task){
    
    const resp = await fetch('/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({task:task})
      })
}