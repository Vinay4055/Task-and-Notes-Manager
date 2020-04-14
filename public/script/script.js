
function createNoteUi(){
const note=document.getElementById("note")
const label=document.createElement("label")
label.textContent="Note"
const input=document.createElement("input")

const br=document.createElement("br")
note.append(label)
note.append(input)
note.append(br)
}
function addTask(){
let title=document.getElementById('title').value
let description=document.getElementById('description').value
let dueDate=document.getElementById('dueDate').value
let priority=document.getElementById('priority').value
const note = document.getElementById('note')
let notes=note.getElementsByTagName('input')
let noteValues = new Array();
for(item of notes){
    noteValues.push(item.value)
}
console.log("noteValues = ",noteValues)
 addTaskOnServer(
    {
        "title":title,
        "description":description,
        "dueDate":dueDate,
        "priority":priority,
        "note":noteValues

    }
)



displayTasks()
}
let count =1 ;


async function displayTasks(){
    
  let taskArray=await getAllTasksFromServer();
 
 
  let allTask = document.getElementById('allTask')
  
  
    taskArray.forEach(element => {
    
      let dueDate=""
     
        if(((''+element.dueDate).localeCompare('Invalid date')) == 0){
            dueDate = 'No Due Date'
        }
        else{
            dueDate = element.dueDate
        }
        let li = document.createElement("li")
        li.setAttribute('id','list'+count)
        
        let taskDiv = document.createElement('div')
        taskDiv.setAttribute('id','taskId'+count)
        taskDiv.setAttribute('value',element.id)

        li.append(taskDiv)

        let titleDiv = document.createElement('div')
        titleDiv.setAttribute('id','title'+count)
        titleDiv.setAttribute('value',element.title)
        titleDiv.setAttribute('onclick','displayNotes(this.id)')
        titleDiv.textContent = 'Title = '+element.title
        li.append(titleDiv)

        let descriptionDiv = document.createElement('div')
        descriptionDiv.setAttribute('id','description'+count)
        descriptionDiv.setAttribute('value',element.description)
        descriptionDiv.setAttribute('onclick','displayNotes(this.id)')
        descriptionDiv.textContent = 'Description = '+element.description
        li.append(descriptionDiv)

        let dueDateDiv = document.createElement('div')
        dueDateDiv.setAttribute('id','dueDate'+count)
        dueDateDiv.setAttribute('value',dueDate)
       // dueDateDiv.setAttribute('onclick','displayNotes(this.id)')

        const spanDueDate = document.createElement('span')
        spanDueDate.setAttribute('id','spanDueDate'+count)
        spanDueDate.setAttribute('class','glyphicon glyphicon-edit')
        spanDueDate.setAttribute('onclick','editAnyElement(this.id,\"dueDate\")')
        dueDateDiv.textContent = 'Due Date = '+dueDate

        dueDateDiv.append(spanDueDate)
        li.append(dueDateDiv)

        let priorityDiv = document.createElement('div')
        priorityDiv.setAttribute('id','priority'+count)
        priorityDiv.setAttribute('value',element.priority)
      //  priorityDiv.setAttribute('onclick','displayNotes(this.id)')


        const spanPriority = document.createElement('span')
        spanPriority.setAttribute('id','spanPriority'+count)
        spanPriority.setAttribute('class','glyphicon glyphicon-edit')
        spanPriority.setAttribute('onclick','editAnyElement(this.id,\"priority\")')


        priorityDiv.textContent = 'Priority = '+element.priority
        priorityDiv.append(spanPriority)
        li.append(priorityDiv)

        let statusDiv = document.createElement('div')
        statusDiv.setAttribute('id','status'+count)
        statusDiv.setAttribute('value',element.status)
        //statusDiv.setAttribute('onclick','displayNotes(this.id)')

        const spanStatus = document.createElement('span')
        spanStatus.setAttribute('id','spanStatus'+count)
        spanStatus.setAttribute('class','glyphicon glyphicon-edit')
        spanStatus.setAttribute('onclick','editAnyElement(this.id,\"status\")')

        statusDiv.textContent = 'Status = '+element.status
        statusDiv.append(spanStatus)
        li.append(statusDiv)

        allTask.append(li)
          count++
    })
      
}  

