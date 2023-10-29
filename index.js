require('dotenv').config()
const router=require('./Routes/router')
const cors=require('cors')

const express = require('express')
const server = express()
server.use(express.json())
server.use(cors())
server.use(router)
require('./database/connection')
const port =5000 || process.env.port
server.listen(port,()=>{console.log(`----server created at port number ${port}-------` );})