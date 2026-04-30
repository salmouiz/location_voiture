import React from 'react'
import { Link } from 'react-router-dom'
import { list } from 'postcss'
import { NavLink } from 'react-router-dom'

const Navbar = ({setMenuOpened, containerStyles}) => {
  const navLinks =[
    {path: "/", title: "Accueil"},
    {path: "/listing", title: "Voitures"},
    {path: "/contact", title: "Contact"},
  ]
  return (
    <nav className={containerStyles}>
      {navLinks.map((link)=>(
        <NavLink onClick={()=>{setMenuOpened(false); scrollTo(0,0)}}
        key={link.title}
        to={link.path}
        className={({isActive})=>`${isActive? "active-link" :""} px-3 py-2 rounded-full uppercase text-sm font-bold ` }>
          {link.title}
          
        </NavLink>

      ))}
    </nav>
    
  )
}
export default Navbar