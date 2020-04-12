const Sequelize = require('sequelize')
const db = new Sequelize({
  dialect: 'sqlite',
  storage: __dirname + '/test.db',
})
const notes = db.define('note',{
  id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  note:{
      type: Sequelize.STRING(240),
      allowNull: false,
  }
})

const tasks = db.define('task', {
  id:{
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title:{
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    description:{
      type: Sequelize.STRING(40),
      allowNull: false,
    },
    dueDate:{
      type:Sequelize.DATEONLY,
      allowNull: true
    },
    status:{
      type: Sequelize.STRING(12),
      allowNull: false,
    },
    priority:{
      type: Sequelize.STRING(7),
      allowNull: false,
    }
});
tasks.hasMany(notes,{
  foreignKey:'taskId',
  allowNull: false,
})
module.exports = {
  db,notes,tasks
}



