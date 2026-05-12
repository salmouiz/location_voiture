import React from 'react'
import Title from './Title'
import { assets } from '../assets/data'

const About = () => {
  return (
    <section className='max-padd-container py-16 xl:py-28 !pt-36'>
      {/* CONTAINER */}
      <div className='flex items-center flex-col lg:flex-row gap-14'>
        {/* INFO - LEFT SIDE */}
        <div className='flex-[5]'>
            <Title 
            title1={"Votre partenaire immobilier de confiance"}
            title2={"Nous vous accompagnons à chaque étape"}
            paraStyles={"hidden"}
            />
            <p className='mb-10 mt-5'>Trouvez une voiture fiable avec des prix transparents, des inspections vérifiées, des options flexibles de retrait et de livraison, ainsi qu'un service client disponible 24h/24 et 7j/7 pour une expérience de location ou fluide.</p>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='p-4 rounded-xl bg-primary'>
                <h5>Service rapide</h5>
                <p className='text-sm mt-2'>Réservez en quelques secondes avec une confirmation immédiate et des options de retrait flexibles, pour prendre la route rapidement, sans attente ni complications.</p>
              </div>
              <div className='p-4 rounded-xl bg-primary'>
                <h5>Large choix de véhicules</h5>
                <p className='text-sm mt-2'>Choisissez parmi une gamme allant des modèles économiques aux voitures de luxe, régulièrement entretenus et vérifiés, pour des performances fiables et le véhicule idéal pour chaque trajet.</p>
              </div>
              <div className='p-4 rounded-xl bg-primary'>
                <h5>Tarification transparente</h5>
                <p className='text-sm mt-2'>Des tarifs clairs dès le départ, sans frais cachés, avec un détail précis des assurances et des options, pour un coût prévisible et facile à comprendre avant la réservation.</p>
              </div>
              <div className='p-4 rounded-xl bg-primary'>
                <h5>Assistance 24h/24</h5>
                <p className='text-sm mt-2'>Un service client disponible à tout moment par chat ou téléphone, pour résoudre rapidement les problèmes et vous accompagner dans vos modifications, prolongations ou besoins d'assistance routière.</p>
              </div>
            </div>
        </div>
        {/* IMAGE - RIGHT SIDE */}
        <div className='flex-[4] flex gap-7'>
          <div className='relative flex justify-end mb-8'>
            <img src={assets.about1} alt="aboutImg" className='rounded-2xl'/>
          </div>
          <div className='relative flex justify-end mt-8'>
            <img src={assets.about2} alt="aboutImg" className='rounded-2xl'/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About