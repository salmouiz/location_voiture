import User from "../models/User.js";

// GET USER PROFILE
export const getUserProfile = async (req, res) => {
    try {
        const role = req.user.role
        const recentSearchedCities = req.user.recentSearchedCities
        res.json({ success: true, role, recentSearchedCities })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// ADD RECENT SEARCH CITY
export const addRecentSearchCity = async (req, res) => {
    try {
        const { recentSearchedCities } = req.body

        // ✅ update instead of push/shift/save
        await User.update({
            where: { id: req.user.id },
            data: { recentSearchedCities }
        })

        res.json({ success: true, message: "Ville Ajouté" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}