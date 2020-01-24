const User = require('./user')
const Habit = require('./habit')
const Entry = require('./entry')

User.hasMany(Habit)
User.hasMany(Entry)
Habit.belongsTo(User)
Entry.belongsTo(Habit)
Entry.belongsTo(User)
Habit.hasMany(Entry)

module.exports = {
  User,
  Habit,
  Entry
}
