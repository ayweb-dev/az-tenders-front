import React, { useEffect, useState } from "react";
import { MdNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

const FullScreenSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = [
    {
      id: 1,
      image: "url('../src/assets/img-high-benifits.png')",
      content: (
        <div className="font-Cabin">
          <h2>AZ Tenders</h2>
          <p className="text-sm  w-11/12 md:w-1/2 leading-7 ">
            Votre meilleure plateforme pour augmenter votre portée en Algérie
          </p>

          <p className="mt-6">
            <Link
              to="/signup"
              className="mr-1 font-Satisfy mt-3 text-xl p-2 rounded-sm border-2 border-green-700 bg-green-700"
            >
              S'inscrire
            </Link>
            <Link
              to="/signin"
              className="font-Satisfy mt-3 text-xl p-2 border-2 rounded-sm hover:text-slate-100 hover:bg-green-700 border-green-700 text-green-700"
            >
              Se connecter
            </Link>
          </p>
        </div>
      ),
    },
    {
      id: 2,
      image: "url('../src/assets/img-coffee.png')",
      content: (
        <div className="font-Cabin">
          <h2>Accés immédiat et rentable</h2>
          <p className="text-sm  w-11/12 md:w-1/2 leading-7 text-justify">
            Gagnez du temps avec des informations précises, locales et des
            opportunités d’Affaires nationales.
          </p>

          <p className="mt-6">
            <Link
              to="/UserHome"
              className="mr-1 font-Satisfy mt-3 text-xl p-2 rounded-sm border-2 border-green-700 bg-green-700"
            >
              Voir les appels d'offres
            </Link>
          </p>
        </div>
      ),
    },
    {
      id: 3,
      image: "url('../src/assets/img-support-client.png')",
      content: (
        <div className="font-Cabin">
          <h2>Service client à l'écoute</h2>
          <p className="text-sm  w-11/12 md:w-1/2 leading-7 text-justify">
            AZ Tenders dispose d'un support client dédié pour vous assister à
            tout moment.
          </p>
          <a
            href="#Contact"
            className="inline-block font-Satisfy mt-3 text-xl p-2 rounded-sm border-2 border-green-700 bg-green-700"
          >
            Vous avez une question ?
          </a>
        </div>
      ),
    },
    {
      id: 4,
      image: "url('../src/assets/img-archives.png')",
      content: (
        <div className="font-Cabin">
          <h2>Plans & Paiement </h2>
          <p className="text-sm mb-2 w-11/12 md:w-1/2 leading-7 text-justify">
            différents plans d'abonnement adaptés à vos besoins, avec des
            paiements clairs et accessibles. à vous de choisir le plan qui vous
            convient le mieux.
          </p>
          <p className="mt-6">
            <Link
              to="/userhome/offres"
              className="mr-1 font-Satisfy mt-3 text-xl p-2 rounded-sm border-2 border-green-700 bg-green-700"
            >
              Nos plans d'abonnement
            </Link>
          </p>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [slides.length]);

  const nextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlideIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fullscreen-slider relative" id="Slider">
      <div
        className="slider-container text-slate-100"
        style={{
          display: "flex",
          transform: `translateX(-${slideIndex * 100}%)`,
          transition: "transform 1s ease",
        }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="fullscreen-slide"
            style={{
              backgroundImage: slide.image,
              minWidth: "100%", // Ensure each slide takes full width
              height: "100vh", // Full height of each slide
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              top: "-10%",
            }}
          >
            <div
              className="slide-content"
              style={{ color: "white", zIndex: 10 }}
            >
              {slide.content}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute text-lg md:text-3xl left-1 md:left-4 top-1/2 transform -translate-y-1/2  text-white p-2 rounded-full"
      >
        <MdNavigateBefore />
      </button>
      <button
        onClick={nextSlide}
        className="absolute text-lg md:text-3xl right-1 md:right-4 top-1/2 transform -translate-y-1/2  text-white p-2 "
      >
        <MdOutlineNavigateNext />
      </button>
    </div>
  );
};

export default FullScreenSlider;
