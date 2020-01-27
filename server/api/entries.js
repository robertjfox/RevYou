const router = require('express').Router()
const {User, Habit, Entry} = require('../db/models')
module.exports = router

// get the entries of the logged in user

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const entries = await Entry.findAll({
        where: {
          userId: req.user.id
        }
      })
      res.json(entries)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

router.put('/:entryId', async (req, res, next) => {
  try {
    if (req.user) {
      const userId = req.user.id
      const {id, value} = req.body
      Entry.update({value}, {where: {id: id, userId: userId}})
      res.sendStatus(204)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})

// router.post('/', async (req, res, next) => {
//   try {
//     if (req.user) {
//       const {name, ratingType} = req.body
//       const habit = await Habit.create({
//         name,
//         ratingType,
//         userId: req.user.id
//       })
//       res.send(habit)
//     } else {
//       res.sendStatus(401)
//     }
//   } catch (error) {
//     next(error)
//   }
// })
