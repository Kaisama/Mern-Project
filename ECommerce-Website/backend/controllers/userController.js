import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userModel.js';
import bcrypt from "bcryptjs";
import createToken from '../utils/createToken.js';

// Controller function to create a new user
const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ error: "Please fill in all inputs" });
        return;
    }

    const userExists = await User.findOne({ email });
    
    if (userExists) {
        res.status(400).json({ error: "User already exists" });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });

    try {
        await newUser.save();
        createToken(res, newUser._id);

        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin
        });
    } catch (error) {
        res.status(400).json({ error: "Invalid user data" });
    }
});



// Controller function for user login
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (isPasswordValid) {
            createToken(res, existingUser._id);

            res.status(200).json({
                _id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            });
            return;
        }
    }

    res.status(401).json({ error: "Invalid email or password" });
});


// Controller function for user logout
const logoutCurrentUser = asyncHandler(async (req, res) => {
    res.clearCookie('jwt');
    res.status(200).json({ message: "Logged out successfully" });
});

// Controller function to get all users (accessible to admin only)
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

// Controller function to get current user's profile
const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email
        });
    } else {
        res.status(404).json({ error: "User not found" });
    }
});

const updateCurrentUserProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id)
    if(user){
        user.username=req.body.username || user.username;
        user.email=req.body.email || user.email;
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            user.password=hashedPassword
        }

        const updatedUser=await user.save()
        res.json({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })

    }else{
        res.status(404)
        throw new Error("User Not Found")
    }
})

const deleteUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        if (user.isAdmin) {
            res.status(400).json({ error: "Cannot delete the admin user" });
            return;
        }
        await User.deleteOne({ _id: user._id });
        res.json({ message: "User Deleted" });
    } else {
        res.status(404).json({ error: "User Not Found" });
    }
});

const getUserById=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id).select('password')

    if(user){
        res.json(user);
    }else{
        res.status(404).json({error:"User Not Found"})
    }
})

const updateUserById=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.params.id)
    if(user){
        user.username=req.body.username||user.username
        user.email=req.body.email || user.email
        user.isAdmin=Boolean(req.body.isAdmin)

        const updatedUser=await user.save()
        res.json({
            _id:updatedUser._id,
            username:updatedUser.username,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin

        })
    }else{
        res.status(404).json({error:"User Not Found"})
    }
})

export { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile,updateCurrentUserProfile,deleteUserById,getUserById,updateUserById };
