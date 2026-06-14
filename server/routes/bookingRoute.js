import express from "express";
import { authUser } from "../middlewares/authMiddleware.js";  
import { 
    bookingStripePayment, 
    checkAvailability,      
    bookingCreate,          
    getUserBooking,        
    getAgencyBooking,
    markAsPaid,
    stripeWebhook,
    bookingPaypalPayment,
    capturePaypalPayment,
    cancelBooking
} from "../controllers/bookingController.js";  

const bookingRouter = express.Router()

// ⚠️ Webhook AVANT express.json() — Stripe exige le raw body
bookingRouter.post("/webhook", express.raw({ type: "application/json" }), stripeWebhook)

bookingRouter.post("/check-availability", checkAvailability)
bookingRouter.post("/book", authUser, bookingCreate)         
bookingRouter.get("/user", authUser, getUserBooking)         
bookingRouter.get("/agency", authUser, getAgencyBooking)     
bookingRouter.post("/stripe", authUser, bookingStripePayment) 
bookingRouter.post("/mark-paid", authUser, markAsPaid)
bookingRouter.post("/paypal", authUser, bookingPaypalPayment)
bookingRouter.post("/paypal/capture", authUser, capturePaypalPayment)
bookingRouter.post("/cancel", authUser, cancelBooking)

export default bookingRouter