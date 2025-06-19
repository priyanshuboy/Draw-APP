import express from "express"
import z from 'zod'
import { genSaltSync, hashSync ,compareSync } from "bcrypt";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import middleware from "./middleware";

dotenv.config();

const app = express();
const secret = process.env.JWT_SECRET;

app.post('/signup' ,async (req,res)=>{
   
    const Userdetail = z.object({
        username : z.string().max(20).min(5),
        password : z.string().max(20).min(5)
    }) 
     
    const Parseuser = Userdetail.safeParse(req.body)
    if(!Parseuser.success){
        res.status(400).json({
            mgs : 'invalid details'
        })

        return
    }
      
   const { username ,password } = Parseuser.data;
   
  
    
    const salt = genSaltSync(10) ;
    const hashedpassword = hashSync(password,salt)

     

    res.status(201).json({
        mgs : 'user created'
    })

      
})


app.post('/signin' ,async (req,res)=>{
   
    const Userdetail = z.object({
        username : z.string().max(20).min(5),
        password : z.string().max(20).min(5)
    }) 
     
    const Parseuser = Userdetail.safeParse(req.body)
    if(!Parseuser.success){
        res.status(400).json({
            mgs : 'invalid details'
        })

        return
    }
      
   const { username , password } = Parseuser.data;
     
 
  
      
})

  app.post('/room' ,middleware , (req,res)=> {
  
          
       
    res.json({
        roomid : '123'
    })

  })


app.listen(5500, () => {
  console.log("Server is running on http://localhost:5500");
});
