import React, { useState } from 'react'
import { assets } from '../../assets/data'
import { useUser } from "@clerk/clerk-react"

const AddCar = () => {
    const [loading, setLoading] = useState(false)
    const [dragActive, setDragActive] = useState(false)
    
    const bodyTypes = [
        "SUV",
        "Berline",
        "Compacte",
        "Coupé",
        "Cabriolet",
        "Monospace",
        "Grand Tourisme",
    ]
    
    const Transmissions = ["Automatique", "Manuelle", "CVT", "Double embrayage"]
    const fuelTypes = ["Essence", "Diesel", "Électrique", "Hybride"]
    
    const [image, setImage] = useState({
        1: null,
        2: null,
        3: null,
        4: null,
    })
    
    const [input, setInputs] = useState({
        title: "",
        description: "",
        city: "",
        country: "",
        address: "",
        odometer: "",
        bodyTypes: "",
        priceRente: "",
        priceSale: "",
        Transmissions: "",
        seats: "",
        fuelTypes: "",
        features: {
            "Caméra de recul": false,
            "Apple CarPlay": false,
            "Accès sans clé": false,
            "Régulateur adaptatif": false,
            "Sièges chauffants": false,
            "Toit ouvrant": false,
            "Aide au stationnement": false,
            "Régulateur de vitesse": false,
        },
    })
    
    const { user } = useUser()
    const currency = "DH"

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleFeatureChange = (feature) => {
        setInputs(prev => ({
            ...prev,
            features: {
                ...prev.features,
                [feature]: !prev.features[feature]
            }
        }))
    }

    const handleImageChange = (key, file) => {
        if (file && file.type.startsWith('image/')) {
            setImage(prev => ({ ...prev, [key]: file }))
        }
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e, key) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageChange(key, e.dataTransfer.files[0])
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        console.log("Formulaire soumis avec les données:", input)
        console.log("Images:", image)
        
        setTimeout(() => {
            setLoading(false)
            alert("Voiture ajoutée avec succès !")
            setInputs({
                title: "",
                description: "",
                city: "",
                country: "",
                address: "",
                odometer: "",
                bodyTypes: "",
                priceRente: "",
                priceSale: "",
                Transmissions: "",
                seats: "",
                fuelTypes: "",
                features: {
                    "Caméra de recul": false,
                    "Apple CarPlay": false,
                    "Accès sans clé": false,
                    "Régulateur adaptatif": false,
                    "Sièges chauffants": false,
                    "Toit ouvrant": false,
                    "Aide au stationnement": false,
                    "Régulateur de vitesse": false,
                },
            })
            setImage({ 1: null, 2: null, 3: null, 4: null })
        }, 1500)
    }

    const removeImage = (key) => {
        setImage(prev => ({ ...prev, [key]: null }))
    }

    // ═══════════════════════════════════════════════════════════
    // INPUTS CLAIRS — fond blanc pur, bordure très légère
    // ═══════════════════════════════════════════════════════════
    const inputClasses = "w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all duration-200 hover:border-gray-200 shadow-sm"
    
    const labelClasses = "block text-sm font-semibold text-gray-700 mb-2 tracking-wide"

    const selectClasses = "w-full px-4 py-3 bg-white border border-gray-100 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400/20 focus:border-blue-400 transition-all duration-200 hover:border-gray-200 cursor-pointer appearance-none shadow-sm"

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                
                {/* En-tête élégant */}
                <div className="mb-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg shadow-blue-500/20 mb-4">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Ajouter une voiture</h1>
                    <p className="mt-2 text-gray-400 text-sm">Remplissez les informations ci-dessous pour mettre votre véhicule en location</p>
                </div>

                {/* Carte principale */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    
                    {/* Barre décorative subtile */}
                    <div className="h-0.5 bg-gradient-to-r from-blue-400 to-blue-500"></div>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-8">
                        
                        {/* Section 1 : Informations générales */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-gray-800">Informations générales</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <label className={labelClasses}>Nom de la voiture</label>
                                    <input 
                                        type="text" 
                                        name="title"
                                        value={input.title}
                                        onChange={handleInputChange}
                                        placeholder="Ex: Mercedes-Benz Classe C 2023" 
                                        className={inputClasses}
                                    />
                                </div>

                                <div>
                                    <label className={labelClasses}>Description détaillée</label>
                                    <textarea 
                                        rows={4}
                                        name="description"
                                        value={input.description}
                                        onChange={handleInputChange}
                                        placeholder="Décrivez votre véhicule (état, options, historique...)" 
                                        className={`${inputClasses} resize-none`}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2 : Localisation */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-gray-800">Localisation</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                <div className="sm:col-span-2">
                                    <label className={labelClasses}>Adresse complète</label>
                                    <input 
                                        type="text" 
                                        name="address"
                                        value={input.address}
                                        onChange={handleInputChange}
                                        placeholder="123 Boulevard Mohammed VI" 
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Ville</label>
                                    <input 
                                        type="text" 
                                        name="city"
                                        value={input.city}
                                        onChange={handleInputChange}
                                        placeholder="Casablanca" 
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Pays</label>
                                    <input 
                                        type="text" 
                                        name="country"
                                        value={input.country}
                                        onChange={handleInputChange}
                                        placeholder="Maroc" 
                                        className={inputClasses}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3 : Caractéristiques techniques */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                                <div className="w-8 h-8 rounded-lg bg-violet-50 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-violet-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-gray-800">Caractéristiques techniques</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                <div>
                                    <label className={labelClasses}>Type de voiture</label>
                                    <div className="relative">
                                        <select 
                                            name="bodyTypes"
                                            value={input.bodyTypes}
                                            onChange={handleInputChange}
                                            className={selectClasses}
                                        >
                                            <option value="">Sélectionner un type</option>
                                            {bodyTypes.map((bt) => (
                                                <option key={bt} value={bt}>{bt}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClasses}>Boîte de vitesses</label>
                                    <div className="relative">
                                        <select 
                                            name="Transmissions"
                                            value={input.Transmissions}
                                            onChange={handleInputChange}
                                            className={selectClasses}
                                        >
                                            <option value="">Sélectionner</option>
                                            {Transmissions.map((t) => (
                                                <option key={t} value={t}>{t}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClasses}>Carburant</label>
                                    <div className="relative">
                                        <select 
                                            name="fuelTypes"
                                            value={input.fuelTypes}
                                            onChange={handleInputChange}
                                            className={selectClasses}
                                        >
                                            <option value="">Sélectionner</option>
                                            {fuelTypes.map((f) => (
                                                <option key={f} value={f}>{f}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClasses}>Kilométrage (km)</label>
                                    <input 
                                        type="number" 
                                        name="odometer"
                                        value={input.odometer}
                                        onChange={handleInputChange}
                                        placeholder="25 000" 
                                        className={inputClasses}
                                    />
                                </div>

                                <div>
                                    <label className={labelClasses}>Nombre de places</label>
                                    <input 
                                        type="number" 
                                        name="seats"
                                        value={input.seats}
                                        onChange={handleInputChange}
                                        placeholder="5" 
                                        className={inputClasses}
                                        min="1"
                                        max="9"
                                    />
                                </div>

                                <div>
                                    <label className={labelClasses}>Prix de location <span className="text-gray-300 font-normal">/jour</span></label>
                                    <div className="relative">
                                        <input 
                                            type="number" 
                                            name="priceRente"
                                            value={input.priceRente}
                                            onChange={handleInputChange}
                                            placeholder="500" 
                                            className={`${inputClasses} pr-12`}
                                        />
                                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 font-semibold text-sm">{currency}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Section 4 : Équipements */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                                <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-gray-800">Équipements & Options</h2>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {Object.keys(input.features).map((feature) => (
                                    <label 
                                        key={feature} 
                                        className={`relative flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                            input.features[feature] 
                                                ? 'border-blue-400 bg-blue-50/30 shadow-sm' 
                                                : 'border-gray-100 hover:border-gray-200 bg-white'
                                        }`}
                                    >
                                        <input 
                                            type="checkbox" 
                                            checked={input.features[feature]}
                                            onChange={() => handleFeatureChange(feature)}
                                            className="sr-only"
                                        />
                                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                                            input.features[feature]
                                                ? 'bg-blue-400 border-blue-400'
                                                : 'border-gray-200'
                                        }`}>
                                            {input.features[feature] && (
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>
                                        <span className={`text-sm font-medium ${input.features[feature] ? 'text-blue-700' : 'text-gray-500'}`}>
                                            {feature}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Section 5 : Photos */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-2 border-b border-gray-50">
                                <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h2 className="text-lg font-bold text-gray-800">Photos du véhicule</h2>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {Object.keys(image).map((key) => (
                                    <div key={key} className="relative group">
                                        <label 
                                            htmlFor={`carImages-${key}`}
                                            onDragEnter={(e) => handleDrag(e)}
                                            onDragLeave={(e) => handleDrag(e)}
                                            onDragOver={(e) => handleDrag(e)}
                                            onDrop={(e) => handleDrop(e, key)}
                                            className={`flex flex-col items-center justify-center w-full aspect-square rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 overflow-hidden ${
                                                dragActive 
                                                    ? 'border-blue-400 bg-blue-50' 
                                                    : image[key]
                                                        ? 'border-transparent'
                                                        : 'border-gray-100 hover:border-gray-200 bg-white'
                                            }`}
                                        >
                                            <input 
                                                onChange={(e) => handleImageChange(key, e.target.files[0])} 
                                                type="file" 
                                                accept="image/*" 
                                                id={`carImages-${key}`} 
                                                hidden 
                                            />
                                            
                                            {image[key] ? (
                                                <div className="relative w-full h-full">
                                                    <img 
                                                        src={URL.createObjectURL(image[key])} 
                                                        alt={`Photo ${key}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                                        <span className="text-white text-xs font-medium">Changer</span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 p-4 text-center">
                                                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </div>
                                                    <span className="text-xs text-gray-400 font-medium">Photo {key}</span>
                                                    <span className="text-[10px] text-gray-300">Glisser ou cliquer</span>
                                                </div>
                                            )}
                                        </label>
                                        
                                        {image[key] && (
                                            <button
                                                type="button"
                                                onClick={() => removeImage(key)}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-400 text-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-500"
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Bouton de soumission */}
                        <div className="pt-6 border-t border-gray-50">
                            <button 
                                type="submit" 
                                disabled={loading}
                                className={`w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white shadow-md shadow-blue-400/20 transition-all duration-300 flex items-center justify-center gap-3 mx-auto ${
                                    loading 
                                        ? 'bg-gray-300 cursor-not-allowed shadow-none' 
                                        : 'bg-blue-500 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-400/30 hover:-translate-y-0.5 active:translate-y-0'
                                }`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Ajout en cours...
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Ajouter la voiture
                                    </>
                                )}
                            </button>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-300 text-xs mt-8">
                    Les informations seront vérifiées avant publication
                </p>
            </div>
        </div>
    )
}

export default AddCar