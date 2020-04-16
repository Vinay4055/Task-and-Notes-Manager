function assignDefaultDateForDueDate(){
console.log("Date Fun")
const today = new Date()
const tomorrow = new Date(today)
console.log(tomorrow)
tomorrow.setDate(tomorrow.getDate() + 1)
let parseDate = formatDate(tomorrow)
let dueDate = document.getElementById('dueDate')
dueDate.setAttribute('value',parseDate)

}
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}