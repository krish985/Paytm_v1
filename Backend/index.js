const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const rootRouter = require('./routes/index')

dotenv.config()

const app = express()


// Add middleware.
app.use(cors())  // Allow request from frontend.

app.use(express.json())  // Parse the incoming json data.


// Any request came , that have prefix called api/v1 redirect to this middleware.

app.get('/' , function(req,res){
    res.status(200).json({
        message : "Health Check route is fine"
    })
})
app.use('/api/v1' , rootRouter)


// Connect with db.
async function connectDb(){
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Database Connected Succesfull')
}


// Start server listen on PORT 3000.
app.listen(process.env.PORT , function(){
    connectDb()
    console.log(`Server listening on Port : ${process.env.PORT}`)
})

