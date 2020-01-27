const Sequelize = require('sequelize')
const db = require('../db')

const Habit = db.define('habit', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ratingType: {
    type: Sequelize.ENUM('FiveStars', 'Binary', 'Counter'),
    allowNull: false
  },
  imgPath: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'icons/default.png'
  }
})

module.exports = Habit
