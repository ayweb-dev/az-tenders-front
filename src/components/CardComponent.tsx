import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "keep-react";
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
//import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const CardComponent = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate(); // Hook pour la redirection

  useEffect(() => {
    const fetchSubscription = async (token) => {
      const response = await axios.get(
        "https://api.az-tenders/user/checkSubscription",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.sectors.length > 0) setIsSubscribed(true);
    };

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // isSubscribed
      fetchSubscription(token);
    }
  }, []);

  const handleSubClick = () => {
    if (isSubscribed) {
      Swal.fire({
        title: "Vous êtes déjà abonné !",
        text: "Veuillez contactez les administrateur pour mettre à niveau votre abonnement",
        icon: "info",
      });
    } else {
      if (isLoggedIn) {
        navigate("/userhome/demandeabonnement");
      } else {
        Swal.fire({
          title: "Vous n'êtes pas connecté !",
          text: "Connectez-vous pour pouvoir demander un abonnement",
          showCancelButton: true,
          confirmButtonText: "Se Connecter",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/signin");
          }
        });
      }
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 gap-y-4 lg:grid-cols-3 gap-1 max-w-6xl mx-auto justify-items-center mt-10">
        <div>
          <Card
            data-aos="fade-right"
            className="bg-gradient-to-br from-transparent hover:rounded-sm to-green-200 dark:to-green-950 hover:to-lightColor hover:dark:to-darkColor transition-all hover:-translate-y-3 hover:shadow-md"
          >
            <CardContent className="font-Cabin">
              <CardTitle className="text-xl font-bold text-greenLogo dark:text-greenLogo">
                BASIC
              </CardTitle>
              <CardDescription className="mt-0 mb-6">
                <p className="text-black dark:text-white text-3xl md:text-5xl font-Cabin text-center my-2">
                  3000 <span className="text-sm font-bold">DA / AN</span>
                </p>
                <p className="text-center text-greenLogo mb-1">
                  1 secteur + 2500 / secteur
                </p>

                <ul className="list-none">
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Voir les titre de tout
                    les Appels d'offre.
                  </li>
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Voir les détails des
                    Appels d'offre.
                  </li>
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Emails de notification
                    des nouvautées
                  </li>
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Voir les affiches des
                    Appels d'offre
                  </li>
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Support client et aide
                  </li>
                </ul>
              </CardDescription>
              <div className="text-center font-Poppins">
                <Button
                  size="lg"
                  color="success"
                  onClick={() => handleSubClick()}
                >
                  S'abonner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card
            data-aos="fade-up"
            className="bg-gradient-to-br from-transparent hover:rounded-sm to-green-200 dark:to-green-950 hover:dark:to-darkColor transition-all hover:-translate-y-3 hover:shadow-md"
          >
            <CardContent className="font-Cabin">
              <CardTitle className="text-xl font-bold text-greenLogo dark:text-greenLogo">
                SILVER
              </CardTitle>
              <CardDescription className="mt-0 mb-6">
                <p className="text-black dark:text-white text-3xl md:text-5xl font-Cabin text-center my-2">
                  12.000 <span className="text-sm font-bold">DA / AN</span>
                </p>
                <p className="text-center text-greenLogo mb-1">
                  6 secteurs + 1500 / secteur
                </p>

                <ul className="list-none">
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Voir les titre de tout
                    les Appels d'offre.
                  </li>
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Voir les détails des
                    Appels d'offre.
                  </li>
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Emails de notification
                    des nouvautées.
                  </li>
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Voir les affiches des
                    Appels d'offre.
                  </li>
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Support client et aide.
                  </li>
                </ul>
              </CardDescription>
              <div className="text-center font-Poppins">
                <Button
                  size="lg"
                  color="success"
                  onClick={() => handleSubClick()}
                >
                  S'abonner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card
            data-aos="fade-left"
            className="bg-gradient-to-br from-transparent hover:rounded-sm to-green-200 dark:to-green-950 hover:dark:to-darkColor transition-all hover:-translate-y-3 hover:shadow-md"
          >
            <CardContent className="font-Cabin">
              <CardTitle className="text-xl font-bold text-greenLogo dark:text-greenLogo">
                Gold
              </CardTitle>
              <CardDescription className="mt-0 mb-6">
                <p className="text-black dark:text-white text-3xl md:text-5xl font-Cabin text-center my-2">
                  22.000 <span className="text-sm font-bold">DA / AN</span>
                </p>
                <p className="text-center text-greenLogo mb-1">
                  Tout secteur inclus
                </p>

                <ul className="list-none">
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Voir les titre de tout
                    les Appels d'offre.
                  </li>
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Voir les détails des
                    Appels d'offre.
                  </li>
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Emails de notification
                    des nouvautées
                  </li>
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Voir les affiches des
                    Appels d'offre
                  </li>
                  <li className="flex items-center mb-1">
                    <FaCheck className="inline mr-2" /> Support client et aide
                  </li>
                </ul>
              </CardDescription>
              <div className="text-center font-Poppins">
                <Button
                  size="lg"
                  color="success"
                  onClick={() => handleSubClick()}
                >
                  S'abonner
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className=" m-10 p-5 md:px-10" data-aos="fade-up">
        <div className="p-4 md:w-2/3 md:mx-auto  rounded-xl bg-gradient-to-br from-transparent hover:rounded-sm to-green-200 dark:to-green-950 hover:dark:from-green-950 hover:dark:to-darkColor transition-all hover:-translate-y-3 hover:shadow-md">
          <h2 className="m-3 text-xl font-bold text-greenLogo dark:text-greenLogo">
            ESSAI
          </h2>
          <p className=" m-2 text-gray-900 dark:text-slate-300">
            AZ Tenders vous propose une période d'éssai de deux(2) jours pour
            exploiter les différentes fonctionalité de l'application{" "}
          </p>

          <div className="w-full text-center mt-6">
            <Button size="lg" color="success" onClick={() => handleSubClick()}>
              En Profiter
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
