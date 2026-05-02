import logoImg from "./logo.png";
import search from './search.svg'
import user from './user.svg'
import menu from './menu.svg'
import close from './close.svg'
import bg from './bg.png'
import right from './right.svg'
import pin from './pin.svg'
import calendar from './calendar.svg'
import star from './star.svg'
import sliders from './sliders.svg'
import car from './car.svg'
import carBlack from './car-black.svg'
import carPlus from './car-plus.svg'
import transmission from './transmission.svg'
import seats from './seats.svg'
import fuelType from './fueltype.svg'
import odometer from './odometer.svg'
import facebook from './facebook.svg'
import instagram from './instagram.svg'
import twitter from './twitter.svg'
import linkedin from './linkedin.svg'
import mail from './mail.svg'
import phone from './phone.svg'
import house from './house.svg'
import dollar from './dollar.svg'
import pound from './pound.svg'
import map from './map.svg'
import list from './list.svg'
import dashboard from './dashboard.svg'
import userImg from './user.png'
import user1 from './user1.png'
import user2 from './user2.png'
import user3 from './user3.png'
import img1 from "../assets/img1.png"
import img2 from "../assets/img2.png"
import img3 from "../assets/img3.png"
import img4 from "../assets/img4.png"
import img5 from "../assets/img5.png"
import img6 from "../assets/img6.png"
import img7 from "../assets/img7.png"
import img8 from "../assets/img8.png"
import img9 from "../assets/img9.png"
import img10 from "../assets/img10.png"
import img11 from "../assets/img11.png"
import cImg2 from "../assets/cImg2.png"
import cImg3 from "../assets/cImg3.png"
import cImg4 from "../assets/cImg4.png"
import about1 from "../assets/about1.png";
import about2 from "../assets/about2.png";
import banner from "../assets/banner.png";
import agencyReg from "../assets/agencyReg.png";
import uploadIcon from "../assets/upload_icon.png";

export const assets = {
    logoImg,
    search,
    user,
    menu,
    close,
    bg,
    right,
    pin,
    calendar,
    star,
    sliders,
    odometer,
    transmission,
    seats,
    fuelType,
    car,
    carBlack,
    carPlus,
    facebook,
    instagram,
    twitter,
    linkedin,
    mail,
    phone,
    dollar,
    house,
    pound,
    map,
    dashboard,
    list,
    userImg,
    user1,
    user2,
    user3,
    about1,
    about2,
    banner,
    agencyReg,
    uploadIcon
}

export const cities = [
    "Casablanca",
    "Meknes",
    "Marrakech",
    "Tanger",
];


export const dummyAgentData = {
    "_id": "agent_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Fatima Zahra El Amrani",
    "image": userImg,
    "role": "agencyOwner", 
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": cities,
  }
  
  
  // Agency Dummy Data
  export const dummyAgencyData = {
    "_id": "67f7642a197ac559e4089b99",
    "name": "Fatima Motors",
    "contact": "0123456789",
    "email": "contact@Fatimamotors.com", 
    "address": "8 Derb Sidi Bouloukate Médina",
    "owner": dummyAgentData,
    "city": "Marrakech",
    "createdAt": "2025-04-12T10:45:30.000Z",
    "updatedAt": "2025-04-12T10:45:30.000Z",
    "__v": 0
}


// Cars Listings Dummy Data
export const dummyCars = [
  {
    "_id": "67f7647c197ac559e4089b96",
    "agency": dummyAgencyData,
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
    "images": [img1, cImg2, cImg3, cImg4],
    "isAvailable": true,
    "status": "disponible"
  },

  {
    "_id": "67f76452197ac559e4089b8e",
    "agency": dummyAgencyData,
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
    "images": [img2, cImg3, cImg4, cImg2],
    "isAvailable": true,
    "status": "disponible"
  },

  {
    "_id": "67f76406197ac559e4089b82",
    "agency": dummyAgencyData,
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
    "images": [img3, cImg4, cImg3, cImg2],
    "isAvailable": true,
    "status": "disponible"
  },

  {
    "_id": "67f763d8197ac559e4089b7a",
    "agency": dummyAgencyData,
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
    "images": [img4, cImg2, cImg3, cImg4],
    "isAvailable": true,
    "status": "disponible"
  },

  {
    "_id": "67f7663b197ac559e4089bb8",
    "agency": dummyAgencyData,
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
    "images": [img8, cImg2, cImg4, cImg3],
    "isAvailable": true,
    "status": "disponible"
  },

  {
    "_id": "67f765aa197ac559e4089b9c",
    "agency": dummyAgencyData,
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
    "images": [img5, cImg3, cImg2, cImg4],
    "isAvailable": true,
    "status": "disponible"
  },

  {
  "_id": "67f765f4197ac559e4089ba4",
  "agency": dummyAgencyData,
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
  "images": [img6, cImg2, cImg3, cImg4],
  "isAvailable": true,
  "status": "disponible"
},

{
  "_id": "67f7660a197ac559e4089bb0",
  "agency": dummyAgencyData,
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
  "images": [img7, cImg3, cImg4, cImg2],
  "isAvailable": true,
  "status": "disponible"
},

{
  "_id": "67f7666c197ac559e4089bc0",
  "agency": dummyAgencyData,
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
  "images": [img9, cImg3, cImg4, cImg2],
  "isAvailable": true,
  "status": "disponible"
},

{
  "_id": "67f7669d197ac559e4089bc8",
  "agency": dummyAgencyData,
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
  "images": [img10, cImg4, cImg3, cImg2],
  "isAvailable": true,
  "status": "disponible"
},

{
  "_id": "67f766cf197ac559e4089bd0",
  "agency": dummyAgencyData,
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
  "images": [img11, cImg3, cImg4, img2],
  "isAvailable": true,
  "status": "disponible"
}
];



// User Bookings Dummy Data
export const dummyBookingsData = [
  {
    "_id": "67f76839994a731e97d3b8ce",
    "user": dummyAgentData,
    "car": dummyCars[1],
    "agency": dummyAgencyData,
    "pickUpDate": "2025-04-30T00:00:00.000Z",
    "dropOffDate": "2025-05-01T00:00:00.000Z",
    "totalPrice": 6000,
    "status": "en attente",
    "paymentMethod": "Carte bancaire (Stripe)",
    "isPaid": false
  },
  {
    "_id": "67f76829994a731e97d3b8c3",
    "user": dummyAgentData,
    "car": dummyCars[0],
    "agency": dummyAgencyData,
    "pickUpDate": "2025-04-27T00:00:00.000Z",
    "dropOffDate": "2025-04-28T00:00:00.000Z",
    "totalPrice": 3000,
    "status": "en attente",
    "paymentMethod": "Paiement à la livraison",
    "isPaid": false
  },
  {
    "_id": "67f76810994a731e97d3b8b4",
    "user": dummyAgentData,
    "car": dummyCars[3],
    "agency": dummyAgencyData,
    "pickUpDate": "2025-04-11T00:00:00.000Z",
    "dropOffDate": "2025-04-12T00:00:00.000Z",
    "totalPrice": 4000,
    "status": "confirmée",
    "paymentMethod": "Paiement à la livraison",
    "isPaid": true
  }
];

// Dashboard Dummy Data
export const dummyDashboardData = {
  "totalBookings": 3,
  "totalRevenue": 13000,
  "bookings": dummyBookingsData
}