import Booking from "../models/Booking.js";
import Stripe from "stripe"
import Car from "../models/Car.js";
import Agency from "../models/Agency.js";

import transporter from "../config/nodeMailer.js"
import paypal from "@paypal/checkout-server-sdk"

// PAYPAL CLIENT HELPER
const paypalClient = () => {
    const env = new paypal.core.SandboxEnvironment(
        process.env.PAYPAL_CLIENT_ID,
        process.env.PAYPAL_CLIENT_SECRET
    )
    return new paypal.core.PayPalHttpClient(env)
}

// INTERNAL HELPER
const checkBookingAvailability = async ({ car, pickUpDate, dropOffDate }) => {
    try {
        const bookings = await Booking.findMany({
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
export const checkAvailability = async (req, res) => {
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
        const user = req.user.id

        const isAvailable = await checkBookingAvailability({
            car,
            pickUpDate,
            dropOffDate,
        })
        if (!isAvailable) {
            return res.json({ success: false, message: "Car is not available" })
        }

        const carData = await Car.findUnique({
            where: { id: car },
            include: { agencyRef: true }
        })

        let totalPrice = carData.price

        const pickUp = new Date(pickUpDate)
        const dropOff = new Date(dropOffDate)
        const timeDiff = dropOff.getTime() - pickUp.getTime()
        const days = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)))
        totalPrice *= days

        const booking = await Booking.create({
            data: {
                user,
                car,
                agency: carData.agencyRef.id,
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
        res.json({ success: false, message: error.message })
    }
}

// GET BOOKINGS OF CURRENT USER [GET "/user"]
export const getUserBooking = async (req, res) => {
    try {
        const user = req.user.id
        const bookings = await Booking.findMany({
            where: { user },
            include: { carRef: true, agencyRef: true },
            orderBy: { createdAt: "desc" }
        })
        res.json({ success: true, bookings })
    } catch (error) {
        res.json({ success: false, message: error.message })
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

// ANNULER UNE RÉSERVATION [POST "/cancel"]
export const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.body
        const booking = await Booking.findUnique({ where: { id: bookingId } })

        if (!booking) return res.json({ success: false, message: "Réservation introuvable" })
        if (booking.isPaid) return res.json({ success: false, message: "Impossible d'annuler une réservation déjà payée" })

        await Booking.delete({ where: { id: bookingId } })

        res.json({ success: true, message: "Réservation annulée avec succès" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// STRIPE PAYMENT [POST "/stripe"] — redirige vers PayPal (Stripe non disponible au Maroc)
export const bookingStripePayment = async (req, res) => {
    try {
        const { bookingId } = req.body
        const booking = await Booking.findUnique({
            where: { id: bookingId },
            include: { carRef: true, agencyRef: true }
        })

        if (!booking) return res.json({ success: false, message: "Réservation introuvable" })
        if (booking.isPaid) return res.json({ success: false, message: "Réservation déjà payée" })

        // Convertir MAD → USD (1 USD ≈ 10 MAD)
        const amountUSD = (booking.totalPrice / 10).toFixed(2)

        const request = new paypal.orders.OrdersCreateRequest()
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [{
                custom_id: bookingId,
                amount: {
                    currency_code: "USD",
                    value: amountUSD
                },
                description: `Location : ${booking.carRef.title} — ${booking.agencyRef.name}`
            }],
            application_context: {
                return_url: `${req.headers.origin}/my-bookings?payment=success`,
                cancel_url: `${req.headers.origin}/my-bookings?payment=cancelled`,
                brand_name: "AYSICAR",
                user_action: "PAY_NOW"
            }
        })

        const order = await paypalClient().execute(request)

        // Récupérer l'URL d'approbation PayPal
        const approvalUrl = order.result.links.find(l => l.rel === "approve")?.href

        res.json({ success: true, url: approvalUrl })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// STRIPE WEBHOOK [POST "/webhook"]
export const stripeWebhook = async (req, res) => {
    const sig = req.headers["stripe-signature"]
    let event

    try {
        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if (event.type === "checkout.session.completed") {
        const session = event.data.object
        const bookingId = session.metadata.bookingId

        await Booking.update({
            where: { id: bookingId },
            data: { isPaid: true, paymentMethod: "Stripe" }
        })
    }

    res.json({ received: true })
}

// PAYPAL — CRÉER UNE COMMANDE [POST "/paypal"]
export const bookingPaypalPayment = async (req, res) => {
    try {
        const { bookingId } = req.body
        const booking = await Booking.findUnique({
            where: { id: bookingId },
            include: { carRef: true, agencyRef: true }
        })

        if (!booking) return res.json({ success: false, message: "Réservation introuvable" })
        if (booking.isPaid) return res.json({ success: false, message: "Réservation déjà payée" })

        // Convertir MAD → USD (1 USD ≈ 10 MAD)
        const amountUSD = (booking.totalPrice / 10).toFixed(2)

        const request = new paypal.orders.OrdersCreateRequest()
        request.requestBody({
            intent: "CAPTURE",
            purchase_units: [{
                custom_id: bookingId,
                amount: {
                    currency_code: "USD",
                    value: amountUSD
                },
                description: `Location : ${booking.carRef.title} — ${booking.agencyRef.name}`
            }],
            application_context: {
                return_url: `${req.headers.origin}/my-bookings?payment=success`,
                cancel_url: `${req.headers.origin}/my-bookings?payment=cancelled`,
                brand_name: "AYSICAR",
                user_action: "PAY_NOW"
            }
        })

        const order = await paypalClient().execute(request)
        const approvalUrl = order.result.links.find(l => l.rel === "approve")?.href

        res.json({ success: true, orderId: order.result.id, url: approvalUrl })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// PAYPAL — CAPTURER LE PAIEMENT [POST "/paypal/capture"]
export const capturePaypalPayment = async (req, res) => {
    try {
        const { orderId } = req.body

        const request = new paypal.orders.OrdersCaptureRequest(orderId)
        const capture = await paypalClient().execute(request)

        if (capture.result.status !== "COMPLETED") {
            return res.json({ success: false, message: "Paiement non complété" })
        }

        const bookingId = capture.result.purchase_units[0].custom_id

        await Booking.update({
            where: { id: bookingId },
            data: { isPaid: true, paymentMethod: "PayPal" }
        })

        res.json({ success: true, message: "Paiement PayPal confirmé" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}