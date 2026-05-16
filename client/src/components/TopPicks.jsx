import React, { useState, useEffect } from 'react'
import Title from './Title'
import Item from './Item'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { useAppContext } from '../context/AppContext'

const TopPicks = () => {
  const {cars, searchedCities} = useAppContext()
  const [topPicks, setTopPicks] = useState([])
  console.log("TopPicks rendering", cars.length, searchedCities) 

  useEffect(() => {
    const data = cars.filter((car) => 
        searchedCities.some(city => 
            city.toLowerCase() === car.city.toLowerCase()
        )
    )
    setTopPicks(data)
  }, [cars, searchedCities])

  return topPicks.length > 0 &&  (
    <section className='max-padd-container py-16 xl:py-22'>
      <Title
        title1={"Les meilleurs choix pour vous"}
        title2={"Populaire dans votre région"}
        titleStyles={"mb-10"}
      />

      {/* CARROUSEL */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          600: { slidesPerView: 2, spaceBetween: 30 },
          1124: { slidesPerView: 3, spaceBetween: 30 },
          1300: { slidesPerView: 4, spaceBetween: 30 },
        }}
        modules={[Autoplay]}
        className="h-[488px] md:h-[533px] xl:h-[422px] mt-5"
      >
        {topPicks.slice(0, 6).map((car) => (
          <SwiperSlide key={car.id} className='w-full'>
            <Item car={car} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default TopPicks