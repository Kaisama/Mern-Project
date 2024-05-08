import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import asyncHandler from './asyncHandler.js'


const authenticate = asyncHandler(async (req, res, next) => {
    try {
        // read JWT from 'jwt' cookie
        let token;
        token = req.cookies.jwt;

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } else {
            res.status(401);
            throw new Error("Not authorized, token not found");
        }
    } catch (error) {
        if (error instanceof SyntaxError) {
            res.status(400).json({ error: "Invalid JSON data" });
        } else {
            res.status(401).json({ error: "Not authorized, token failed" });
        }
    }
});
 

//check for the admin

const authorizeAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401).send('not authorized')
    }
}

export {authenticate,authorizeAdmin}