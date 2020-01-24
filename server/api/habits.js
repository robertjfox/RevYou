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

// get a single habit with the entries eager loaded

router.get('/:habitId', async (req, res, next) => {
  try {
    if (req.user) {
      const habit = await Habit.findOne({
        where: {
          id: req.params.habitId
        },
        include: [
          {
            model: Entry
          }
        ]
      })
      res.send(habit)
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
      res.send(habit)
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
