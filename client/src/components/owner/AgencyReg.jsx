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
            event.preventDefault()

        } catch (error) {

        }

    }
    return (
        <div>
            <form onSubmit={onSubmitHandler}>
                {/* image - left side */}
                <img src={assets.agencyReg} alt="imageRegAgence" className='' />
                {/* input - right side */}
                <div>
                    <img src={assets.close} alt="" />
                    <h3>Enregistrez l'agence</h3>
                    <div>
                        <div>
                            <label htmlFor="name">Nom de l'agence</label>
                            <input type="text" placeholder='tapez ici ...' className=''/>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}


export default AgencyReg