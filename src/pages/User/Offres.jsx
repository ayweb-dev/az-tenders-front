import React from "react";
import { BsTwitterX } from "react-icons/bs";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
} from "react-icons/fa";
import { CardComponent } from "../../components/CardComponent";
import NavbarUser from "../../components/NavbarUser";

import logoPrimary from "../../assets/logoPrimary.png";

const Offres = () => {
  return (
    <div className="text-black min-h-screen dark:bg-darkColor">
      <NavbarUser />
      <div>
        <h3 className="text-center text-black dark:text-slate-100 text-heading-3 font-Poppins mt-9 mb-5">
          Nos Offres
        </h3>

        <CardComponent />
      </div>
      <section
        id="etapes"
        className="my-20 overflow-hidden dark:text-slate-100"
      >
        <div className="container w-full mx-auto p-3">
          <h3 className="text-center text-heading-6 md:text-heading-5 font-Poppins mb-5">
            Comment s'abonner ?
          </h3>
          <div
            className="w-full md:w-2/3 mx-3 md:mx-auto font-Poppins"
            data-aos="fade-left"
          >
            <div className="flex items-center mb-2">
              <div className="px-2 w-7 h-7 text-lg bg-green-600 text-white mr-2">
                1
              </div>{" "}
              <p className="text-xs md:text-base">S'inscrire à AZ Tenders</p>
            </div>
            <div className="flex items-center mb-2">
              <div className="px-2 w-7 h-7 text-lg bg-green-600 text-white mr-2">
                2
              </div>{" "}
              <p className="text-xs md:text-base">
                Choisir le plan qui vous convient et attendre l'appel de l'un
                des administrateurs du site
              </p>
            </div>
            <div className="flex items-center mb-2">
              <div className="px-2 w-7 h-7 text-lg bg-green-600 text-white mr-2">
                3
              </div>{" "}
              <div className="text-xs md:text-base">
              Effectuer le paiement avec votre compte CCP
              </div>
            </div>
            <div className="flex items-center mb-2">
              <div className="px-2 w-7 h-7 text-lg bg-green-600 text-white mr-2">
                4
              </div>{" "}
              <div className="text-xs md:text-base">
                <p>
                  Envoyer le reçu de paiement par mail :
                  aztenders.contact@gmail.com
                </p>
                <p>Ou, par WhatsApp : +213 666 88 99 55</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-gray-900 font-Poppins text-center md:text-right">
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
            <div>
          <a
                    href="tel:+213791752266"
                    className="text-[#40CB56] text-sm ml-4 text-white"
                  >
                    <small className="block">Télephone</small>
                    <strong>+213 791 75 22 66</strong>
                  </a>
            </div>
            <div>
            <a
                    href="mailto:info@example.com"
                    className="text-[#40CB56] text-sm ml-4 text-white"
                  >
                    <small className="block">Email</small>
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

export default Offres;
