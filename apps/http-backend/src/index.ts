import express from "express"
import z from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import middleware from "./middleware";
const { prisma } = require("@repo/database/client");
import { Request, Response } from "express";
import { json } from "zod/v4";

interface CustomRequest extends Request {
  userid?: string;
}


dotenv.config();

const app = express();
app.use(express.json())
const secret = process.env.JWT_SECRET;

app.post('/signup' ,async (req,res)=>{
   
const Userdetail = z.object({
    username: z.string().min(5).max(20),
    email: z.string().min(5).max(20).email(),
    password: z.string().min(5).max(20),
    avatar: z.string()
  });

  const parsedUser = Userdetail.safeParse(req.body);

  if (!parsedUser.success) {
    // Send back specific error messages for debugging
     res.status(400).json({
      msg: "Invalid details",
      issues: parsedUser.error.format()
    });
    return
  }
      
   const { username ,email,password,avatar } = parsedUser.data;
   
  const user = await prisma.user.findFirst({
  where: {
    email: email,
  }
});
 
if(user){
    res.status(409).json({
        mgs : "user already exists"
    })
    return
}

      
   
    const hashedpassword = await bcrypt.hash(password,10)

await prisma.user.create({

  data: {
    name: username,
    email: email,
    password: hashedpassword,
    photo : avatar
  },
});


    res.status(201).json({
        mgs : 'user created'
    })

     return 
})


app.post('/signin' ,async (req,res)=>{
   
    const Userdetail = z.object({
        email : z.string().max(20).min(5),
        password : z.string().max(20).min(5)
    }) 
     
    const Parseuser = Userdetail.safeParse(req.body)
    if(!Parseuser.success){
        res.status(400).json({
            mgs : 'invalid details'
        })

        return
    }
      
   const { email , password } = Parseuser.data;
     
   const user = await prisma.user.findFirst({
    where: {
    email: email,
  }
});

  
if(!user){
    res.status(404).json({
        mgs:"user do not exists"
    })
    return
}
const verify = await bcrypt.compare(password,user.password)
if(!verify){
    res.status(401).json({
        mgs : 'invalid creds'
    })
    return
}

if (!secret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

const token = jwt.sign(
  { email: user.email, userid: user.id }, 
  secret,
  { expiresIn: '1h' }
);

res.status(200).json({
    token : token,
    user : {
        email : email
    }
})
      
})



app.post('/room', middleware, async (req: CustomRequest, res: Response) => {
  const Userdetail = z.object({
    email: z.string().max(20).min(5),
    
  });

  const Parseuser = Userdetail.safeParse(req.body);
  if (!Parseuser.success) {
    res.status(400).json({ msg: "invalid creds" });
    return;
  }
  const {email} = Parseuser.data;

  const Check = await prisma.room.findFirst({
    where : {
      slug : email
    }
  });
  if(Check){
    res.status(409).json({
      mgs : 'room already exists'
    })
    return
  }
  const userid = req.userid; 
  const room = await prisma.room.create({
        data : {
          slug : email ,
          adminId : userid
        }
   })   
  res.json({ msg: `User ID is ${userid}`, room : room.id });
});

app.get('/chats/:roomid' , async (req,res)=>{
      
  const roomid = Number(req.params.roomid)

  const messages = await prisma.chat.findMany({
    where : {
      roomId : roomid
    } ,
    orderBy :{
   id : 'desc'
     } ,
     take :50

  })
    res.status(200).json({
      messages
    }) 

})

app.listen(5500, () => {
  console.log("Server is running on http://localhost:5500");
});
