import Booking from "../models/Booking.js";  // ✅ added .js
import Car from "../models/Car.js";
import Agency from "../models/Agency.js";    // ✅ fixed duplicate import and capital A
import Stripe from "stripe";

// INTERNAL HELPER
const checkBookingAvailability = async ({ car, pickUpDate, dropOffDate }) => {  // ✅ fixed typo
    try {
        const bookings = await Booking.findMany({  // ✅ findMany instead of find
            where: {
                car,
                pickUpDate: { lte: new Date(dropOffDate) },   // ✅ $lte → lte
                dropOffDate: { gte: new Date(pickUpDate) },   // ✅ $gte → gte
            }
        });
        const isAvailable = bookings.length === 0
        return isAvailable;
    } catch (error) {
        console.log(error.message)
    }
};

// TO CHECK CAR AVAILABILITY [POST "/check-availability"]
export const checkAvailability = async (req, res) => {  // ✅ fixed typo in name
    try {
        const { car, pickUpDate, dropOffDate } = req.body
        const isAvailable = await checkBookingAvailability({
            car,
            pickUpDate,
            dropOffDate,
        })
        res.json({ success: true, isAvailable })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
};

// CREATE A NEW BOOKING [POST "/book"]
export const bookingCreate = async (req, res) => {
    try {
        const { car, pickUpDate, dropOffDate } = req.body
        const user = req.user.id  // ✅ id instead of _id

        const isAvailable = await checkBookingAvailability({  // ✅ fixed function name
            car,
            pickUpDate,
            dropOffDate,
        })
        if (!isAvailable) {
            return res.json({ success: false, message: "Car is not available" })
        }

        // Get car data with agency
        const carData = await Car.findUnique({  // ✅ findUnique instead of findById
            where: { id: car },
            include: { agencyRef: true }        // ✅ include instead of populate
        })

        let totalPrice = carData.price  // ✅ flat field instead of carData.price.rent

        // Calculate totalPrice based on days
        const pickUp = new Date(pickUpDate)
        const dropOff = new Date(dropOffDate)
        const timeDiff = dropOff.getTime() - pickUp.getTime()
        const days = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)))
        totalPrice *= days

        await Booking.create({          // ✅ lowercase create, wrapped in data:{}
            data: {
                user,
                car,
                agency: carData.agencyRef.id,  // ✅ id instead of _id
                pickUpDate: new Date(pickUpDate),
                dropOffDate: new Date(dropOffDate),
                totalPrice,
            }
        })
        res.json({ success: true, message: "Booking Created" })
    } catch (error) {
        res.json({ success: false, message: error.message })  // ✅ fixed duplicate res.json
    }
}

// GET BOOKINGS OF CURRENT USER [GET "/user"]
export const getUserBooking = async (req, res) => {
    try {
        const user = req.user.id  // ✅ id instead of _id
        const bookings = await Booking.findMany({  // ✅ findMany instead of find
            where: { user },
            include: { carRef: true, agencyRef: true },  // ✅ include instead of populate
            orderBy: { createdAt: "desc" }               // ✅ orderBy instead of sort
        })
        res.json({ success: true, bookings })
    } catch (error) {
        res.json({ success: false, message: error.message })  // ✅ fixed success:true typo
    }
};

// GET BOOKINGS FOR AGENCY [GET "/agency"]
export const getAgencyBooking = async (req, res) => {
    try {
        const agency = await Agency.findFirst({
            where: { owner: req.auth().userId }
        })
        if (!agency) {
            return res.json({ success: false, message: "No agency found" })
        }
        const bookings = await Booking.findMany({
            where: { agency: agency.id },
            include: { carRef: true, agencyRef: true, userRef: true },
            orderBy: { createdAt: "desc" }
        })
        const totalBookings = bookings.length
        const totalRevenue = bookings.reduce((acc, b) => acc + (b.isPaid ? b.totalPrice : 0), 0)
        res.json({ success: true, dashboardData: { totalBookings, totalRevenue, bookings } })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// STRIPE PAYMENT [POST "/stripe"]
export const bookingStripePayment = async (req, res) => {
    try {

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}