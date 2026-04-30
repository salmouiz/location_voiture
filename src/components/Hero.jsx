import React from "react"

import {assets, cities} from "../assets/data";
const Hero =()=>{
    return(
         <section className="bg-primary">
            {/*CONTAINER*/}
            <div className="max-padd-container relative flex justify-end mx-auto flex-col gap-9 py-6 pt-32 z-10">
                {/*Content*/}
                <div className="flexCenter flex-col grap-y-6">
                    <div className="text-center max-w-5xl">
                        <h1 className="capitalize leading-tight">Découvrez <span className="bg-gradient-to-r from-solid to-white pl-1 rounded-md">Une gamme exclusive de voitures</span>  haut de gamme proposées dans des destinations captivantes.</h1>
                    </div>
                    {/*Search/Booking From*/}
                    
        <form className='bg-white text-gray-500 rounded-md md:rounded-full px-6 md:pl-12 py-4 flex flex-col md:flex-row gap-4 lg:gap-x-8 max-w-md md:max-w-4xl ring-1 ring-slate-900/5 relative'>

            <div className="flex flex-col w-full">
                <div className='flex items-center gap-2'>
                    <img src={assets.pin} alt="pinIcon" width={20} />
                    <label htmlFor="destinationInput">Destination</label>
                </div>
                <input list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none capitalize" placeholder="Type here" required />
                <datalist id="destinations">
                    {cities.map((city, index) =>(
                        <option value={city} key={index} />
                    ))}
                </datalist>
            </div>

            <div className="flex flex-col w-full">
                <div className='flex items-center gap-2'>
                    <img src={assets.calendar} alt="calenderIcon" width={20}></img>
                    <label htmlFor="pickUp">Retrait</label>
                </div>
                <input id="pickUp" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <div className="flex flex-col w-full">
                <div className='flex items-center gap-2'>
                    <img src={assets.calendar} alt="calenderIcon" width={20}></img>
                    <label htmlFor="dropOff">Retour</label>
                </div>
                <input id="dropOff" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
            </div>

            <button type="submit" className='flexCenter gap-1 rounded-md md:rounded-full bg-solid text-white py-2 md:py-5 px-8 my-auto max-md:w-full max-md:py-1 cursor-pointer' >
                <img src={assets.search} alt="" width={20} className="invert" />
                <span>Chercher</span>
            </button>
        </form>
                </div> 
                <div className="flexCenter">
                    <img src={assets.bg} alt="bgImg" className="w-full md:-w-[77%]" />
                    
                </div>    
            </div>
        </section>
);
};
export default Hero