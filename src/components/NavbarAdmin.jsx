import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { RxCross1 } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logoDark from "../assets/logoDark.png";
import logoPrimary from "../assets/logoPrimary.png";
import Darkmode from "./Darkmode";

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkmode, setIsDarkmode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    // Fonction pour mettre à jour l'état du thème en fonction de la classe "dark"
    const updateTheme = () => {
      const theme = localStorage.getItem("theme") || "light";
      setIsDarkmode(theme === "dark");
    };

    // Vérification initiale
    updateTheme();

    // Observer les changements du thème
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Nettoyage à la fin
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Vérification de l'état de connexion de l'utilisateur
    const checkAuth = () => {
      const token = localStorage.getItem("token"); // Par exemple, vous pouvez utiliser un token pour vérifier l'authentification
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    // Afficher l'alerte de confirmation
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous allez être déconnecté",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, déconnectez-moi!",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      try {
        // Envoyer la requête de déconnexion au serveur
        await axios.post("https://api.az-tenders/auth/logout");

        // Supprimer le token côté client
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        // Rafraîchir la page après l'alerte
        navigate("/userhome");
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
      }
    }
  };

  return (
    <div id="NavBar" className="bg-white dark:bg-darkColor">
      <div className="container py-1 md:py-1">
        <div className="flex justify-between items-center text-primary dark:text-white dark:bg-darkColor">
          {/* Section Logo */}
          <Link to="/admin">
            <div className="flex items-center gap-3">
              <img
                src={isDarkmode ? logoPrimary : logoDark}
                alt="Logo"
                className="h-20 md:h-16 transition-all"
              />
              <p className="text-xl md:text-2xl">
                <span className="font-bold text-2xl md:text-3xl ">
                  Tenders{" "}
                </span>
              </p>
            </div>
          </Link>

          {/* Section Menu Desktop */}
          <nav className="hidden md:block">
            <ul className="flex justify-center items-center">
              {isAuthenticated && (
                <li className="relative group">
                  <button className="p-2 font-semibold transition-all duration-200 dark:border-white hover:text-green-600">
                    <FaUserAlt className="inline mx-4" size={22} />
                  </button>
                  <ul className="absolute w-36 hidden group-hover:block bg-white dark:bg-gray-700 shadow-lg rounded-lg py-2">
                    <li>
                      <Link
                        to="/admin/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Profil
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-2 py-2 text-sm block text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        <TbLogout2 className="inline pb-1" />{" "}
                        <span>Déconnecter</span>
                      </button>
                    </li>
                  </ul>
                </li>
              )}
              {/* Dark Mode features */}
              <Darkmode />
            </ul>
          </nav>

          {/* Menu mobile */}
          <div className="md:hidden block">
            <div className="flex items-center gap-4">
              <Darkmode />
              {showMenu ? (
                <RxCross1
                  className="cursor-pointer"
                  size={30}
                  onClick={toggleMenu}
                />
              ) : (
                <IoMdMenu
                  className="cursor-pointer"
                  size={30}
                  onClick={toggleMenu}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`md:hidden flex flex-col items-center bg-gray-100 dark:bg-darkColor dark:text-white overflow-hidden transition-navbar-max-height duration-500 ease-in-out ${
          showMenu ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center w-full">
          <li className="py-4">
            <Link
              to="/signin"
              className="border-2 border-black rounded-lg p-2 font-semibold text-2xl md:text-2xl transition-all duration-200 dark:border-white"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarAdmin;
