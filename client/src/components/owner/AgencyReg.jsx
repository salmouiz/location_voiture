import React, { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { assets, cities } from '../../assets/data';
import toast from 'react-hot-toast';


const AgencyReg = () => {
    const { setIsOwner, setShowAgencyReg, axios, getToken } = useAppContext()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")

    const onSubmitHandler = async (event) => {

        try {
            event.preventDefault();
            const { data } = await axios.post('/api/agencies', {name, email, address, contact, city}, {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            });
            if(data.success){
                toast.success(data.message);
                setIsOwner(true);
                setShowAgencyReg(false);
            }else{
                toast.error(data.message);
            }
        } catch(error){
            toast.error(error.message);
        }

    };
    return (
        <div onClick={()=>setShowAgencyReg(false)} className='fixed top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center bg-black/80'>
            <form onSubmit={onSubmitHandler} onClick={(e)=>e.stopPropagation()} onSubmit={onSubmitHandler} className='flexCenter bg-white rounded-xl max-w-4xl max-md:mx-2 text-sm relative'>
                <img src={assets.agencyReg} alt="imageRegAgence" className='w-1/2 rounded-l-xl hidden md:block' />
                <div className='flex flex-col md:w-1/2 p-8 md:p-10'>
                    <img onClick={()=>setShowAgencyReg(false)} src={assets.close} alt="" className='absolute top-4 right-4 h-6 w-6 p-1 cursor-pointer bg-solid/50 rounded-full shadow-md' />
                    <h3 className='mb-6'>Enregistrez l'agence</h3>
                    <div className='flex gap-2 xl:gap-3'>
                        <div> 
                            <label htmlFor="name" className='text-sm font-semibold'>Nom de l'agence</label>
                            <input onChange={(e) => setName(e.target.value)} value={name} id='name' type="text" placeholder='tapez ici ...' required className='border bg-primary border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none'/>
                        </div>
                        <div>
                            <label htmlFor="contact" className='text-sm font-semibold'>Contact</label>
                            <input onChange={(e) => setContact(e.target.value)} value={contact} id='contact' type="text" placeholder='tapez ici ...' required className='border bg-primary border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none'/>
                        </div>
                    </div>
                    <div className='w-full mt-4'>
                        <label htmlFor="email" className='text-sm font-semibold'>Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} id='email' type="email" placeholder='tapez ici ...' required className='border bg-primary border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none'/>
                    </div>
                    <div className='w-full mt-4'>
                        <label htmlFor="address" className='text-sm font-semibold'>Adresse</label>
                        <input onChange={(e) => setAddress(e.target.value)} value={address} id='address' type="text" placeholder='tapez ici ...' required className='border bg-primary border-slate-900/10 rounded-lg w-full px-3 py-1.5 mt-1 outline-none'/>
                    </div>
                    <div className='w-full mt-4 max-w-60 mr-auto'>
                        <label htmlFor="city" className='text-sm font-semibold'>Ville</label>
                        <select onChange={(e) => setCity(e.target.value)} value={city} id='city' required className='border bg-primary border-slate-900/10 rounded-lg w-full px-3 py-2.5 mt-1 outline-none'>
                            <option value="">Selectionnez la ville</option>
                            {cities.map((city)=>(
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <button type='submit' className='btn-solid py-2 rounded-lg w-32 mt-6'>
                        Enregistrer
                    </button>
                </div>
            </form>
        </div>
    )
}


export default AgencyReg