import React, { useState } from 'react'
import { assets } from '../../assets/data'
import { useAppContext } from '../../context/AppContext'
import toast from "react-hot-toast"

const AddCar = () => {
    const {axios, getToken} = useAppContext()
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState({
        1: null,
        2: null,
        3: null,
        4: null
    });
    
    const [inputs, setInputs] = useState({
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
        fuelType: "",
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

    const bodyTypes = [
        "SUV",
        "Sedan",
        "Hatchback",
        "Coupe",
        "Convertible",
        "Van",
        "Grand Tourer",
    ]
    
    const Transmissions = ["Automatique", "Manuelle", "CVT", "Double embrayage"]
    const fuelTypes = ["Essence", "Diesel", "Électrique", "Hybride"]
    
    
    const onSubmitHandler = async (event)=>{
        event.preventDefault()

        if(
            !inputs.title ||
            !inputs.description ||
            !inputs.city ||
            !inputs.country ||
            !inputs.address ||
            !inputs.odometer ||
            !inputs.bodyType ||
            !inputs.priceRente ||
            !inputs.Transmissions ||
            !inputs.seats ||
            !inputs.fuelType
        ){
            toast.error("Veuillez remplir tous les champs obligatoires.")
            return
        }

        const hasImage = Object.values(images).some(img=> img !== null)
        if(!hasImage){
            toast.error("Veuillez télécharger au moins une image.")
            return
        }
        setLoading(true)

        try {
            const formData = new FormData()
            formData.append("title", inputs.title);
            formData.append("description", inputs.description);
            formData.append("city", inputs.city);
            formData.append("country", inputs.country);
            formData.append("address", inputs.address);
            formData.append("odometer", inputs.odometer);
            formData.append("bodyType", inputs.bodyType);
            formData.append("transmission", inputs.Transmissions);
            formData.append("seats", inputs.seats);
            formData.append("fuelType", inputs.fuelType);
            formData.append("price", inputs.priceRente ? Number(inputs.priceRente) : "")

            const features = Object.keys(inputs.features).filter(key=>inputs.features[key])
            formData.append("features", JSON.stringify(features))

            Object.keys(images).forEach((key)=>{
                images[key] && formData.append("images", images[key])
            })
            const { data } = await axios.post('/api/cars', formData, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            });

            if(data.success){
                toast.success(data.message)
                setInputs({
                    title: "",
                    description: "",
                    city: "",
                    country: "",
                    address: "",
                    odometer: "",
                    bodyTypes: "",
                    priceRente: "",
                    Transmissions: "",
                    seats: "",
                    fuelType: "",
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
                });
                setImages({1: null, 2: null, 3: null, 4: null})
            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false)
        }
    };
    
    return (
        <div className="md:px-8 py-6 xl:py-8 m-1.5 sm:m-3 h-[97vh overflow-y-scroll lg:w-11/12 bg-white shadow rounded-xl]">
            <form onSubmit={onSubmitHandler} className="flex flex-col gap-y-3.5 px-2 text-sm font-medium xl:max-w-3xl">
                <div className='w-full'>
                    <h5>Nom de la voiture</h5>
                    <input onChange={(e)=> setInputs({...inputs, title:e.target.value})} value={inputs.title} type="text" placeholder='tapez ici...' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full' />
                </div>
                <div className='w-full'>
                    <h5>Description de la voiture</h5>
                    <textarea onChange={(e)=> setInputs({...inputs, description:e.target.value})} value={inputs.description} rows={5} type="text" placeholder="Tapez ici..." className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full'></textarea>
                </div>
                <div className='flex gap-4'>
                    <div className='w-full'>
                        <h5>Ville</h5>
                        <input onChange={(e)=> setInputs({...inputs, city:e.target.value})} value={inputs.city} type="text" placeholder='Tapez ici...' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full' />
                    </div>
                    <div className='w-full'>
                        <h5>Pays</h5>
                        <input onChange={(e)=> setInputs({...inputs, country:e.target.value})} value={inputs.country} type="text" placeholder='Tapez ici...' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full' />
                    </div>
                    <div>
                        <h5>Type de la voiture</h5>
                        <select onChange={(e)=> setInputs({...inputs, bodyType:e.target.value})} value={inputs.bodyType} className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full'>
                            <option>Selectionnez un type</option>
                            {bodyTypes.map((bt)=> (
                                <option value={bt}>{bt}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className='flex gap-4 flex-wrap w-full'>
                    <div className='flex-[1]'>
                        <h5>Adresse</h5>
                        <input onChange={(e)=> setInputs({...inputs, address:e.target.value})} value={inputs.address} type="text" placeholder='Tapez ici...' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full' />
                    </div>
                    <div>
                        <h5>Odometre</h5>
                        <input onChange={(e)=> setInputs({...inputs, odometer:e.target.value})} value={inputs.odometer} type='number' placeholder='2500(km)'  className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full' />
                    </div>
                    <div>
                        <h5>Prix<span className='text-xs'>/jour</span></h5>
                        <input onChange={(e)=> setInputs({...inputs, priceRente:e.target.value})} value={inputs.priceRente} type="number" placeholder='99'  className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full' />
                    </div>
                    <div>
                        <h5>Transmission</h5>
                        <select onChange={(e)=> setInputs({...inputs, Transmissions:e.target.value})} value={inputs.Transmissions}  className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full'>
                            <option>Selectionnez un type</option>
                            {Transmissions.map((t)=> (
                                <option value={t}>{t}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h5>Sièges</h5>
                        <input onChange={(e)=> setInputs({...inputs, seats:e.target.value})} value={inputs.seats} type="number" placeholder='1' className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full' />
                    </div>
                    <div>
                        <h5>Type de carburant</h5>
                        <select onChange={(e)=> setInputs({...inputs, fuelType:e.target.value})} value={inputs.fuelType} className='px-3 py-1.5 ring-1 ring-slate-900/10 rounded-lg bg-primary mt-1 w-full'>
                            <option>Selectionnez le type</option>
                            {fuelTypes.map((f)=>(
                                <option value={f}>{f}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div>
                    <h5>Caractéristiques</h5>
                    <div className='flex gap-3 flex-wrap mt-1'>
                        {Object.keys(inputs.features).map((feature, index)=>(
                            <div key={index} className='flex gap-1'>
                                <input onChange={(e)=> setInputs({...inputs, features:{...inputs.features, [feature]: !inputs.features[feature]}})} value={inputs.features} id={`features[index + 1]`} type="checkbox" checked={inputs.features[feature]} />
                                <label htmlFor={`features${index + 1}`}>{feature}</label>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    {Object.keys(images).map((key)=>(
                        <label key={key} htmlFor={`carImages${key}`} className='ring-1 ring-slate-900/10 overflow-hidden rounded-lg'>
                            <input onChange={(e)=> setImages({...images, [key]:e.target.files[0]})} type="file" accept="image/*" id={`carImages${key}`} hidden />
                            <div className='h-12 w-24 bg-primary flexCenter'>
                                <img src={images[key] ? URL.createObjectURL(images[key]) : assets.uploadIcon} alt="uploadArea" className='overflow-hidden object-contain' />
                            </div>
                        </label>
                    ))}
                </div>
                <button type="submit" disabled={loading} className='btn-solid mt-3 max-w-36'>{loading ? "Ajout en cours" : "Ajoutez voiture"}</button>
            </form>

        </div>
    );
};

export default AddCar;