let sortCount = 1
function displaySortedTasks(taskArray){
    let allTasks = document.getElementById('allTask')
    allTasks.innerHTML = ""




  
  
    let newTasks=""
      taskArray.forEach(element => {
        let statusOfTask=""
        let dueDate=""
        let description=""
          if(((''+element.dueDate).localeCompare('Invalid date')) == 0){
              dueDate = 'No Due Date'
          }
          else{
              dueDate = element.dueDate
          }
          if((element.description).localeCompare('') == 0)
        {
            description = 'No Description Provided'
        }
        else
        {
            description = element.description
        }
          let li = document.createElement("li")
          li.setAttribute('id','list'+sortCount)
          
          let taskDiv = document.createElement('div')
          taskDiv.setAttribute('id','taskId'+sortCount)
          taskDiv.setAttribute('value',element.id)
  
          li.append(taskDiv)
  
          let titleDiv = document.createElement('div')
          titleDiv.setAttribute('id','title'+sortCount)
          titleDiv.setAttribute('value',element.title)
          titleDiv.setAttribute('onclick','displayNotes(this.id)')
          titleDiv.textContent = 'Title = '+element.title
          li.append(titleDiv)
  
          let descriptionDiv = document.createElement('div')
          descriptionDiv.setAttribute('id','description'+sortCount)
          descriptionDiv.setAttribute('value',element.description)
          descriptionDiv.setAttribute('onclick','displayNotes(this.id)')
          descriptionDiv.textContent = 'Description = '+description
          li.append(descriptionDiv)
  
          let dueDateDiv = document.createElement('div')
          dueDateDiv.setAttribute('id','dueDate'+sortCount)
          dueDateDiv.setAttribute('value',dueDate)
          dueDateDiv.setAttribute('onclick','displayNotes(this.id)')
  
          const spanDueDate = document.createElement('span')
          spanDueDate.setAttribute('id','spanDueDate'+sortCount)
          spanDueDate.setAttribute('class','glyphicon glyphicon-edit')
          spanDueDate.setAttribute('onclick','editAnyElement(this.id,\"dueDate\")')
          dueDateDiv.textContent = 'Due Date = '+dueDate
  
          dueDateDiv.append(spanDueDate)
          li.append(dueDateDiv)
  
          let priorityDiv = document.createElement('div')
          priorityDiv.setAttribute('id','priority'+sortCount)
          priorityDiv.setAttribute('value',element.priority)
          priorityDiv.setAttribute('onclick','displayNotes(this.id)')
  
  
          const spanPriority = document.createElement('span')
          spanPriority.setAttribute('id','spanPriority'+sortCount)
          spanPriority.setAttribute('class','glyphicon glyphicon-edit')
          spanPriority.setAttribute('onclick','editAnyElement(this.id,\"priority\")')
  
  
          priorityDiv.textContent = 'Priority = '+element.priority
          priorityDiv.append(spanPriority)
          li.append(priorityDiv)
  
          let statusDiv = document.createElement('div')
          statusDiv.setAttribute('id','status'+sortCount)
          statusDiv.setAttribute('value',element.status)
          //statusDiv.setAttribute('onclick','displayNotes(this.id)')
  
          const spanStatus = document.createElement('span')
          spanStatus.setAttribute('id','spanStatus'+sortCount)
          spanStatus.setAttribute('class','glyphicon glyphicon-edit')
          spanStatus.setAttribute('onclick','editAnyElement(this.id,\"status\")')
  
          statusDiv.textContent = 'Status = '+element.status
          statusDiv.append(spanStatus)
          li.append(statusDiv)
  
          allTask.append(li)
            sortCount++
      })
        
  }


function sortTasks(id){
    let select = document.getElementById('sortTask')
    
   
   
    let option = document.getElementById('sortTask').value
    if(option.localeCompare('dueDateAscending') == 0){
        sortTasksByDueDateAscending()
       
    }
    if(option.localeCompare('dueDateDescending') == 0){
        sortTasksByDueDateDescending()
        
    }

    if(option.localeCompare('priority') == 0){
        sortTasksByPriority()
    }
    if(option.localeCompare('status') == 0){
        sortTasksByStatus()
    }
    select.selectedIndex = 0
}

