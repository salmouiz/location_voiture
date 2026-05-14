import User from "../models/User.js";
import Agency from "../models/Agency.js";

// REGISTER A NEW AGENCY FOR THE LOGGED IN USER [POST "/agencies"]
export const agencyReg = async (req, res) => {
    try {
        const { name, email, address, contact, city } = req.body
        const owner = req.user.id  

        // check if user already has an agency registered
        const agency = await Agency.findFirst({ where: { owner } })  
        if (agency) {
            return res.json({ success: false, message: "Agence déjà enregistrée" })
        }

        await Agency.create({ data: { name, email, address, contact, city, owner } }) 
        await User.update({ 
            where: { id: owner },
            data: { role: "agencyOwner" }
        })

        res.json({ success: true, message: "Agence enregistrée avec succès" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}