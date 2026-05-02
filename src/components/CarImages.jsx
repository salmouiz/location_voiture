import React, {useEffect, useState} from 'react'


const CarImages = ({car}) => {
    const [image, setImage] = useState(null)

    useEffect(()=>{
        if(car){
            setImage(car.images[0])
        }
    }, [car])

  return (
    <div className='flex flex-col gap-5'>
        {/* MAIN IMAGE */}
        <div className='bg-primary rounded-2xl overflow-hidden flexCenter w-full h-[244px] lg:h-[322px]'>
            <img src={image} alt="" loading='eager' className='max-w-full max-h-full object-contain' />
        </div>
        {/* THUMBNAILS GRID */}
        <div className='grid grid-cols-2 gap-5'>
            {car.images.map((item, index)=>(
                <button key={index} onClick={()=> setImage(item)} type='button' className={`bg-primary rounded-2xl overflow-hidden flexCenter w-full h-[111px] lg:h-[122px] transition-transform duration-400 ${item === image ? "border-8 border-solid/10 scale-[101%]" : "hover:scale-[101%]"}`}>
                    <img src={item} alt={`thumb-${index}`} className='max-w-full max-h-full object-contain' loading='lazy' />
                </button>
            ))}
        </div>
    </div>
  )
}

export default CarImages