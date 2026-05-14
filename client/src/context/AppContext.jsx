import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast"; // ✅ Import manquant ajouté

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [searchedCities, setSearchedCities] = useState([]);
    const [showAgencyReg, setShowAgencyReg] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const { user } = useUser();
    const { getToken } = useAuth();

    const getUser = async () => { // ✅ getUser correctement fermée
        try {
            const { data } = await axios.get('/api/user', {
                headers: {
                    Authorization: `Bearer ${await getToken()}` // ✅ Backticks corrigés
                }
            });

            if (data.success) {
                setIsOwner(data.role === "agencyOwner");
                setSearchedCities(data.recentSearchedCities);
            } else {
                setTimeout(() => {
                    getUser();
                }, 6000);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }; // ✅ Fin de getUser ici (était mal placée avant)

    // ✅ useEffect sorti de getUser + dépendance [user] ajoutée
    useEffect(() => {
        if (user) {
            getUser();
        }
    }, [user]);

    // ✅ value et return sortis de getUser
    const value = {
        axios,
        user,
        getToken,
        currency,
        navigate,
        cars,
        setCars,
        searchedCities,
        setSearchedCities,
        showAgencyReg,
        setShowAgencyReg,
        isOwner,
        setIsOwner,
        searchQuery,
        setSearchQuery,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};