import { WebSocket, WebSocketServer } from "ws"
import jwt from 'jsonwebtoken'
import dotenv, { config } from "dotenv"
const { prisma } = require("@repo/database/client");
dotenv.config()
  
interface User{
    ws : WebSocket ,
    room : string[] ,
    userid :string
}
  
const users: User[] = [];

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
const decoded = jwt.verify(token  , secret ) as { userid: string };
if(!decoded || typeof decoded=="string" || !decoded.userid){
    ws.close()
    return
}
const userid = decoded.userid;

users.push({
   ws,
   room : [],
   userid
})
    ws.on('message' , async (data)=>{
     const Parsedata = JSON.parse(data as unknown as string  )
    
    if(Parsedata.type === "join_room"){
      const user = users.find(x => x.ws===ws)
      user?.room.push(Parsedata.roomid) 
    }

    if(Parsedata.type ==="leave_room"){
        const user = users.find(x=>x.ws===ws);
        if(!user){
            return
        }
        user.room = user?.room.filter(x=>x===Parsedata.room)
    }
    if(Parsedata.type==='chat'){
        const roomid =Parsedata.roomid;
        const message = Parsedata.message
       try{
        await prisma.chat.create({
            data : {
            message : message ,
            userId : userid ,
            roomId : roomid   
            }
        })}catch(e){console.log(e)}
        
        users.forEach(user => {
            if(user.room.includes(roomid)){
                user.ws.send(JSON.stringify({
                    type :"chat" ,
                    message :message ,
                    roomid
                }))
            }
        });
    }
    })
        


    ws.send('something')
      
})