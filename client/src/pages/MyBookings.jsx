import React, {useEffect, useState} from 'react'
import { assets } from '../assets/data'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import toast from 'react-hot-toast'
import { useSearchParams } from 'react-router-dom'


const MyBookings = () => {
  const {currency, user, axios, getToken} = useAppContext()
  const [bookings, setBookings] = useState([])
  const [loadingPayment, setLoadingPayment] = useState(null)
  const [loadingCancel, setLoadingCancel] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  // Afficher un toast selon le retour Stripe
  useEffect(() => {
    const payment = searchParams.get('payment')
    if (payment === 'success') {
      toast.success('Paiement effectué avec succès !')
      setSearchParams({})
    } else if (payment === 'cancelled') {
      toast.error('Paiement annulé.')
      setSearchParams({})
    }
  }, [])

  const handleStripePayment = async (bookingId) => {
    try {
      setLoadingPayment(bookingId)
      const { data } = await axios.post(
        '/api/bookings/stripe',
        { bookingId },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )
      if (data.success) {
        window.location.href = data.url
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoadingPayment(null)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Confirmer l'annulation de cette réservation ?")) return
    try {
      setLoadingCancel(bookingId)
      console.log("Annulation bookingId:", bookingId)
      const { data } = await axios.post(
        '/api/bookings/cancel',
        { bookingId },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )
      console.log("Réponse annulation:", data)
      if (data.success) {
        toast.success(data.message)
        setBookings(prev => prev.filter(b => b.id !== bookingId))
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error("Erreur annulation:", error)
      toast.error(error.message)
    } finally {
      setLoadingCancel(null)
    }
  }

  const getUserBooking = async ()=>{
    try {
      const { data } = await axios.get('/api/bookings/user', {headers: {Authorization: `Bearer ${await getToken()}`}});
      console.log("Bookings data:", data)
      if(data.success){
        setBookings(data.bookings)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if(user){
      getUserBooking()
    }
  }, [user])

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/20'>

      {/* ===== HERO SECTION ===== */}
      <div className="relative bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm text-blue-300 text-xs font-semibold rounded-full mb-4 border border-white/20">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Mon espace
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Mes <span className="text-blue-400">réservations</span>
          </h1>
          <p className="text-lg text-slate-300 mt-2 max-w-xl">
            Consultez et gérez l'ensemble de vos locations de véhicules.
          </p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-12'>

        {/* Stats summary */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 -mt-24 relative z-20 mb-10">
          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{bookings.length}</div>
                <div className="text-sm text-gray-500 font-medium">Réservation{bookings.length > 1 ? 's' : ''}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">{bookings.filter(b=>b.isPaid).length}</div>
                <div className="text-sm text-gray-500 font-medium">Payée{bookings.filter(b=>b.isPaid).length > 1 ? 's' : ''}</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {currency}{bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 font-medium">Total dépensé</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings list */}
        <div className="space-y-6">
          {bookings?.filter(booking=>booking.carRef).length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-16 text-center">
              <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Aucune réservation</h3>
              <p className="text-gray-400 max-w-md mx-auto">Vous n'avez pas encore de réservation. Explorez notre catalogue pour trouver votre véhicule idéal.</p>
            </div>
          ) : (
            bookings?.filter(booking=>booking.carRef).map((booking)=>(
              <div key={booking.id} className='group bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden'>

                {/* Top accent bar */}
                <div className={`h-1 ${booking.isPaid ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-amber-500 to-orange-500'}`}></div>

                <div className="p-6 sm:p-8">
                  {/* car list */}
                  <div className='flex flex-col sm:flex-row gap-5 mb-6'>
                    <div className='w-full sm:w-48 h-32 rounded-2xl overflow-hidden bg-gray-100 shadow-sm shrink-0'>
                      <img 
                        src={booking.carRef?.images[0]} 
                        alt={booking.carRef?.title} 
                        className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' 
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='128'%3E%3Crect width='192' height='128' rx='16' fill='%23f1f5f9'/%3E%3Cpath d='M80 64h32M96 48v32' stroke='%23cbd5e1' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className='text-xl font-bold text-gray-900 capitalize line-clamp-1'>{booking.carRef?.title}</h3>
                        <span className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
                          booking.isPaid 
                            ? 'bg-green-50 text-green-700 border border-green-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${booking.isPaid ? 'bg-green-500' : 'bg-amber-500'}`}></span>
                          {booking.isPaid ? "Payé" : "En attente"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-gray-500 mb-3">
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{booking.carRef?.address}</span>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          <span className="text-sm font-medium text-gray-700">{booking.carRef?.seats} sièges</span>
                        </div>
                        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-lg">
                          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-sm font-bold text-blue-700">{currency}{booking.totalPrice?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-5"></div>

                  {/* Booking summary */}
                  <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4'>
                    <div className='flex flex-wrap gap-x-6 gap-y-2'>
                      <div className='flex items-center gap-2'>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">N° réservation</span>
                        <span className='text-sm font-mono text-gray-600 bg-gray-100 px-2 py-0.5 rounded'>#{booking.id?.slice(-6).toUpperCase()}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Prise en charge</span>
                          <span className='text-sm font-medium text-gray-800'>{new Date(booking.pickUpDate).toLocaleDateString('fr-FR', {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'})}</span>
                        </div>
                      </div>
                      <div className='flex items-center gap-2'>
                        <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Restitution</span>
                          <span className='text-sm font-medium text-gray-800'>{new Date(booking.dropOffDate).toLocaleDateString('fr-FR', {weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'})}</span>
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      {/* Bouton Payer en ligne — visible uniquement si non payé */}
                      {!booking.isPaid && (
                        <button
                          onClick={() => handleStripePayment(booking.id)}
                          disabled={loadingPayment === booking.id}
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                        >
                          {loadingPayment === booking.id ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          )}
                          {loadingPayment === booking.id ? 'Redirection...' : 'Payer en ligne'}
                        </button>
                      )}
                      {/* Bouton Annuler — visible uniquement si non payé */}
                      {!booking.isPaid && (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          disabled={loadingCancel === booking.id}
                          className="flex items-center gap-2 bg-red-50 hover:bg-red-100 disabled:opacity-60 disabled:cursor-not-allowed text-red-600 border border-red-200 text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                        >
                          {loadingCancel === booking.id ? (
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                            </svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          )}
                          {loadingCancel === booking.id ? 'Annulation...' : 'Annuler'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default MyBookings