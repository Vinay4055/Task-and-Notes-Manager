const express = require('express')

const { db,notes,tasks } = require('./js/dbCofiguration/db')
const taskRoute = require('./route/taskRoute')
const noteRoute = require('./route/noteRoute')

const app = express()

app.use(express.json())

app.use('/', express.static(__dirname + '/public'))

app.use('/task', taskRoute)
app.use('/note',noteRoute)
db.sync()
  .then(() => {
    app.listen(3333)
  })
  .catch((err) => {
    console.error(err)
  })
