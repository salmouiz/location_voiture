//import prisma from "../models/User.js";
//import { prisma } from "../config/lib/prisma.js";
import { Webhook } from "svix";
import User from "../models/User.js";

const clerkWebhooks = async (req, res) => {
    console.log("🔔 Webhook hit!")
    try {
        // Creating a svix instance 
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)
        
        // Get headers 
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        }

        // Verifying Headers
        await whook.verify(JSON.stringify(req.body), headers)
        
        // Getting Data from request body 
        const { data, type } = req.body

        // Switch cases for different events
        switch (type) {
            case "user.created": {
                const userData = {
                    id: data.id,
                    email: data.email_addresses?.[0]?.email_address?? "no-email@test.com",
                    username: (data.first_name ?? "") + " " + (data.last_name ?? ""),
                    image: data.image_url ?? "",
                };
                await User.create({ data: userData })
                break;
            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses?.[0]?.email_address?? "no-email@test.com",
                    username: (data.first_name ?? "") + " " + (data.last_name ?? ""),
                    image: data.image_url ?? "",
                };
                await User.update({
                    where: { id: data.id },
                    data: userData
                })
                break;
            }
            case "user.deleted": {
                await User.delete({
                    where: { id: data.id }
                })
                break;
            }
            default:
                break;
        }
        res.json({ success: true, message: "Webhook Received" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

export default clerkWebhooks