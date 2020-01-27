const router = require('express').Router()
const {User, Habit, Entry} = require('../db/models')
module.exports = router

// get the habits of the logged in user

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const habits = await Habit.findAll({
        where: {
          userId: req.user.id
        }
      })
      res.json(habits)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user) {
      const {name, ratingType} = req.body
      const habit = await Habit.create({
        name,
        ratingType,
        userId: req.user.id
      })
      const entry = await Entry.create({
        value: 0,
        userId: req.user.id,
        habitId: habit.id
      })
      res.send({habit, entry})
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

router.delete('/:habitId', async (req, res, next) => {
  try {
    if (req.user) {
      await Habit.destroy({
        where: {
          id: req.params.habitId
        }
      })
      res.sendStatus(204)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})
