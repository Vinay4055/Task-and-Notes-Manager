const express = require('express')

const { db,notes,tasks } = require('./js/dbCofiguration/db')
const taskRoute = require('./route/taskRoute')
const noteRoute = require('./route/noteRoute')
//3153663_vp
//3153664_vp
const app = express()
const SERVER_PORT = process.env.PORT || 3333
app.use(express.json())

app.use('/', express.static(__dirname + '/public'))

app.use('/task', taskRoute)
app.use('/note',noteRoute)
db.sync()
  .then(() => {
    app.listen(SERVER_PORT)
  })
  .catch((err) => {
    console.error(err)
  })
