const express = require('express')
const router = express.Router()
const { authMiddleware }  = require('../middleware')
const { Account , User } = require('../db')
const {default : mongoose } = require('mongoose')


// 1. Create a route that get user balance or user detail.
router.get('/balance' , authMiddleware ,  async function(req,res){
    const id = req.userId;
    
    const accountBalance = await Account.findOne({
        userId : id
    })

    const user = await User.findOne({
        _id : id
    })
   
    res.status(200).json({
        balance : accountBalance.balance,
        username : user.username,
        firstName : user.firstName,
        id : user._id
    })
})

// 2. Transfer money route.
router.post('/transfer', authMiddleware , async function(req,res){
    // Extract Reciever id and ammount you send.
    console.log("transfer")
    const {to , ammount} = req.body;

    const session = await mongoose.startSession()

    session.startTransaction()

    // Fetch sennder detail.
    const sender = await Account.findOne({userId : req.userId}).session(session)

    if(!sender || sender.balance < ammount){
        await session.abortTransaction()
        return res.status(400).json({
            message : "Insufficent Balance!"
        })
    }

    // Fetch Reciver details.
    const reciever = await  Account.findOne({userId : to}).session(session)

    if(!reciever){
        await session.abortTransaction()
        return res.status(400).json({
            message : "Reciver Account can't be able to found"
        })
    }

    // Perform the transfer.
    await Account.updateOne( {userId : req.userId} , { $inc : { balance : -ammount }}).session(session)
    await Account.updateOne( {userId : to } , { $inc  : { balance : ammount}}).session(session)

    // Commit.
    await session.commitTransaction()
    await session.endSession()
    res.status(200).json({
        message : "Transaction Succesfull!"
    })
})


module.exports = router