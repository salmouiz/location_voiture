import React, { useEffect, useState } from "react";
import { dummyCars } from "../../assets/data";
import { useUser } from "@clerk/clerk-react";

const ListCar = () => {
    const [cars, setCars] = useState([]);
    const { user, isLoaded } = useUser();
    const currency = "$";

    const getCars = () => {
        if (dummyCars && Array.isArray(dummyCars)) {
            setCars(dummyCars);
        } else {
            console.error("dummyCars n'est pas un tableau:", dummyCars);
            setCars([]);
        }
    };

    useEffect(() => {
        // Charger les données même sans user pour le test
        getCars();
    }, []);

    if (!isLoaded) {
        return (
            <div className="md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] flex items-center justify-center bg-white shadow rounded-xl">
                <p className="text-gray-500">Chargement...</p>
            </div>
        );
    }

    return (
        <div className='md:px-8 py-6 xl:py-8 m-1 sm:m-3 h-[97vh] overflow-y-scroll lg:w-11/12 bg-white shadow rounded-xl'>
            <div className="mt-4">
                {/* Header */}
                <div className='hidden sm:grid grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr] px-6 py-3 bg-solid text-white border-b border-slate-900/10 rounded-t-xl'>
                    <h5 className='hidden lg:block'>#</h5>
                    <h5>Name</h5>
                    <h5>Address</h5>
                    <h5>Rent/Day</h5>
                    <h5>Sale Price</h5>
                    <h5>Available</h5>
                </div>

                {/* Liste des voitures */}
                {cars.length === 0 ? (
                    <div className="px-6 py-8 text-center text-gray-400">
                        Aucune voiture trouvée.
                    </div>
                ) : (
                    cars.map((car, index) => (
                        <div 
                            key={car._id || index} 
                            className='flex flex-col sm:grid sm:grid-cols-[0.5fr_2fr_2fr_1fr_1fr_1fr] px-6 py-3 bg-primary text-gray-50 text-sm font-semibold border-b border-slate-900/10 gap-2'
                        >
                            <div className='hidden lg:block'>{index + 1}</div>
                            
                            <div className='flex items-center gap-x-2'>
                                <div className='overflow-hidden rounded-lg shrink-0'>
                                    <img
                                        src={car?.images?.[0] || "/placeholder-car.png"}
                                        alt={car?.title || "Car"}
                                        className='w-16 h-12 object-cover rounded-lg'
                                        onError={(e) => {
                                            e.target.src = "/placeholder-car.png";
                                        }}
                                    />
                                </div>
                                <div className='line-clamp-2'>{car?.title || "Sans titre"}</div>
                            </div>
                            
                            <div className="flex items-center text-xs">
                                {car?.address || "N/A"}
                            </div>
                            
                            <div className="flex items-center">
                                {currency}{car?.price?.rent?.toLocaleString() || "0"}
                            </div>
                            
                            <div className="flex items-center">
                                {currency}{car?.price?.sale?.toLocaleString() || "0"}
                            </div>
                            
                            <div className="flex items-center">
                                <label className='relative inline-flex items-center cursor-pointer gap-3'>
                                    <input 
                                        type="checkbox" 
                                        className='sr-only peer' 
                                        defaultChecked={car?.isAvailable || false} 
                                    />
                                    <div className='w-10 h-6 bg-slate-300 rounded-full peer peer-checked:bg-green-500 transition-colors duration-200'></div>
                                    <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4' />
                                </label>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default ListCar;