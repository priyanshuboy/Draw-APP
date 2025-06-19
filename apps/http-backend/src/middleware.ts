import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

export default function middleware(req: Request, res: Response, next: NextFunction) {
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

  (req as JwtPayload).userid = decoded.userid;
  return next();
  } catch (err) {
    res.status(403).json({ msg: "Unauthorized" });
  }
}