import React, {useState, useMemo} from 'react'
import {useSearchParams} from "react-router-dom"
import Item from "../components/Item"
import { useAppContext } from '../context/AppContext'

const Listing = () => {
  const {cars, searchQuery, currency} = useAppContext()
  const [selectedFilters, setSelectedFilters] = useState({
    bodyType:[],
    priceRange: []
  })
  const [selectedSort, setSelectedSort] = useState("")
  const [currPage, setCurrPage] = useState(1)
  const itemsPerPage = 6

  const [searchParams] = useSearchParams()
  const heroDestination = (searchParams.get("destination") || "").toLowerCase().trim()

  const sortOptions = ["Pertinent", "Prix croissant", "Prix décroissant"];
  const bodyType = [
    "Coupe",
    "SUV",
    "Hatchback",
    "Sedan",
    "Convertible",
    "Van",
    "Grand tourer",
  ];

  const priceRange = [
    "0 à 2000",
    "2000 à 3000",
    "3000 à 5000",
    "5000 à 9900",
  ];

  const handleFilterChange = (checked, value, type)=>{
    setSelectedFilters((prev)=>{
      const updated = {...prev}
      if(checked){
        updated[type].push(value)
      }else{
        updated[type] = updated[type].filter(v=> v !== value)
      }
      return updated
    })
  }

  //sorting function
  const sortCars = (a,b)=>{
    if(selectedSort == "Prix croissant") return a.price - b.price;
    if(selectedSort == "Prix décroissant") return b.price - a.price;
    return 0;
  }

  //Price filtres
  const matchesPrice = (car)=>{
    if(selectedFilters.priceRange.length === 0) return true;
    return selectedFilters.priceRange.some((range)=>{
      const [min, max] = range.split(" à ").map(Number);
      return car.price >= min && car.price <= max
    })
  }

  //Type filter
  const matchesType = (car)=>{
    if(selectedFilters.bodyType.length === 0) return true;
    return selectedFilters.bodyType.includes(car.bodyType)
  }

  // Search Filter using header's searchQuery
  const matchesSearch = (car)=>{
    if(!searchQuery) return true;
    return(
      car.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.country.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  //hero destination filter (from hero form -> /listing?destination=...)
  const matchesHeroDestination = (car)=>{
    if(!heroDestination) return true;
    return (car.city || "").toLowerCase().includes(heroDestination)
  }

  //Filtered & sorted CARS
  const filteredCars = useMemo(()=>{
    return cars.filter((c)=>
      matchesType(c) &&
      matchesPrice(c) &&
      matchesSearch(c) &&
      matchesHeroDestination(c)
    ).sort(sortCars)
  }, [cars, selectedFilters, selectedSort, searchQuery, heroDestination])

  //handle pagination logic
  const getPaginatedCars = ()=>{
    const startIndex = (currPage -1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage
    return filteredCars.slice(startIndex, endIndex)
  }

  const totalPages = Math.ceil(filteredCars.length / itemsPerPage)

  return (
    <div className='bg-primary'>
      <div className='max-padd-container !px-0 mt-18 pb-16'>
        {/* CONTAINER */}
        <div className='flex flex-col sm:flex-row gap-6'>
          {/*FILTERS -LEFT SIDE*/}
          <div className='min-w-72 bg-white p-4 pl-6 lg:pl-12 rounded-r-xl my-4'>
            {/* SORT BY PRICE */}
            <div>
              <h5>Trier par</h5>
              <select value={selectedSort} onChange={(e)=>setSelectedSort(e.target.value)} className='bg-primary ring-1 ring-slate-900/10 outline-none text-gray-30 text-sm font-semibold text-gray-50 h-8 w-full rounded px-2'>
                {sortOptions.map((sort, index)=>(
                  <option key={index} value={sort}>{sort}</option>
                ))}
              </select>
            </div>
            {/* CAR TYPE */}
            <div className='p-5 mt-5 bg-primary rounded-xl'>
              <h5 className='mb-4'>Type de véhicule</h5>
                {bodyType.map((type)=>(
                  <label key={type} className={"flex gap-2 text-sm font-semibold text-gray-50 mb-1"}>
                    <input type="checkbox" checked={selectedFilters.bodyType.includes(type)} onChange={(e)=>handleFilterChange(e.target.checked, type, "bodyType")} />
                    {type}</label>
                ))}
            </div>
            {/* PRICE RANGE */}
            <div className='p-5 mt-5 bg-primary rounded-xl'>
              <h5 className='mb-4'>Prix</h5>
                {priceRange.map((price)=>(
                  <label key={price} className={"flex gap-2 text-sm font-semibold text-gray-50 mb-1"}>
                    <input type="checkbox" checked={selectedFilters.priceRange.includes(price)} onChange={(e)=>handleFilterChange(e.target.checked, price, "priceRange")} />
                    {currency}{price}</label>
                ))}
            </div>
          </div>
          {/*FILTERED CARS -RIGHT SIDE*/}
          <div className='max-sm:px-10 sm:pr-10 bg-white p-4 rounded-l-xl my-4'>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'> {/* ✅ Fix: lg-grid-cols-2 → lg:grid-cols-2 */}
              {getPaginatedCars().length > 0 ? (
                getPaginatedCars().map((car)=>(
                  <Item key={car.id} car={car} /> // ✅ Fix: key={car} → key={car.id}
                ))
              ) : (
                <p className="capitalize">Aucune voiture ne correspond aux filtres sélectionnés.</p>
              )}
            </div>
            {/* PAGINATION */}
            <div className='flexCenter flex flex-wrap mt-14 mb-10 gap-3'>
              <button disabled={currPage === 1} onClick={()=>setCurrPage(prev=>prev-1)} className={`btn-solid !py-1 !px-3 ${currPage === 1 && "opacity-50 cursor-not-allowed"}`}>Précédent</button>
              {Array.from({length: totalPages}, (_ , index)=>(
                <button key={index + 1} onClick={()=>setCurrPage(index + 1)} className={`btn-outline h-8 w-8 p-0 flexCenter ${currPage===index+1 && "btn-light"}`}>{index+1}</button>
              ))}
              <button disabled={currPage === totalPages} onClick={()=>setCurrPage(prev=>prev+1)} className={`btn-solid !py-1 !px-3 ${currPage === totalPages && "opacity-50 cursor-not-allowed"}`}>Suivant</button>
            </div>      
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listing