async function sortTasksByDueDateAscending(){
    let allTasks = await getAllTasksFromServer()
  
    
    allTasks.sort((firstElement,secondElement) => {
        let firstElementTime=""
        let secondElementTime=""
        if((firstElement.dueDate.localeCompare('Invalid date') == 0) ){
            firstElementTime = new Date('1970-01-01')
            
        }
        if((firstElement.dueDate.localeCompare('Invalid date') != 0) ){
            firstElementTime =  (new Date(firstElement.dueDate))
            
        }

        if(secondElement.dueDate.localeCompare('Invalid date') == 0)
        {
            secondElementTime = new Date('1970-01-01')
          
        }
       
        if(secondElement.dueDate.localeCompare('Invalid date') != 0)
        {
            secondElementTime = (new Date(secondElement.dueDate))
          
        }

        
        
       return firstElementTime-secondElementTime
    })
    displaySortedTasks(allTasks)

}


async function sortTasksByDueDateDescending(){
    let allTasks = await getAllTasksFromServer()
  
    
    allTasks.sort((firstElement,secondElement) => {
        let firstElementTime=""
        let secondElementTime=""
        if((firstElement.dueDate.localeCompare('Invalid date') == 0) ){
            firstElementTime = new Date('1970-01-01')
            
        }
        if((firstElement.dueDate.localeCompare('Invalid date') != 0) ){
            firstElementTime =  (new Date(firstElement.dueDate))
            
        }

        if(secondElement.dueDate.localeCompare('Invalid date') == 0)
        {
            secondElementTime = new Date('1970-01-01')
          
        }
       
        if(secondElement.dueDate.localeCompare('Invalid date') != 0)
        {
            secondElementTime = (new Date(secondElement.dueDate))
          
        }

        
        
       return secondElementTime-firstElementTime
    })
    displaySortedTasks(allTasks)
}



async function sortTasksByPriority(){
    let allTasks = await getAllTasksFromServer()
    
    
    allTasks.sort((firstElement,secondElement) => {
        let highFirst = false
        let mediumFirst = false
        let lowFirst = false

        let highSecond = false
        let mediumSecond = false
        let lowSecond = false


            if((firstElement.priority).localeCompare('High') == 0)
            {
                highFirst = true
            }
            if((firstElement.priority).localeCompare('Medium') == 0)
            {
                mediumFirst = true
            }
            if((firstElement.priority).localeCompare('Low') == 0)
            {
                lowFirst = true
            }

            if((secondElement.priority).localeCompare('High') == 0)
            {
                highSecond = true
            }
            if((secondElement.priority).localeCompare('Medium') == 0)
            {
                mediumSecond = true
            }
            if((secondElement.priority).localeCompare('Low') == 0)
            {
                lowSecond = true
            }

            if (highFirst && highSecond)
            {
                return 0
            }

            if ( highFirst && (mediumSecond || lowSecond) )
            {
                return -1 //As per conventions it should be 1
            }   	      // but to sort by descending we have to do this for all return statements

            if ( mediumFirst && highSecond)
            {
                return 1
            }

            if( mediumFirst && mediumSecond )
            {
                return 0
            }
            
            if ( mediumFirst && lowSecond )
            {
                return -1
            }


            if ( lowFirst && highSecond)
            {
                return 1
            }

            if( lowFirst && mediumSecond )
            {
                return 1
            }

            if ( lowFirst && lowSecond )
            {
                return 0
            }
    }
    
    )
    displaySortedTasks(allTasks)

}
async function sortTasksByStatus(){
    console.log("Sort By Task")
    let allTasks = await getAllTasksFromServer()
    
    
    allTasks.sort((firstElement,secondElement) => {
        let highFirst = false
        let lowFirst = false

        let highSecond = false
        let lowSecond = false

        if( ( (firstElement.status).localeCompare('Complete') == 0 ) )
        {
            highFirst = true
        }

        if( ( (firstElement.status).localeCompare('InComplete') == 0 ) )
        {
            lowFirst = true
        }

        if( ( (secondElement.status).localeCompare('Complete') == 0 ) )
        {
            highSecond = true
        }

        if( ( (secondElement.status).localeCompare('InComplete') == 0 ) )
        {
            lowSecond = true
        }


        if ( highFirst  && highSecond )
        {
            return 0
        }

        if ( (highFirst == true) && (lowSecond == true ) )
        {
            return 1
        }


        
        if ( (lowFirst == true)  && (highSecond == true ) )
        {
            return -1
        }

        if ( lowFirst && lowSecond )
        {
            return 0
        }


    })
    displaySortedTasks(allTasks)
}