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

const navLinks = [
  {
    id: 1,
    name: "Offres",
    link: "#Offres",
  },
  {
    id: 2,
    name: "A Propos",
    link: "#AboutUs",
  },
  {
    id: 3,
    name: "Contact",
    link: "#Contact",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isDarkmode, setIsDarkmode] = useState(false);
  const [isLogedIn, setisLogedIn] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    const updateTheme = () => {
      const theme = localStorage.getItem("theme") || "light";
      setIsDarkmode(theme === "dark");
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setisLogedIn(!!token);
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
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
        await axios.post("https://api.az-tenders.com/auth/logout");

        localStorage.removeItem("token");
        setisLogedIn(false);
        navigate("/");
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
      }
    }
  };

  return (
    <div id="NavBar" className="font-Cabin">
      <div className="container py-2">
        <div className="flex justify-between items-center text-primary dark:text-white dark:bg-transparent">
          <div className="flex items-center gap-3">
            <img
              src={isDarkmode ? logoPrimary : logoDark}
              alt="Logo"
              className="h-16 md:h-20 transition-all"
            />
            <p className="text-xl md:text-2xl">
              <span className="text-2xl md:text-4xl ">Tenders </span>
            </p>
          </div>

          <nav className="hidden md:block">
            <ul className="flex justify-center items-center">
              {navLinks.map(({ id, name, link }) => (
                <li key={id} className="py-4">
                  <a
                    href={link}
                    className="px-2 font-semibold transition-all duration-200 "
                  >
                    {name}
                  </a>
                </li>
              ))}
              {!isLogedIn ? (
                <>
                  <li className="py-4">
                    <Link
                      to="/signin"
                      className="p-2  font-semibold transition-all duration-200 dark:border-white"
                    >
                      Se Connecter
                    </Link>
                  </li>
                  <li className="py-4">
                    <Link
                      to="/signup"
                      className="mx-2 bg-darkColor dark:bg-lightColor text-slate-200 dark:text-black rounded-sm p-2 font-semibold transition-all duration-200 dark:border-white"
                    >
                      S'Inscrire
                    </Link>
                  </li>
                </>
              ) : (
                <li className="relative group">
                  <button className="p-2 font-semibold transition-all duration-200 dark:border-white hover:text-green-600">
                    <FaUserAlt className="inline mx-4" size={22} />
                  </button>
                  <ul className="absolute z-50 w-36 hidden group-hover:block bg-white dark:bg-gray-700 shadow-lg rounded-lg py-2">
                    <li>
                      <Link
                        to="/Profile"
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

              <Darkmode />
            </ul>
          </nav>

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

      <div
        className={`md:hidden flex flex-col items-center bg-gray-100 dark:bg-gray-500 dark:text-white overflow-hidden transition-navbar-max-height duration-500 ease-in-out ${
          showMenu ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col items-center w-full">
          {navLinks.map(({ id, name, link }) => (
            <li key={id} className="py-4 w-full text-center">
              <a
                href={link}
                className="w-full block py-2 transition-all duration-200 hover:text-second"
              >
                {name}
              </a>
            </li>
          ))}
          {isLogedIn ? (
            <>
              <li className="py-4 w-full text-center">
                <Link to="/profile" className="py-4 w-full text-center">
                  Profil
                </Link>
              </li>
              <li className="py-4 w-full text-center">
                <button onClick={handleLogout} className="">
                  <TbLogout2 className="inline pb-1" /> <span>Déconnecter</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="py-4">
                <Link
                  to="/signin"
                  className="p-2 font-semibold transition-all duration-200 dark:border-white"
                >
                  Se Connecter
                </Link>
              </li>
              <li className="py-4">
                <Link
                  to="/signup"
                  className="mx-2 p-2 font-semibold transition-all duration-200 dark:border-white"
                >
                  S'inscrire
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
