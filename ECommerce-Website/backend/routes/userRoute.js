import express from "express";
import { createUser, loginUser, logoutCurrentUser, getAllUsers, getCurrentUserProfile,updateCurrentUserProfile ,deleteUserById ,getUserById,updateUserById} from "../controllers/userController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for creating a new user
router.post('/register', createUser);

// Route for getting all users (only accessible to admin)
router.get('/', authenticate, authorizeAdmin, getAllUsers);

// Route for user login
router.post('/login', loginUser);

// Route for user logout
router.post("/logout", logoutCurrentUser);

// Route for getting and updating current user's profile
router.route('/profile').get(authenticate, getCurrentUserProfile).put(authenticate,updateCurrentUserProfile);

//ADMIN Routes
router.route('/:id').delete(authenticate,authorizeAdmin,deleteUserById).get(authenticate,authorizeAdmin,getUserById).put(authenticate,authorizeAdmin,updateUserById)

export default router
