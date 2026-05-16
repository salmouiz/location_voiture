import Booking from "../models/Booking.js";  // ✅ added .js
import Car from "../models/Car.js";
import Agency from "../models/Agency.js";    // ✅ fixed duplicate import and capital A
import Stripe from "stripe";
import transporter from "../config/nodemailer.js"

// INTERNAL HELPER
const checkBookingAvailability = async ({ car, pickUpDate, dropOffDate }) => {  // ✅ fixed typo
    try {
        const bookings = await Booking.findMany({  // ✅ findMany instead of find
            where: {
                car,
                pickUpDate: { lte: new Date(dropOffDate) },
                dropOffDate: { gte: new Date(pickUpDate) },
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
    console.log("🎯 bookingCreate hit!")
    console.log("User:", req.user)
    console.log("Body:", req.body)
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

        const booking = await Booking.create({          // ✅ lowercase create, wrapped in data:{}
            data: {
                user,
                car,
                agency: carData.agencyRef.id,  // ✅ id instead of _id
                pickUpDate: new Date(pickUpDate),
                dropOffDate: new Date(dropOffDate),
                totalPrice,
            }
        })

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.user.email,
            subject: "Car Booking",
            html:`
                <h2>Détails de votre réservation</h2>
                <p>Merci pour votre réservation ! Retrouvez ci-dessous les détails de votre réservation.</p>
                <ul>
                    <li><strong>Reservation ID:</strong>${booking.id}</li>
                    <li><strong>Nom de l'agence:</strong>${carData.agencyRef.name}</li>
                    <li><strong>Localisation:</strong>${carData.address}</li>
                    <li><strong>Date:</strong>${booking.pickUpDate.toDateString()}-${booking.dropOffDate.toDateString()}</li>
                    <li><strong>Prix:</strong>${process.env.CURRENCY ||"MAD"}${booking.totalPrice} Pour ${days}</li>
                </ul>
                <p>Nous avons hâte de vous accueillir prochainement.</p>
                <p>Besoin de modifier quelque chose ? Contactez-nous.</p>
            `
        }

        await transporter.sendMail(mailOptions)

        res.json({ success: true, message: "Booking Crée" })
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
export const markAsPaid = async (req, res) => {
    try {
        const { bookingId } = req.body
        await Booking.update({
            where: { id: bookingId },
            data: { isPaid: true }
        })
        res.json({ success: true, message: "Réservation marquée comme payée" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// STRIPE PAYMENT [POST "/stripe"]

export const bookingStripePayment = async (req, res) => {
    try {
        /*
        const {bookingId} = req.body
        const booking = await booking.findById(bookingId)
        const carData = await car.findById(booking.car).populate("agency")
        const totalPrice = booking.totalPrice
        const {origin} = req.headers

        const stripeInstance = new Stripe(process.env.)
        */
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}