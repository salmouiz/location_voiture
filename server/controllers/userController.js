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
    console.log("🏙️ Store city hit!")
    try {
        const { recentSearchedCities } = req.body

        let cities = req.user.recentSearchedCities || []

        if(cities.length < 3){
            cities = [...cities, recentSearchedCities]
        }else{
            cities = [...cities.slice(1), recentSearchedCities]
        }

        await User.update({
            where: { id: req.user.id },
            data: { recentSearchedCities: cities }
        })

        res.json({ success: true, message: "Ville Ajouté" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}