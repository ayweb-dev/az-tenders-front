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
      navigate("/userhome");
    }
  }, [navigate]);

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
      <footer className="bg-gray-900 mt-40 font-Poppins text-center md:text-right w-full">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex  md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="./" className="flex items-center">
                <img
                  src={logoPrimary}
                  className="h-10 md:h-14 lg:h-20 me-6"
                  alt="AZ Tenders Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  AZ Tenders
                </span>
              </a>
            </div>
            <div className="">
              <ul className="flex mt-4 space-x-4">
                {/* Facebook */}
                <li className=" h-10 w-10 flex items-center justify-center shrink-0">
                  <a href="#">
                    <FaFacebookSquare size={30} color="#40CB56" />
                  </a>
                </li>

                {/* LinkedIn */}
                <li className=" h-10 w-10 flex items-center justify-center shrink-0">
                  <a href="#">
                    <FaLinkedin size={30} color="#40CB56" />
                  </a>
                </li>

                {/* Instagram */}
                <li className=" h-10 w-10  flex items-center justify-center shrink-0 overflow-hidden">
                  <a href="#">
                    <FaInstagramSquare size={30} color="#40CB56" />
                  </a>
                </li>
              </ul>
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
            <div className="flex  justify-center items-center mt-0">
              {/* Facebook */}
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <FaFacebookSquare className="w-4 h-4" />
                <span className="sr-only">Facebook page</span>
              </a>
              {/* Twitter */}
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <BsTwitterX className="w-4 h-4" />
                <span className="sr-only">Twitter page</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <FaInstagramSquare className="w-4 h-4" />
                <span className="sr-only">Instagram page</span>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
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
