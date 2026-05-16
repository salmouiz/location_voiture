import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import prisma from "./config/lib/prisma.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
    cloud_name: process.env.CLDN_NAME,
    api_key: process.env.CLDN_API_KEY,
    api_secret: process.env.CLDN_API_SECRET
});

const img1="img1.png"
const img2="img2.png"
const img3="img3.png"
const img4="img4.png"
const img5="img5.png"
const img6="img6.png"
const img7="img7.png"
const img8="img8.png"
const img9="img9.png"
const img10="img10.png"
const img11="img11.png"
const img12="img12.png"

const dummyCars = [
    {
        "_id": "67f7647c197ac559e4089b96",
        "title": "Porsche 911 Carrera",
        "description": "Coupé sportif deux portes avec excellente tenue de route, moteur puissant et intérieur haut de gamme.",
        "address": "45 Boulevard Allal El Fassi, Meknès, Maroc",
        "city": "Meknès",
        "country": "Maroc",
        "bodyType": "Coupe",
        "price": { "rent": 3000, "sale": 1200000 },
        "specs": {
          "transmission": "Manuelle",
          "seats": 2,
          "fuelType": "Essence"
        },
        "odometer": 12500,
        "features": ["Caméra de recul","Apple CarPlay","Accès sans clé","Régulateur adaptatif","Sièges chauffants","Toit ouvrant"],
        "images": [img1],
        "isAvailable": true,
        "status": "disponible"
      },
    
      {
        "_id": "67f76452197ac559e4089b8e",
        "title": "Lamborghini Urus",
        "description": "SUV de luxe avec transmission intégrale, intérieur spacieux et technologies modernes.",
        "address": "Avenue Mohammed V, Casablanca, Maroc",
        "city": "Casablanca",
        "country": "Maroc",
        "bodyType": "SUV",
        "price": { "rent": 6000, "sale": 3500000 },
        "specs": {
          "transmission": "Automatique",
          "seats": 5,
          "fuelType": "Essence"
        },
        "odometer": 46000,
        "features": ["Caméra de recul","Accès sans clé","Régulateur adaptatif","Toit ouvrant","Parking Assist"],
        "images": [img2],
        "isAvailable": true,
        "status": "disponible"
      },
    
      {
        "_id": "67f76406197ac559e4089b82",
        "title": "Audi RS3 Sportback",
        "description": "Voiture compacte idéale pour la ville avec conduite agile et consommation maîtrisée.",
        "address": "Rue Ibn Sina, Guéliz, Marrakech, Maroc",
        "city": "Marrakech",
        "country": "Maroc",
        "bodyType": "Hatchback",
        "price": { "rent": 1500, "sale": 550000 },
        "specs": {
          "transmission": "Manuelle",
          "seats": 5,
          "fuelType": "Diesel"
        },
        "odometer": 18500,
        "features": ["Apple CarPlay","Accès sans clé","Régulateur adaptatif","Sièges chauffants","Parking Assist"],
        "images": [img3],
        "isAvailable": true,
        "status": "disponible"
      },
    
      {
        "_id": "67f763d8197ac559e4089b7a",
        "title": "Mercedes-Benz S 500",
        "description": "Berline de luxe offrant confort, sécurité avancée et technologie moderne.",
        "address": "Boulevard Mohammed VI, Tanger, Maroc",
        "city": "Tanger",
        "country": "Maroc",
        "bodyType": "Sedan",
        "price": { "rent": 4000, "sale": 1300000 },
        "specs": {
          "transmission": "Automatique",
          "seats": 5,
          "fuelType": "Hybride"
        },
        "odometer": 29500,
        "features": ["Adaptive Cruise","Sièges chauffants","Toit ouvrant","Parking Assist"],
        "images": [img4],
        "isAvailable": true,
        "status": "disponible"
      },
    
      {
        "_id": "67f7663b197ac559e4089bb8",
        "title": "Porsche Taycan Turbo S",
        "description": "Berline électrique performante avec accélération rapide et intérieur luxueux.",
        "address": "Quartier Anfa, Casablanca, Maroc",
        "city": "Casablanca",
        "country": "Maroc",
        "bodyType": "Sedan",
        "price": { "rent": 5000, "sale": 1800000 },
        "specs": {
          "transmission": "Automatique",
          "seats": 4,
          "fuelType": "Électrique"
        },
        "odometer": 12000,
        "features": ["Caméra de recul","Apple CarPlay","Accès sans clé","Toit ouvrant"],
        "images": [img8],
        "isAvailable": true,
        "status": "disponible"
      },
    
      {
        "_id": "67f765aa197ac559e4089b9c",
        "title": "Porsche 718 Boxster",
        "description": "Cabriolet élégant idéal pour les sorties et week-ends.",
        "address": "Ain Diab, Casablanca, Maroc",
        "city": "Casablanca",
        "country": "Maroc",
        "bodyType": "Convertible",
        "price": { "rent": 3500, "sale": 900000 },
        "specs": {
          "transmission": "Automatique",
          "seats": 2,
          "fuelType": "Essence"
        },
        "odometer": 22500,
        "features": ["Parking Assist","Cruise Control","Caméra de recul","Apple CarPlay"],
        "images": [img5],
        "isAvailable": true,
        "status": "disponible"
      },
    
      {
      "_id": "67f765f4197ac559e4089ba4",
      "title": "Mercedes-Benz Sprinter",
      "description": "Fourgon utilitaire idéal pour transport et livraison avec grand espace de chargement.",
      "address": "Zone industrielle Sidi Ghanem, Marrakech, Maroc",
      "city": "Marrakech",
      "country": "Maroc",
      "bodyType": "Van",
      "price": { "rent": 800, "sale": 300000 },
      "specs": {
        "transmission": "Manuelle",
        "seats": 3,
        "fuelType": "Diesel"
      },
      "odometer": 76000,
      "features": ["Rear Camera","Keyless Entry","Parking Assist"],
      "images": [img6],
      "isAvailable": true,
      "status": "disponible"
    },
    
    {
      "_id": "67f7660a197ac559e4089bb0",
      "title": "Lamborghini Huracán EVO",
      "description": "Supercar haute performance avec accélération impressionnante et design sportif.",
      "address": "Corniche, Tanger, Maroc",
      "city": "Tanger",
      "country": "Maroc",
      "bodyType": "Coupe",
      "price": { "rent": 12000, "sale": 3200000 },
      "specs": {
        "transmission": "Automatique",
        "seats": 2,
        "fuelType": "Essence"
      },
      "odometer": 8500,
      "features": ["Rear Camera","Adaptive Cruise","Heated Seats","Apple CarPlay"],
      "images": [img7],
      "isAvailable": true,
      "status": "disponible"
    },
    
    {
      "_id": "67f7666c197ac559e4089bc0",
      "title": "Ferrari F8 Tributo",
      "description": "Supercar avec moteur V8 puissant et expérience de conduite exceptionnelle.",
      "address": "Boulevard Zerktouni, Casablanca, Maroc",
      "city": "Casablanca",
      "country": "Maroc",
      "bodyType": "Coupe",
      "price": { "rent": 14000, "sale": 4000000 },
      "specs": {
        "transmission": "Automatique",
        "seats": 2,
        "fuelType": "Essence"
      },
      "odometer": 7000,
      "features": ["Rear Camera","Parking Assist","Adaptive Cruise","Apple CarPlay"],
      "images": [img9],
      "isAvailable": true,
      "status": "disponible"
    },
    
    {
      "_id": "67f7669d197ac559e4089bc8",
      "title": "McLaren 720S",
      "description": "Supercar légère avec performance extrême et design aérodynamique.",
      "address": "Agdal, Rabat, Maroc",
      "city": "Rabat",
      "country": "Maroc",
      "bodyType": "Coupe",
      "price": { "rent": 13000, "sale": 3500000 },
      "specs": {
        "transmission": "Automatique",
        "seats": 2,
        "fuelType": "Essence"
      },
      "odometer": 6200,
      "features": ["Rear Camera","Apple CarPlay","Adaptive Cruise"],
      "images": [img10],
      "isAvailable": true,
      "status": "disponible"
    },
    
    {
      "_id": "67f766cf197ac559e4089bd0",
      "title": "Aston Martin DB11",
      "description": "Voiture grand tourisme combinant luxe, confort et performance.",
      "address": "Hay Riad, Rabat, Maroc",
      "city": "Rabat",
      "country": "Maroc",
      "bodyType": "Grand Tourer",
      "price": { "rent": 6500, "sale": 2000000 },
      "specs": {
        "transmission": "Automatique",
        "seats": 4,
        "fuelType": "Hybride"
      },
      "odometer": 14000,
      "features": ["Rear Camera","Apple CarPlay","Heated Seats","Adaptive Cruise"],
      "images": [img11],
      "isAvailable": true,
      "status": "disponible"
    },

]

