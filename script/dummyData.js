const dummyEntries = []
const today = new Date()

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

for (let i = 0; i < 100; i++) {
  let day = new Date()
  day.setDate(today.getDate() - i)

  let coffeeEntry = {
    habitId: 3,
    value: getRandomInt(6),
    userId: 1,
    createdAt: day
  }

  let exerciseEntry = {
    habitId: 1,
    value: getRandomInt(2),
    userId: 1,
    createdAt: day
  }

  let eatingEntry = {
    habitId: 2,
    value: getRandomInt(5) + 1,
    userId: 1,
    createdAt: day
  }

  dummyEntries.push(coffeeEntry)
  dummyEntries.push(exerciseEntry)
  dummyEntries.push(eatingEntry)
}

module.exports = dummyEntries
