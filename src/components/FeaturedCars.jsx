import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { assets, cities, dummyCars } from '../assets/data'
import Title from './Title'
import Item from './Item'

const FeaturedCars = () => {
  const [featured, setFeatured] = useState([])

useEffect(()=>{
  const data = dummyCars.filter((car) => cities.includes(car.city))
  setFeatured(data)
}, [dummyCars])

  return (
    <section>
      <Title 
        title1={"Votre prochaine voiture vous attend"}
        title2={"Roulez en toute simplicité"}
        titleStyles={"mb-10"}
      />
      <div className='flexBetween mt-8 mb-6'>
        <h5>
          <span className='font-bold'>Affichage de 1 à 6</span>
          sur 3 000 annonces
        </h5>
         <Link to={'/listing'} onClick={() =>scrollTo(0,0)}
         className='bg-solid text-white text-2xl rounded-md p-2 flexCenter'
         >
          <img src={assets.sliders} alt="" className='invert' />
         </Link>
      </div>
      {/* CONTAINER */}
      
    </section>
  )
}

export default FeaturedCars