import React from 'react'
import { assets } from '../assets/data'
import { useNavigate } from "react-router-dom"

const Banner = () => {
  const navigate = useNavigate()
  return (
    <section className='py-16 xl:py-24 bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 rounded-3xl shadow-2xl shadow-slate-900/20 overflow-hidden relative'>
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className='flex flex-col md:flex-row items-center relative z-10'>
            {/* LEFT SIDE - IMAGE */}
            <div className='flex-1 flex items-center justify-center p-8'>
              <img
                src={assets.banner}
                alt="bannerImg"
                className='w-full h-auto object-contain drop-shadow-2xl max-w-sm'
              />
            </div>

            {/* RIGHT SIDE - TEXT */}
            <div className='flex-1 text-white p-8 md:p-12 lg:pr-16'>
              <div className='flex flex-col gap-5'>
                {/* Label */}
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-blue-400"></div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    Location simplifiée
                  </span>
                </div>

                <h3 className='capitalize text-3xl md:text-4xl font-bold leading-tight'>
                  Louez en toute{' '}
                  <span className="text-blue-400">tranquillité</span>
                </h3>

                <p className='text-slate-300/90 leading-relaxed max-w-md'>
                  Trouvez votre prochain véhicule ou commencez à gagner de l'argent avec le vôtre en quelques minutes. Nous nous occupons de l'assurance, de la vérification des conducteurs et des paiements sécurisés.
                </p>

                <button
                  onClick={() => navigate("/listing")}
                  className='inline-flex items-center gap-2 px-6 py-3.5 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0 w-fit'
                >
                  Explorez les véhicules
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Banner