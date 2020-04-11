const express = require('express')

const { db,notes,tasks } = require('./js/dbCofiguration/db')
const taskRoute = require('./route/route')

const app = express()

app.use(express.json())

app.use('/', express.static(__dirname + '/public'))

app.use('/task', taskRoute)

db.sync()
  .then(() => {
    app.listen(6543)
  })
  .catch((err) => {
    console.error(err)
  })
