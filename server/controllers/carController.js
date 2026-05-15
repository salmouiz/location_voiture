import { v2 as cloudinary } from "cloudinary"
import Agency from "../models/Agency.js"
import Car from "../models/Car.js"

// Create a new car [POST "/cars"]
export const addNewCar = async (req, res) => {
    try {
        const {
            title,
            description,
            city,
            country,
            address,
            odometer,
            bodyType,
            price,
            transmission,
            seats,
            fuelType,
            features,
        } = req.body;

        // ✅ findFirst instead of findOne
        const agency = await Agency.findFirst({ where: { owner: req.user.id } })
        console.log("Agency found:", agency)

        if (!agency) {
            return res.json({ success: false, message: "Agence pas trouvée" })
        }

        // Upload images to cloudinary
        const uploadImages = req.files.map(async (file) => {
            console.log("Uploading file:", file.path)
            try {
                const response = await cloudinary.uploader.upload(file.path)
                console.log("Upload success:", response.secure_url)
                return response.secure_url;
            } catch (err) {
                console.log("Upload error:", err.message)
                throw err
            }
        })

        const images = await Promise.all(uploadImages)

        await Car.create({
            data: {
                agency: agency.id,  
                title,
                description,
                city,
                country,
                address,
                odometer: +odometer,
                bodyType,
                price: +price,
                transmission,     
                seats: +seats,
                fuelType,
                features: JSON.parse(features),
                images,
            }
        });
        res.json({ success: true, message: "Voiture Ajouté" })
        
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
};

// GET ALL AVAILABLE CARS [GET "/cars"]
export const getAllAvailableCars = async (req, res) => {
    try {
        
        const cars = await Car.findMany({
            where: { isAvailable: true },
            include: {
                agencyRef: {
                    include: {
                        user: {
                            select: { image: true, email: true }
                        }
                    }
                }
            }
        })
        res.json({ success: true, cars })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// GET CARS OF THE LOGGED-IN AGENCY OWNER [GET "/owner"]
export const getOwnerCars = async (req, res) => {
    try {
        
        const agencyData = await Agency.findFirst({ where: { owner: req.auth().userId } })
        
        
        const cars = await Car.findMany({
            where: { agency: agencyData.id }, 
            include: { agencyRef: true }
        })
        res.json({ success: true, cars })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// TOGGLE AVAILABILITY STATUS OF A CAR [POST "/cars/toggle-availability"]
export const toggleCarAvailability = async (req, res) => {
    try {
        const { carId } = req.body

        const carData = await Car.findUnique({ where: { id: carId } })

        await Car.update({
            where: { id: carId },
            data: { isAvailable: !carData.isAvailable }
        })

        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
