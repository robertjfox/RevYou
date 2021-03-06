'use strict'

const db = require('../server/db')
const {User, Habit, Entry} = require('../server/db/models')
const dummyEntries = require('./dummyData')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Robert',
      lastName: 'Fox',
      email: 'cody@email.com',
      password: '123'
    })
  ])

  const habits = await Promise.all([
    Habit.create({
      name: 'Excercise',
      ratingType: 'Binary',
      userId: 1,
      imgPath: 'icons/exercise.png'
    }),
    Habit.create({
      name: 'Eat Healthy',
      ratingType: 'FiveStars',
      userId: 1,
      imgPath: 'icons/eating.png'
    }),
    Habit.create({
      name: 'Coffee',
      ratingType: 'Counter',
      userId: 1,
      imgPath: 'icons/coffee.png'
    })
  ])

  const entries = await Promise.all([Entry.bulkCreate(dummyEntries)])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${entries[0].length} entries`)
  console.log(`seeded ${habits.length} habits`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
