import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/data'

const Footer = () => {
  return (
    
<footer class="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500">
    <div class="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
        <div class="md:max-w-96">
            <div className='flex flex-1'>
              <Link to={"/"}>
                <img src={assets.logoImg} alt="logoImg" width={88} className='h-7'/>
                <span className='text-textColor uppercase text-xs front-extrabold tracking-[6px] relative bottom-1'>AysiCar</span>
              </Link>
            </div>
            <p class="mt-6 text-sm">
                Trouvez une voiture fiable avec des prix transparents, des inspections vérifiées, des options flexibles de retrait et de livraison, ainsi qu'un service client disponible 24h/24 pour une expérience de location ou fluide.
            </p>
            <div class="flex gap-4">
              <img src={assets.facebook} alt="" />
              <img src={assets.instagram} alt="" />
              <img src={assets.twitter} alt="" />
              <img src={assets.linkedin} alt="" />
            </div>

        </div>
        <div class="flex-1 flex items-start md:justify-end gap-20">
            <div>
                <h2 class="font-semibold mb-5 text-gray-800">Company</h2>
                <ul class="text-sm space-y-2">
                    <li><a href="#">Home</a></li>
                    <li><a href="/About">About us</a></li>
                    <li><a href="#">Contact us</a></li>
                    <li><a href="#">Privacy policy</a></li>
                </ul>
            </div>
            <div>
                <h2 class="font-semibold mb-5 text-gray-800">Contactez-nous</h2>
                <div class="text-sm space-y-2">
                    <p>+1-212-456-7890</p>
                    <p>contact@example.com</p>
                </div>
            </div>
        </div>
    </div>
    <p class="pt-4 text-center text-xs md:text-sm pb-5">
        Copyright 2026 © <a>AYSICAR</a>. Tous droits réservés.
    </p>
</footer>
  )
}

export default Footer