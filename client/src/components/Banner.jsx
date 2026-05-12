import React from 'react'
import { assets } from '../assets/data'
import {useNavigate} from "react-router-dom"

const Banner = () => {

  const navigate = useNavigate()
  return (
    <section className='max-padd-container py-10'>
      <div className='max-padd-container bg-solid rounded-3xl xl:max-h-72'>
        <div className='flex flex-col md:flex-row'>
          {/* LEFT SIDE */}
          <div className='flex-[5] relative lg:bottom-12 xl:bottom-20'>
            <img src={assets.banner} alt="bannerImg" />
          </div>
          {/* RIGHT SIDE */}
          <div className='flex-[4] text-white'>
            <div className='flex flex-col gap-4 p-4'>
              <h3 className='capitalize xl:pt-6'>Louez en toute tranquillité</h3>
              <p className='text-white/70'>Trouvez votre prochain véhicule ou commencez à gagner de l'argent avec le vôtre en quelques minutes. Nous nous occupons de l’assurance, de la vérification des conducteurs et des paiements sécurisés.</p>
              <button onClick={()=>navigate("/listing")} className='btn-white w-36'>Explorez les véhicules</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Banner