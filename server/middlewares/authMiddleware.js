import User from "../models/User.js";

export const authUser = async (req, res, next) => {
    try {
        const { userId } = req.auth()
        console.log("UserId:", userId)
        if (!userId) {
            return res.json({ success: false, message: "Pas Authorisé" })
        }

        // ✅ findUnique instead of findById
        let user = await User.findUnique({ where: { id: userId } })
        if (!user) {
            return res.json({ success: false, message: "Pas Authorisé" })
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}