async function bulkUpload() {
    
    try {
        // 1. Get agency owner
        const owner = await prisma.user.findFirst({ where: { role: "agencyOwner" } })
        if (!owner) throw new Error("Pas de agencyOwner trouvé dans DB")

        // 2. Get agency owned by this user
        const agency = await prisma.agency.findFirst({ where: { owner: owner.id } })
        if (!agency) throw new Error("Pas d'agence trouvé pour cet owner")

        console.log(`Using Agency: ${agency.name} | owner: ${owner.username}`)

        for (const car of dummyCars) {
            const imagesUrl = await Promise.all(
                car.images.map(async (fileName) => {
                    const filePath = path.join(__dirname, "images", fileName)
                    const result = await cloudinary.uploader.upload(filePath)
                    return result.secure_url
                })
            )

            await prisma.car.create({
                data: {
                    agency: agency.id,
                    title: car.title,
                    description: car.description,
                    city: car.city,
                    country: car.country,
                    address: car.address,
                    odometer: car.odometer,
                    bodyType: car.bodyType,
                    price: car.price.rent,
                    transmission: car.specs.transmission,
                    seats: car.specs.seats,
                    fuelType: car.specs.fuelType, 
                    features: car.features,
                    images: imagesUrl,
                }
            })
            console.log(`Téléchargé: ${car.title}`)
        }
    } catch (error) {
        console.error("Erreur:", error.message || error)
    } finally {
        await prisma.$disconnect()
    }
}

bulkUpload()