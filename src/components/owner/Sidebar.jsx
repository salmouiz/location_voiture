import React, { useEffect, useState } from "react"
import { assets } from "../../assets/data"
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { UserButton, useUser } from "@clerk/clerk-react"

const Sidebar = () => {
    const navigate = useNavigate()
    const [isOwner, setIsOwner] = useState(true)
    const { user } = useUser()

    const navItems = [
        { path: "/owner", label: "Tableau de bord", icon: assets.dashboard },
        { path: "/owner/add-car", label: "Ajouter une voiture", icon: assets.carPlus },
        { path: "/owner/list-car", label: "Mes voitures", icon: assets.list },
    ]

    useEffect(() => {
        if (!isOwner) navigate('/')
    }, [isOwner, navigate])

    return (
        <div className="min-h-screen bg-white">

            {/* TOP HEADER */}
            <div className="bg-white px-6 py-3 flex items-center justify-between">
                <Link to="/" className="flex flex-col items-start">
                    <img src={assets.logoImg} alt="logo" className="h-9" />
                    <span className="text-textColor uppercase text-xs font-extrabold tracking-[6px] relative -top-1">
                        AysiCar
                    </span>
                </Link>
                <div className="flex items-center gap-3">
                    <UserButton
                        appearance={{
                            elements: {
                                userButtonAvatarBox: { width: "42px", height: "42px" },
                            },
                        }}
                    />
                    <span className="text-sm font-semibold text-gray-800 hidden sm:block">
                        {user?.firstName} {user?.lastName}
                    </span>
                </div>
            </div>

            {/* TABS NAVIGATION */}
            <div className="bg-white border-b px-6">
                <div className="flex gap-0">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            end={item.path === "/owner"}
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                                    isActive
                                        ? "border-solid text-solid"
                                        : "border-transparent text-gray-500 hover:text-gray-800"
                                }`
                            }
                        >
                            <img src={item.icon} alt={item.label} width={18} />
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </div>

            {/* PAGE CONTENT — pas de padding, pas de bg */}
            <div className="px-6 py-6">
                <Outlet />
            </div>
        </div>
    )
}

export default Sidebar