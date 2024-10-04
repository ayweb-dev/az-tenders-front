import axios from "axios";
import { Badge } from "keep-react";
import React, { useEffect, useState } from "react";
import {
  FaCalendarTimes,
  FaInfoCircle,
  FaMapMarker,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FavoriteButton from "../../components/FavoritesComponent";
import NavbarUser from "../../components/NavbarUser";

const Favorites = () => {
  const [tenders, setTenders] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribedSectors, setSubscribedSectors] = useState([]);
  const [sector, setSectors] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSubscription = async () => {
      const response = await axios.get(
        "https://api.az-tenders/user/checkSubscription",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        if (response.data.sectors && response.data.sectors.length > 0) {
          setIsSubscribed(true);
          setSubscribedSectors(response.data.sectors);
        } else {
          setIsSubscribed(false);
          setSubscribedSectors([]);
        }
      }
    };

    // Fetch user favorites and corresponding tenders
    const fetchFavoritesAndTenders = async () => {
      const userResponse = await axios.get("https://api.az-tenders/admin/user", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const favoritesIds = userResponse.data.user.favorites; // IDs des favoris

      if (favoritesIds.length > 0) {
        const tendersResponse = await axios.post(
          "https://api.az-tenders/admin/getByIds",
          { ids: favoritesIds },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (tendersResponse.data.status === "success") {
          setTenders(tendersResponse.data.tenders); // Set the retrieved tenders
        }
      }
    };

    const fetchSectors = async () => {
      const sectorsResponse = await axios.get(
        "https://api.az-tenders/admin/sectors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSectors(sectorsResponse.data);
    };

    fetchSubscription();
    fetchSectors();
    fetchFavoritesAndTenders();
  }, []);

  const handleDetailsClick = (tender) => {
    // Check if the user is subscribed to at least one sector of the tender

    const isSubscribedToTender = tender.sectors.some((sector) =>
      subscribedSectors.some(
        (subscribedSector) => subscribedSector._id === sector._id
      )
    );

    if (isSubscribed) {
      if (isSubscribedToTender) {
        navigate(`/tenderdetails/${tender._id}`);
      } else {
        Swal.fire({
          title: "Oups !",
          text: "Vous n'êtes abonné à aucun des secteurs de ce tender",
          icon: "info",
        });
      }
    } else {
      if (token) {
        Swal.fire({
          title: "Vous n'êtes pas abonné !",
          text: "Abonnez-vous pour accéder aux détails des appels d'offres.",
          showCancelButton: true,
          confirmButtonText: "Voir les offres",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/userhome/offres");
          }
        });
      } else {
        Swal.fire({
          title: "Vous n'êtes pas abonné !",
          text: "Abonnez-vous pour accéder aux détails des appels d'offres.",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Se Connecter",
          confirmButtonColor: "#1d8c81",
          denyButtonColor: "#3085d6",
          denyButtonText: "Voir les Offres",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/signin");
          } else if (result.isDenied) {
            navigate("/userhome/offres");
          }
        });
      }
    }
  };

  return (
    <div className="dark:text-white dark:bg-darkColor min-h-screen">
      <NavbarUser />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Mes Favoris</h1>
        {tenders.length === 0 ? (
          <p className="text-center text-gray-400">Aucun favori trouvé.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {tenders.map((tender) => (
              <div
                key={tender._id}
                className="relative pl-6 pt-10 pr-3 pb-0  border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl min-h-[300px] pb-16"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg md:text-2xl font-bold">
                    {tender.title}
                  </h2>
                  <FavoriteButton tenderId={tender._id} />
                </div>

                {isSubscribed &&
                subscribedSectors.some((sector) =>
                  tender.sectors.some((sec) => sec._id === sector._id)
                ) ? (
                  <>
                    <h3 className="text-xl font-semibold">
                      {tender.entreprise}
                    </h3>
                    <div className="mt-2 mb-4">
                      {tender.sectors.map((sector) => (
                        <Badge
                          key={sector._id}
                          color="success"
                          className="mr-1"
                        >
                          {sector.title}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col justify-between items-start mt-2 mb-6 text-gray-600 dark:text-white">
                      <p className="flex items-center">
                        <FaRegCalendarCheck className="mr-1 text-greenLogo" />
                        {tender.dateDebut}
                      </p>
                      <p className="flex items-center">
                        <FaMapMarker className="mr-1 text-greenLogo" />
                        {tender.wilaya}
                      </p>
                      <p className="flex items-center">
                        <FaCalendarTimes className="mr-1 text-greenLogo inline" />
                        {tender.dateEchehance}
                      </p>
                    </div>
                    <div className="mt-7">
                      <Badge
                        color="secondary"
                        variant="border"
                        className="absolute bottom-0 left-0 ml-4 mb-2"
                      >
                        {tender.type}
                      </Badge>
                      <button
                        onClick={() => handleDetailsClick(tender)}
                        className="absolute right-2 bottom-2 bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
                      >
                        <FaInfoCircle className="inline mr-2" />
                        Voir Détails
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p className="text-gray-400 text-sm">
                      Nom de l'organisme réservé aux abonnés
                    </p>
                    <div className="mt-2 mb-4">
                      {tender.sectors.map((sector) => (
                        <Badge
                          key={sector._id}
                          color="success"
                          className="mr-1"
                        >
                          {sector.title}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex flex-col justify-between items-start mt-2 mb-6 text-gray-600 dark:text-white">
                      <p className="flex items-center">
                        <FaRegCalendarCheck className="mr-1 text-greenLogo" />
                        {tender.dateDebut}
                      </p>
                      <p className="flex items-center">
                        <FaMapMarker className="mr-1 text-greenLogo" />
                        {tender.wilaya}
                      </p>
                      <p className="text-gray-400 justify-center">
                        <FaCalendarTimes className="mr-1 text-greenLogo inline" />
                        Date d'échéance réservée aux abonnés
                      </p>
                    </div>

                    <button
                      onClick={() => handleDetailsClick(tender)}
                      className="absolute right-2 bottom-2 bg-green-700 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                      <FaInfoCircle className="inline mr-2" />
                      Voir Détails
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
