import React from 'react'
import {Route, Routes, useLocation} from "react-router-dom"
import Header from './components/Header'
import Home from './pages/Home'
import Listing from './pages/Listing'
import CarDetails from './pages/CarDetails'
import Blog from './pages/Blog'
import Contact from './pages/Contact'
import MyBookings from './pages/MyBookings'
import Footer from './components/Footer'

const App = () => {
  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/listing' element={<Listing />} />
        <Route path='/listing/:id' element={<CarDetails />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-bookings' element={<MyBookings />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App