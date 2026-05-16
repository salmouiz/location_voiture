import express from "express";
import { authUser } from "../middlewares/authMiddleware.js";  
import { 
    bookingStripePayment, 
    checkAvailability,      
    bookingCreate,          
    getUserBooking,        
    getAgencyBooking,
    markAsPaid     
} from "../controllers/bookingController.js";  

const bookingRouter = express.Router()

bookingRouter.post("/check-availability", checkAvailability)
bookingRouter.post("/book", authUser, bookingCreate)         
bookingRouter.get("/user", authUser, getUserBooking)         
bookingRouter.get("/agency", authUser, getAgencyBooking)     
bookingRouter.post("/stripe", authUser, bookingStripePayment) 
bookingRouter.post("/mark-paid", authUser, markAsPaid)

export default bookingRouter