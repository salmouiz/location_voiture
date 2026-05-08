import React, { useState } from 'react'
import { assets, dummyCars } from '../../assets/data'
import { useUser } from "@clerk/clerk-react"

const AddCar = () => {
    const [loading, setLoading] = useState(false)
    
    const bodyTypes = [
        "SUV",
        "Berline",
        "Citadine",
        "Coupé",
        "Cabriolet",
        "Van",
        "Grand Tourisme",
    ];
    
    const Transmissions = ["Automatique", "Manuelle", "CVT", "Double embrayage"];
    const fuelTypes = ["Essence", "Diesel", "Électrique", "Hybride"];
    
    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    })
    
    const [input, setInput] = useState({
        title: "",
        description: "",
        city: "",
        country: "",
        address: "",
        odometer: "",
        bodyType: "",
        priceRent: "",
        priceSale: "",
        transmission: "",
        seats: "",
        fuelType: "",
        features: {
            "Caméra de recul": false,
            "Apple CarPlay": false,
            "Entrée sans clé": false,
            "Régulateur adaptatif": false,
            "Sièges chauffants": false,
            sunroof: false,
            "Bluetooth": false,
        },
        agency: {
            name: "",
            contact: "",
            email: "",
        }
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name.includes("agency.")) {
            const field = name.split(".")[1];
            setInput(prev => ({ ...prev, agency: { ...prev.agency, [field]: value } }));
        } else {
            setInput(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleCheckboxChange = (feature) => {
        setInput(prev => ({
            ...prev,
            features: { ...prev.features, [feature]: !prev.features[feature] }
        }));
    };

    const handleImageChange = (key, file) => {
        setImages(prev => ({ ...prev, [key]: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Logique de soumission ici
        setLoading(false);
    };

    return (
        <div className='md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 bg-white shadow rounded-xl'>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h4 className="bold-22">Ajouter une voiture</h4>
                
                <div className="flex flex-col gap-2">
                    <p>Titre de l'annonce</p>
                    <input onChange={handleInputChange} value={input.title} name="title" type="text" placeholder="Ex: BMW M4 Competition 2023" className="input-light" required />
                </div>

                <div className="flex flex-col gap-2">
                    <p>Description de la voiture</p>
                    <textarea onChange={handleInputChange} value={input.description} name="description" rows="4" placeholder="Décrivez les options, l'état, etc." className="input-light resize-none" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <p>Ville</p>
                        <input onChange={handleInputChange} value={input.city} name="city" type="text" placeholder="Casablanca" className="input-light" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Kilométrage (km)</p>
                        <input onChange={handleInputChange} value={input.odometer} name="odometer" type="number" placeholder="25000" className="input-light" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Nombre de sièges</p>
                        <input onChange={handleInputChange} value={input.seats} name="seats" type="number" placeholder="5" className="input-light" required />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex flex-col gap-2">
                        <p>Type de carrosserie</p>
                        <select onChange={handleInputChange} value={input.bodyType} name="bodyType" className="input-light">
                            <option value="">Sélectionner</option>
                            {bodyTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Transmission</p>
                        <select onChange={handleInputChange} value={input.transmission} name="transmission" className="input-light">
                            <option value="">Sélectionner</option>
                            {Transmissions.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Carburant</p>
                        <select onChange={handleInputChange} value={input.fuelType} name="fuelType" className="input-light">
                            <option value="">Sélectionner</option>
                            {fuelTypes.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <p>Prix Location (Par jour)</p>
                        <input onChange={handleInputChange} value={input.priceRent} name="priceRent" type="number" placeholder="500" className="input-light" required />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Prix Vente (Optionnel)</p>
                        <input onChange={handleInputChange} value={input.priceSale} name="priceSale" type="number" placeholder="450000" className="input-light" />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p>Caractéristiques / Options</p>
                    <div className="flex flex-wrap gap-3">
                        {Object.keys(input.features).map(feature => (
                            <label key={feature} className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={input.features[feature]} onChange={() => handleCheckboxChange(feature)} />
                                <span className="text-sm capitalize">{feature}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p>Images du véhicule (4 max)</p>
                    <div className="flex gap-3">
                        {Object.keys(images).map((key) => (
                            <div key={key} className="flex gap-1">
                                <label htmlFor={`carImages-${key}`} className="ring-1 ring-slate-900/10 overflow-hidden rounded-lg cursor-pointer">
                                    <input onChange={(e) => handleImageChange(key, e.target.files[0])} type="file" accept="image/*" id={`carImages-${key}`} hidden />
                                    <div className="h-12 w-24 bg-primary flexCenter">
                                        <img src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadIcon} alt="upload" className="overflow-hidden object-contain" />
                                    </div>
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                
                <button type="submit" className="btn-solid mt-3 max-w-44">
                    {loading ? "Ajout en cours..." : "Ajouter la voiture"}
                </button>
            </form>
        </div>
    )
};

export default AddCar