let noteCount=1
async function displayNotes(id) {
  
    noteCount = 1
    let count = (id.match(/(\d+)/))[0]; 
    const li = document.getElementById('list'+count)
    let taskId = document.getElementById('taskId'+count).getAttribute('value')
    let notesArray = await getAllNotesFromServer(taskId)
    for(note of notesArray){
        let existingNode = document.getElementById('note'+count+''+noteCount)
        if(existingNode != null)
        {
            existingNode.parentElement.removeChild(existingNode)
        }
        const div = document.createElement("div")
        div.setAttribute("id",'note'+count+''+noteCount)
        div.textContent = note.note
        li.append(div)
        noteCount++
 }
   let existingDiv = document.getElementById('newNote'+count+''+noteCount) 
   if(existingDiv != null)
   {
       existingDiv.parentElement.removeChild(existingDiv)
   }
   let existingInput = document.getElementById('newNote'+count)
   if(existingInput != null){
       existingInput.parentElement.removeChild(existingInput)
   } 
   let existingButton = document.getElementById('button'+count)
   let existingBr1 = document.getElementById('br'+count+'1')
   let existingBr2 = document.getElementById('br'+count+'2')
   if(existingButton != null){
       existingButton.parentElement.removeChild(existingButton)
       existingBr1.parentElement.removeChild(existingBr1)
       existingBr2.parentElement.removeChild(existingBr2)

    }
    const div = document.createElement("div")
    div.setAttribute('id','newNote'+count+''+noteCount)
    li.append(div)
    let input = document.createElement("input")
    input.setAttribute("id",'newNote'+count)
    input.setAttribute("placeholder","Enter New Note")
    input.required="true"
    input.setAttribute('class','newNote')
    let brCount = 1
    let button = document.createElement("Button")
    button.setAttribute('id','button'+count)
    button.setAttribute('class','button')
    button.setAttribute('onclick','addNewNote('+count+')')
    button.innerHTML="ADD"
    li.append(input)
    li.append(button)
    let br1 = document.createElement('br')
    br1.setAttribute('id','br'+count+''+brCount)
    li.append(br1)
    brCount++
    let br2 = document.createElement('br')
    br2.setAttribute('id','br'+count+''+brCount)
    li.append(br2)

    return 'Complete Processing'
}
function addNewNote(count) {
    let div = document.getElementById('newNote'+count+''+noteCount)
     div.textContent = document.getElementById('newNote'+count).value
     noteCount++
    const newDiv = document.createElement('div')
    console.log("Inside Add new Note")
    newDiv.setAttribute('id','newNote'+count+''+noteCount)
    div.append(newDiv)
    let taskId = document.getElementById('taskId'+count).getAttribute('value')
    addNewNoteToServer(div.textContent,taskId)
}
let newElementCount = 1
function editAnyElement(id,elementToChange) {
    let count = (id.match(/(\d+)/))[0]; 
    let newElement=""
    
    console.log('Element To Change = '+elementToChange)
    if((''+elementToChange.localeCompare('dueDate')) == 0)
    {
       newElement = document.createElement('input')
       console.log('Element To Change Inside due Date= '+elementToChange)
       newElement.setAttribute('type','date')
       newElement.setAttribute('oninput','updateValue('+count+','+'newElement'+count+''+newElementCount+',\"'+elementToChange+'\")')
       newElement.setAttribute('class','newElement')
    }
    if((''+elementToChange.localeCompare('priority')) == 0)
    {
        newElement = document.createElement('select')
        newElement.setAttribute('onchange','updateValue('+count+','+'newElement'+count+''+newElementCount+',\"'+elementToChange+'\")')
        newElement.setAttribute('class','newElement')
        console.log('Element To Change Inside Priority= '+elementToChange)
        let option1 = document.createElement('option')
        option1.setAttribute('value','High')
        option1.textContent='High'
        newElement.append(option1)
        let option2 = document.createElement('option')
        option2.setAttribute('value','Medium')
        option2.textContent='Medium'
        newElement.append(option2)
        let option3 = document.createElement('option')
        option3.setAttribute('value','Low')
        option3.textContent='Low'
        newElement.append(option3)
    }
    if((''+elementToChange.localeCompare('status')) == 0){
        newElement = document.createElement('div')
        
        let completedCheckbox = document.createElement('input')
        completedCheckbox.setAttribute('type','checkbox')
        completedCheckbox.setAttribute('class','newCheckBox')
        //completedCheckbox.setAttribute('checked',true)
        completedCheckbox.setAttribute('onclick','updateValueOfStatus('+count+','+'newElement'+count+''+newElementCount+',\"'+elementToChange+'\")')
        completedCheckbox.setAttribute('value','Complete')
        let completedLabel = document.createElement('label')
        let brCompletedCheckBox = document.createElement('br')
        
        //let brCompletedCheckBoxAnother = document.createElement('br')
        //completedCheckbox.append(brCompletedCheckBox)
        completedLabel.textContent = 'Completed'
        newElement.append(completedCheckbox)
        completedCheckbox.parentNode.insertBefore(completedLabel,completedCheckbox.nextSibling)
        completedLabel.parentNode.insertBefore(brCompletedCheckBox,completedLabel.nextSibling)


        let notCompletedCheckbox = document.createElement('input')
        notCompletedCheckbox.setAttribute('type','checkbox')
        notCompletedCheckbox.setAttribute('class','newCheckBox')
        //notcompletedCheckbox.setAttribute('checked',true)
        notCompletedCheckbox.setAttribute('onclick','updateValueOfStatus('+count+','+'newElement'+count+''+newElementCount+',\"'+elementToChange+'\")')
        notCompletedCheckbox.setAttribute('value','InComplete')
        let inCompletedLabel = document.createElement('label')
        let brInCompletedCheckBox = document.createElement('br')
        
        //let brCompletedCheckBoxAnother = document.createElement('br')
        inCompletedLabel.textContent = 'InComplete'
        newElement.append(notCompletedCheckbox)
        notCompletedCheckbox.parentNode.insertBefore(inCompletedLabel,notCompletedCheckbox.nextSibling)



        newElement.append(brInCompletedCheckBox)
        
        
    }
    newElement.setAttribute('id','newElement'+count+''+newElementCount)
    
    let oldValue = document.getElementById(elementToChange+''+count).getAttribute('value')
    newElement.setAttribute('value',oldValue)
    let existingElement = document.getElementById(elementToChange+''+count)
    const br1 = document.createElement('br')
    existingElement.innerHTML = ""
    let newLabel = document.createElement('label')
    newLabel.setAttribute('id','newLabel'+count+''+newElementCount)
    newLabel.textContent = 'Enter New ' + elementToChange 
    existingElement.append(newLabel)
    existingElement.append(newElement)
    existingElement.append(br1)
    newElementCount++

}
async function updateValue(count,id,elementToChange) {
    console.log("ID = = = "+id.id)
    let newElementCount = ((id.id).match(/(\d+)/))[0]; 
    let newLabel = document.getElementById('newLabel'+newElementCount)
    newLabel.innerHTML=""
    let newInput = document.getElementById('newElement'+newElementCount)
    let taskId = document.getElementById('taskId'+count).getAttribute('value')
    let newValue = id.value
    newInput.parentElement.removeChild(newInput)
    let newDiv = document.createElement('div')
    newDiv.setAttribute('id',elementToChange+''+count)
    newDiv.textContent=elementToChange+' = '+newValue
    let newSpan = document.createElement('span')
    newSpan.setAttribute('id','spanDueDate'+count)
    newSpan.setAttribute('class','glyphicon glyphicon-edit')
    newSpan.setAttribute('onclick','editAnyElement(this.id,\"'+elementToChange+'\")')
    newDiv.append(newSpan)
    newLabel.append(newDiv)
    console.log("New Value = "+newValue)
    if((''+elementToChange.localeCompare('dueDate')) == 0)
    {
        console.log('Inside dueDate If')
        await updateDueDateOnServer(taskId,newValue)
        

    }
    if((''+elementToChange.localeCompare('priority')) == 0)
    {
        console.log('Inside dueDate If')
        await updatePriorityOnServer(taskId,newValue)
        

    }
}






