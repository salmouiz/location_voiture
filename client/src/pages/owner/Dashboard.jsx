import React, { useEffect, useState } from 'react'
import { assets} from '../../assets/data'
import { useUser } from "@clerk/clerk-react"
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Dashboard = () => {
    const {axios, getToken, user, currency} = useAppContext()
    const [dashboardData, setDashboardData] = useState({
        bookings: [],
        totalBookings: 0,
        totalRevenue: 0,
    })
    const [totalCars, setTotalCars] = useState(0)
    const [error, setError] = useState(null)

    const getDashboardData = async() => {
        try {
            const { data } = await axios.get('/api/bookings/agency', {
                headers: {
                    Authorization: `Bearer ${await getToken()}`
                }
            });
            // Vérifies que les données existent
            if (data.success) {
                setDashboardData(data.dashboardData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    };

    const markBookingAsPaid = async (bookingId) => {
        try {
            const { data } = await axios.post('/api/bookings/mark-paid', { bookingId }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            })
            if (data.success) {
                toast.success(data.message)
                getDashboardData()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(user){
            getDashboardData();
        }

    }, [user])

    return (
        <div className='md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 bg-white shadow rounded-xl'>

            {/* STATS CARDS */}
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>

                {/* Gains totaux */}
                <div className='flex items-center gap-4 p-5 bg-primaryOne rounded-xl'>
                    <img src={assets.carBlack} alt="gains" className='hidden sm:block w-8 h-8' />
                    <div>
                        <h4 className="text-2xl font-bold">{dashboardData?.totalRevenue?.toLocaleString() || "00"}</h4>
                        <h5 className='text-solid text-sm'>Gains totaux</h5>
                    </div>
                </div>

                {/* Réservations */}
                <div className='flex items-center gap-4 p-5 bg-primaryTwo rounded-xl'>
                    <img src={assets.carBlack} alt="réservations" className='hidden sm:block w-8 h-8' />
                    <div>
                        <h4 className="text-2xl font-bold">{dashboardData?.totalBookings?.toLocaleString() || "00"}</h4>
                        <h5 className='text-solid text-sm'>Réservations</h5>
                    </div>
                </div>

                {/* Voitures listées */}
                <div className='flex items-center gap-4 p-5 bg-primary rounded-xl'>
                    <img src={assets.carBlack} alt="voitures" className='hidden sm:block w-8 h-8' />
                    <div>
                        <h4 className="text-2xl font-bold">{totalCars.toLocaleString()}</h4>
                        <h5 className='text-solid text-sm'>Voitures listées</h5>
                    </div>
                </div>
            </div>

            {/* BOOKINGS TABLE */}
            <div className='mt-6'>

                {/* Header */}
                <div className='hidden sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-solid text-white border-b border-slate-900/10 rounded-t-xl'>
                    <h5 className='hidden lg:block'>#</h5>
                    <h5>Voiture</h5>
                    <h5>Date de réservation</h5>
                    <h5>Montant</h5>
                    <h5>Statut</h5>
                </div>

                {/* Données */}
                {dashboardData.bookings.length === 0 ? (
                    <div className="px-6 py-8 text-center text-gray-400 border border-slate-900/10 rounded-b-xl">
                        Aucune réservation trouvée.
                    </div>
                ) : (
                    dashboardData.bookings.map((booking, index) => (
                        <div 
                            key={booking.id || index} 
                            className='flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_2fr_1fr_1fr] px-6 py-3 bg-primary text-gray-50 text-sm font-semibold border-b border-slate-900/10 gap-2'
                        >
                            <div className='hidden lg:block'>{index + 1}</div>
                            
                            <div className='flex items-center gap-x-2'>
                                <div className='overflow-hidden rounded-lg shrink-0'>
                                    <img
                                        src={booking?.carRef?.images?.[0]}
                                        alt={booking?.car?.title || "Voiture"}
                                        className='w-16 h-12 object-cover rounded-lg'
                                        onError={(e) => {
                                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='48'%3E%3Crect width='64' height='48' fill='%23ccc'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-size='10'%3ENo Image%3C/text%3E%3C/svg%3E";
                                        }}
                                    />
                                </div>
                                <div className='line-clamp-2'>{booking?.carRef?.title || "N/A"}</div>
                            </div>
                            
                            <div className="flex items-center text-xs">
                                {booking?.pickUpDate ? new Date(booking.pickUpDate).toLocaleDateString('fr-FR') : "N/A"} au{" "}
                                {booking?.dropOffDate ? new Date(booking.dropOffDate).toLocaleDateString('fr-FR') : "N/A"}
                            </div>
                            
                            <div className="flex items-center">
                                {currency}{booking?.totalPrice?.toLocaleString() || "0"}
                            </div>
                            
                            <div className="flex items-center">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    booking?.isPaid
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                }`}>
                                    {booking?.isPaid ? "Payé" : "Non Payé"}
                                </span>
                                {!booking?.isPaid && (
                                    <button
                                        onClick={() => markBookingAsPaid(booking.id)}
                                        className='px-2 py-1 bg-blue-500 text-white text-xs rounded-full'
                                    >
                                        Marquer payé
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Dashboard