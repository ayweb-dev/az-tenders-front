import React, { useEffect } from "react";
import { BsTwitterX } from "react-icons/bs";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logoPrimary from "../../assets/logoPrimary.png";
import NavbarUser from "../../components/NavbarUser";
import TenderList from "../../components/TenderList";

const UserHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Récupérer les paramètres d'URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      // Stocker le token dans localStorage
      localStorage.setItem("token", token);
      // Rediriger vers la page appropriée
      navigate("/userhome", { replace: true });
    }
  }, []);

  localStorage.removeItem("userToEdit");
  localStorage.removeItem("tenderToEdit");
  localStorage.removeItem("SubToEdit");
  localStorage.removeItem("adminToEdit");

  // Fonction pour appliquer les filtres aux données

  return (
    <div className="text-black min-h-screen dark:bg-darkColor">
      <NavbarUser />

      <div className="container">
        <div className="pt-5">
          <TenderList />
        </div>

        {/* FOOTER */}
      </div>
      <footer className="bg-gray-900 font-Poppins text-center md:text-right">
        <div className="mx-auto w-full max-w-screen-xl p-3 py-6 lg:py-8">
          <div className="md:flex  md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="./" className="flex items-center">
                <img
                  src={logoPrimary}
                  className="h-8 md:h-10 lg:h-15 me-6"
                  alt="AZ Tenders Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  AZ Tenders
                </span>
              </a>
            </div>
            <div>
            <small className="block text-white">Télephone</small>
              <a href="tel:+213791752266"
                    className="text-[#40CB56] text-sm ml-4 text-white"
                  >
                    
                    <strong>+213 791 75 22 66</strong>
                  </a>
                  <a
                    href="tel:+213663700766"
                    className="text-[#40CB56] text-sm ml-4 text-white"
                  >
                    <strong>+213 663 70 07 66</strong>
                  </a>
            </div>
            <div>
            <small className="block text-white">Email</small>
            <a
                    href="mailto:info@example.com"
                    className="text-[#40CB56] text-sm ml-4 text-white"
                  >
                    <strong>contact@az-tenders.com</strong>
                  </a>
            </div>
          </div>
          
          <div>
            <div className="md:flex md:justify-around md:items-center">
              <div className="mt-5">
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="">
                    <a href="#Slider" className="hover:underline">
                      Présentation
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="">
                    <a href="#About Us" className="hover:underline">
                      A propos
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="">
                    <a href="#Offres" className="hover:underline">
                      Offres
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="">
                    <a href="#Contact" className="hover:underline">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-900 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className=" text-center">
            <p className="text-sm text-gray-500 sm:text-center dark:text-gray-400 mb-3">
              © 2024{" "}
              <a href="./" className="hover:underline">
                AY Web™
              </a>
              . All Rights Reserved.
            </p>
            <div className="flex mt-4 justify-center items-center mt-0">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61563836030318"
                className="text-gray-500 hover:text-white 
 dark:hover:text-white"
              >
                <FaFacebookSquare className="w-4 h-4" />
                <span className="sr-only">Facebook page</span>
              </a>
              <a
                href="https://www.instagram.com/ayweb_officiel?igsh=cXV4MWduZmwwZ2Ny"
                className="text-gray-500 hover:text-white 
 dark:hover:text-white ms-5"
              >
                <FaInstagramSquare className="w-4 h-4" />
                <span className="sr-only">Instagram page</span>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="text-gray-500 hover:text-white 
 dark:hover:text-white ms-5"
              >
                <FaLinkedin className="w-4 h-4" />
                <span className="sr-only">LinkedIn page</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserHome;
