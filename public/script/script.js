
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
let status=false
displayCurrentAddedTask(title,description,dueDate,priority,noteValues,status)
}
let count =1 ;
function displayCurrentAddedTask(title,description,dueDate,priority,noteValues,status){
  let statusOfTask=""
  if(status===false)
    {
      statusOfTask="Incomplete"
    }
    else{
      statusOfTask="Completed"
    }
   
    const ol=document.getElementById("allTask");
    const li=document.createElement("li");
    li.id="list"+ count;
    li.setAttribute("onclick","displayNotes(this.id)");
    li.textContent='<div id=title'+count+' value=\''+title+'\'>'+title+'</div><div id=description'+count+' value=\''+description+'\'> Description = '+description+'</div><div id=dueDate'+count+' value=\''+dueDate+'\'>Due Date = '+dueDate+'</div><div id=priority'+count+' value=\''+priority+'\'>Priority = '+priority+'</div><div id=status'+count+' value=\''+statusOfTask+'\'> Status = '+statusOfTask+'</div>'
    ol.append(li);
    count++;
}
async function displayTasks(){
 
  let taskArray=await getAllTasksFromServer();
 
  
  let newTasks=""
    taskArray.forEach(element => {
      let statusOfTask=""
      let dueDate=""
     
        if(!((''+element.dueDate).localeCompare('Invalid date'))){
            dueDate = 'No Due Date'
        }
        else{
            dueDate = element.dueDate
        }
      newTasks+='<li id=list'+count+'><div id=taskId'+count+' value=\''+element.id+'\'></div><div onclick = displayNotes(this.id) id=title'+count+' value=\''+element.title+'\'>'+element.title+'</div><div onclick = displayNotes(this.id) id=description'+count+' value=\''+element.description+'\'> Description = '+element.description+'</div><div onclick = displayNotes(this.id) id=dueDate'+count+' value=\''+dueDate+'\'>Due Date = '+dueDate+'</div><div onclick = displayNotes(this.id) id=priority'+count+' value=\''+element.priority+'\'>Priority = '+element.priority+'</div><div onclick = displayNotes(this.id) id=status'+count+' value=\''+element.status+'\'> Status = '+element.status+'</div></li>'
      
      
    //Change this to without innerHTML as displayNotes
      
      
      count++
    })
      
      document.getElementById('allTask').innerHTML=newTasks
}
let noteCount=1
async function displayNotes(id) {
    console.log("Inside Display Notes")
    noteCount = 1
    let count = (id.match(/(\d+)/))[0]; 
    
    const li = document.getElementById('list'+count)
    let taskId = document.getElementById('taskId'+count).getAttribute('value')
    
    let notesArray = await getAllNotesFromServer(taskId)
    for(note of notesArray){
        
        const div = document.createElement("div")
        div.setAttribute("id",'note'+count+''+noteCount)
        div.textContent = note.note
        li.append(div)
        noteCount++
 }
    

   
   

    const div = document.createElement("div")
    div.setAttribute('id','newNote'+count+''+noteCount)
    li.append(div)
   
    
    
    let input = document.createElement("input")
    input.setAttribute("id",'newNote'+count)
    input.setAttribute("placeholder","Enter New Note")
    input.setAttribute('class','newNote')
    
    
    
    let button = document.createElement("Button")
    button.setAttribute('id','button'+count)
    button.setAttribute('class','button')
    button.setAttribute('onclick','addNewNote('+count+')')
    button.innerHTML="ADD"
    
    
    
    
    const br = document.createElement("br")
    li.append(br)
    li.append(input)
    li.append(br)
    li.append(button)

   
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

