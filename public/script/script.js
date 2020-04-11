
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
}
function displayTask(){
const allTask=document.getElementById('allTask')
    const allTasks = displayTaskOnServer()

}