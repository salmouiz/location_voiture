import React from 'react'
import { assets } from '../assets/data'
import Title from './Title'

const Testimonial = () => {
  return (
    <section className='max-padd-container py-16 xl:py-32'>
      <Title 
        title1={"Ce que disent nos utilisateurs"}
        title2={"Ne vous fiez pas seulement à notre parole."}
        titleStyles={"mb-10"}
        para={"Découvrez les avis de nos utilisateurs sur notre service. Nous cherchons constamment à nous améliorer. Si votre expérience a été positive, n'hésitez pas à laisser un avis."}
      />
      {/* CONTAINER */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
        <div className='bg-primary w-full space-y-4 p-3 rounded-md text-gray-500 text-sm'>
          <div className='flexBetween'>
            <div className='flex gap-1'>
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
            </div>
            <p>25 Avr 2026</p>
          </div>
          <p>Bonne expérience globale, la voiture était confortable et propre. Petit retard lors de la livraison, mais le personnel est resté aimable et arrangeant.</p>
          <div className='flex items-center gap-2'>
            <img src={assets.user1} alt="userImg" className='h-8 w-8 rounded-full' />
            <p className='text-gray-800 font-medium'>Sara Ait Ali</p>
          </div>
        </div>
        <div className='bg-primary w-full space-y-4 p-3 rounded-md text-gray-500 text-sm'>
          <div className='flexBetween'>
            <div className='flex gap-1'>
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
            </div>
            <p>27 Avr 2026</p>
          </div>
          <p>J'ai apprécié la simplicité de la réservation en ligne. Le service client est réactif et professionnel. Prix corrects pour une voiture en très bon état. Je relouerai sans hésiter.</p>
          <div className='flex items-center gap-2'>
            <img src={assets.user2} alt="userImg" className='h-8 w-8 rounded-full' />
            <p className='text-gray-800 font-medium'>Yassine Khatib</p>
          </div>
        </div>
        <div className='bg-primary w-full space-y-4 p-3 rounded-md text-gray-500 text-sm'>
          <div className='flexBetween'>
            <div className='flex gap-1'>
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
              <img src={assets.star} alt="" width={16} />
            </div>
            <p>3 mai 2026</p>
          </div>
          <p>Service excellent! J'ai loué une voiture pour un week-end à Casablanca et tout s'est très bien passé. La voiture était propre, récente et conforme à la description. La prise en charge a été rapide et sans complication. Je recommande fortement !</p>
          <div className='flex items-center gap-2'>
            <img src={assets.user3} alt="userImg" className='h-8 w-8 rounded-full' />
            <p className='text-gray-800 font-medium'>Mariam Boulahcen</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonial