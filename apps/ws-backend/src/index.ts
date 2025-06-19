import { WebSocketServer } from "ws"
import jwt from 'jsonwebtoken'
import dotenv, { config } from "dotenv"
dotenv.config()
const wss = new WebSocketServer({port : 8080})
const secret = process.env.JWT_SECRET
if(!secret){
    throw new Error('no secret assinged')
}
wss.on('connection' , (ws ,request)=>{
   const url = request.url;

if(!url){
    return
}  

const queryparams = new URLSearchParams(url.split('?')[1])
const token =queryparams.get("token") || ""
const decoded = jwt.verify(token , secret )
if(!decoded){
    ws.close()
}
    ws.on('message' , (data)=>{
        console.log( ' recived : ' + data)
    })
        
    ws.send('something')
      
})