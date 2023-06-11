
const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const cors = require('cors')

const {createUser,extractUser,checkLoginDetails} = require('./authentication')
const { returnOnlineuser, turnOffline } = require('./user')
const app = express()




app.use(express.json())
app.use(cors())

const server = http.createServer(app)

//socket.io code

const io = socketIO(server)

io.on('connection',socket=>{
    
    socket.on('message',data=>{
        io.emit('message',data)
    })

   
    socket.on('disconnect',()=>{
        
        console.log('disconnected')
    })



  })

app.get('/',(req,res)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   
})

app.post('/api/contacts/online',(req,res)=>{
    turnOffline(req.body)
    res.setHeader('Access-Control-Allow-origin','*')
    res.status(200);
})

app.get('/api/contacts',(req,res)=>{
    
    res.setHeader('Access-Control-Allow-origin','*')
    res.json(extractUser())
})

app.post('/api/login',(req,res)=>{
    const response = checkLoginDetails(req.body)
    
    res.setHeader('Access-Control-Allow-origin','*')
    return res.status(200).json({response})
})




app.post('/api/register',(req,res)=>{

    const result = createUser(req.body)
    
   if(result && !(result instanceof Error) ){
    res.setHeader('Access-Control-Allow-origin','*')
    res.status(200).json({message:'user registered succesfully',result})
   }
   else{
        res.setHeader('Access-Control-Allow-origin','*')
      res.status(409).json({error:'Username already taken'})
   }
})





const port = 3000
server.listen(port, ()=>{
    console.log(`Server is running at ${port}`)
})
