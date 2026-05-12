import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/data'

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div className="md:max-w-96">
          <div className='flex flex-1'>
            <Link to={"/"}>
              <img src={assets.logoImg} alt="logoImg" width={88} className='h-7' />
              <span className='text-textColor uppercase text-xs font-extrabold tracking-[6px] relative bottom-1'>AysiCar</span>
            </Link>
          </div>
          <p className="mt-6 text-sm">
            Trouvez une voiture fiable avec des prix transparents, des inspections vérifiées, des options flexibles de retrait et de livraison, ainsi qu'un service client disponible 24h/24 pour une expérience de location fluide.
          </p>
          <div className="flex gap-4 mt-4">
            <img src={assets.facebook} alt="Facebook" />
            <img src={assets.instagram} alt="Instagram" />
            <img src={assets.twitter} alt="Twitter" />
            <img src={assets.linkedin} alt="LinkedIn" />
          </div>
        </div>

        <div className="flex-1 flex items-start md:justify-end gap-20">
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Entreprise</h2>
            <ul className="text-sm space-y-2">
              <li><Link to="/">Accueil</Link></li>
              <li><Link to="/about">À propos</Link></li>
              <li><Link to="/contact">Nous contacter</Link></li>
              <li><a href="#">Politique de confidentialité</a></li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold mb-5 text-gray-800">Contactez-nous</h2>
            <div className="text-sm space-y-2">
              <p>+212-600-000-000</p>
              <p>contact@aysicar.ma</p>
            </div>
          </div>
        </div>
      </div>
      <p className="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2026 © <span>AYSICAR</span>. Tous droits réservés.
      </p>
    </footer>
  )
}

export default Footer