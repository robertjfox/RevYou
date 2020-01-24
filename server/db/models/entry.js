const Sequelize = require('sequelize')
const db = require('../db')

const Entry = db.define('entry', {
  value: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
  // createdAt: {
  //   type: Seq
  // }
})

// Entry.afterCreate(entry => {
//   entry.createdAt = entry.createdAt.slice(0, 10)
// })

module.exports = Entry
