const express = require('express')
const router = express.Router()

const userRouter = require('./user')
const accountRouter = require('./account')

//  1. Pass to user router more like recursive manner.
// -> any route starts with api/v1/user go to userRouter.
router.use('/user' , userRouter)
router.use('/account' , accountRouter)


module.exports = router