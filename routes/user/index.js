const express = require('express')
const router = express.Router()
const { User } = require('../../models')
const createError = require('http-errors')
const bcrypt = require('bcrypt')

router.get('/create', async (req, res, next) => {
  try {
    const result = await User.create({
      userid: 'moongtak',
      userpw: await bcrypt.hash('111111', Number(process.env.BCRYPT_ROUND)),
      username: '뭉탁',
      email: 'mmaf@naver.com',
    })
    res.json(result)
  }
  catch (err) {
    next(createError(err))
  }
})

router.get('/update/:id', async (req, res, next) => {
  User.update()
})

router.get('/delete/:id', (req, res, next) => {

})

router.get(['/read', '/read/:id'], (req, res, next) => {

})

module.exports = router