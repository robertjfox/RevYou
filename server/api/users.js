const router = require('express').Router()
const {User, Habit, Entry} = require('../db/models')
module.exports = router

//get the logged in user from passport

router.get('/me', async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findByPk(req.user.id)
      res.json(user)
    } else {
      res.sendStatus(401)
    }
  } catch (error) {
    next(error)
  }
})