async function updateValueOfStatus(count,id,elementToChange) {
    console.log("ID = = = "+id.id)
    console.log("OR = "+id)
    
    //let div = document.getElementById(id.id)
    let checkBoxes = id.getElementsByTagName('input')
    
    let newValue=""
    for(let checkbox of checkBoxes){
        if(checkbox.checked == true){
            newValue = checkbox.value
            break
        }
    }
    let newElementCount = ((id.id).match(/(\d+)/))[0]; 
    let newLabel = document.getElementById('newLabel'+newElementCount)
    newLabel.innerHTML=""
    let newInput = document.getElementById('newElement'+newElementCount)
    let taskId = document.getElementById('taskId'+count).getAttribute('value')
    
    newInput.parentElement.removeChild(newInput)
    let newDiv = document.createElement('div')
    newDiv.setAttribute('id',elementToChange+''+count)
    newDiv.textContent=elementToChange+' = '+newValue
    let newSpan = document.createElement('span')
    newSpan.setAttribute('id','spanDueDate'+count)
    newSpan.setAttribute('class','glyphicon glyphicon-edit')
    newSpan.setAttribute('onclick','editAnyElement(this.id,\"'+elementToChange+'\")')
    newDiv.append(newSpan)
    newLabel.append(newDiv)
    console.log("New Value = "+newValue)
 
        await updateStatusOnServer(taskId,newValue)
        

    
}