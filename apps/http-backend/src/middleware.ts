import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


interface CustomRequest extends Request {
  userid?: string;
}

const secret = "PRIYANSHUKUSWHAH";

export default function middleware(req: CustomRequest, res: Response, next: NextFunction) {
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = req.headers["authorization"];

  if (!token) {
     res.status(401).json({ msg: "No token provided" });
     return
  }
  

  try {
    const decoded = jwt.verify(token, secret) as { userid: string };
    req.userid = decoded.userid;
    return next();
  } catch (err) {
     res.status(403).json({ msg: "Unauthorized" });
  }
  return
}
