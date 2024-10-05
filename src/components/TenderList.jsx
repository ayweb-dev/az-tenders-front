import axios from "axios";
import { Badge, Skeleton, SkeletonLine } from "keep-react";
import React, { useEffect, useState } from "react";
import {
  FaCalendarTimes,
  FaInfoCircle,
  FaMapMarker,
  FaRegCalendarCheck,
} from "react-icons/fa";
import { FaFilter, FaFilterCircleXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DatePickerComponent from "./DatePickerComponent ";
import FavoriteButton from "./FavoritesComponent";

const wilayas = [
  { id: "1", name: "Adrar" },
  { id: "2", name: "Chlef" },
  { id: "3", name: "Laghouat" },
  { id: "4", name: "Oum El Bouaghi" },
  { id: "5", name: "Batna" },
  { id: "6", name: "Béjaïa" },
  { id: "7", name: "Biskra" },
  { id: "8", name: "Bordj Bou Arréridj" },
  { id: "9", name: "Bouira" },
  { id: "10", name: "Tamanrasset" },
  { id: "11", name: "Tébessa" },
  { id: "12", name: "Tlemcen" },
  { id: "13", name: "Tiaret" },
  { id: "14", name: "Tizi Ouzou" },
  { id: "15", name: "Alger" },
  { id: "16", name: "Djelfa" },
  { id: "17", name: "Jijel" },
  { id: "18", name: "Sétif" },
  { id: "19", name: "Saïda" },
  { id: "20", name: "Skikda" },
  { id: "21", name: "Sidi Bel Abbès" },
  { id: "22", name: "Annaba" },
  { id: "23", name: "Guelma" },
  { id: "24", name: "Constantine" },
  { id: "25", name: "Médéa" },
  { id: "26", name: "Mostaganem" },
  { id: "27", name: "M'Sila" },
  { id: "28", name: "El Oued" },
  { id: "29", name: "Bordj Badji Mokhtar" },
  { id: "30", name: "Ghardaïa" },
  { id: "31", name: "Relizane" },
  { id: "32", name: "Tissemsilt" },
  { id: "33", name: "Khenchela" },
  { id: "34", name: "Souk Ahras" },
  { id: "35", name: "Tipaza" },
  { id: "36", name: "Mila" },
  { id: "37", name: "Aïn Defla" },
  { id: "38", name: "Naâma" },
  { id: "39", name: "Aïn Témouchent" },
  { id: "40", name: "Sidi Aïch" },
  { id: "41", name: "El Bayadh" },
  { id: "42", name: "El Tarf" },
  { id: "43", name: "Tindouf" },
  { id: "44", name: "Tissemsilt" },
  { id: "45", name: "Adrar" },
  { id: "46", name: "Chlef" },
  { id: "47", name: "Laghouat" },
  { id: "48", name: "Oum El Bouaghi" },
  { id: "49", name: "Batna" },
  { id: "50", name: "Béjaïa" },
  { id: "51", name: "Biskra" },
  { id: "52", name: "Bordj Bou Arréridj" },
  { id: "53", name: "Bouira" },
  { id: "54", name: "Tamanrasset" },
  { id: "55", name: "Tébessa" },
  { id: "56", name: "Tlemcen" },
  { id: "57", name: "Tiaret" },
  { id: "58", name: "Tizi Ouzou" },
];

const TenderList = () => {
  const navigate = useNavigate(); // Hook pour la redirection

  const [tenders, setTenders] = useState([]);
  const [filteredTenders, setFilteredTenders] = useState([]);
  const [subscribedSectors, setSubscribedSectors] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [entreprises, setEntreprises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    sector: "",
    entreprise: "",
    startDate: "",
    endDate: "",
    tenderType: "",
    wilaya: "",
  });
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tendersPerPage = 10; // Nombre de tenders à afficher par page

  useEffect(() => {
    const fetchSubscription = async (token) => {
      const response = await axios.get(
        "https://api.az-tenders.com/user/checkSubscription",
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
        }
      }
    };

    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // isSubscribed
      fetchSubscription(token);
    }
    function convertToDate(dateString) {
      const [day, month, year] = dateString.split("-");
      return new Date(`${year}-${month}-${day}`);
    }
    const fetchTenders = async () => {
      const response = await axios.get("https://api.az-tenders.com/admin/tenders");

      const sortedTenders = response.data.tenders.sort((a, b) => {
        const dateA = convertToDate(a.dateDebut);
        const dateB = convertToDate(b.dateDebut);
        return dateB - dateA; // Trier dans l'ordre décroissant (plus récents en premier)
      });

      setTenders(sortedTenders);
      setFilteredTenders(sortedTenders); // Initialiser les tenders filtrés

      setLoading(false);
    };

    const fetchSectorsAndEntreprises = async () => {
      const sectorsResponse = await axios.get(
        "https://api.az-tenders.com/admin/sectors"
      );
      setSectors(sectorsResponse.data);

      const entreprisesResponse = await axios.get(
        "https://api.az-tenders.com/admin/entreprises"
      );
      setEntreprises(entreprisesResponse.data.entreprises);
    };

    fetchTenders();
    fetchSectorsAndEntreprises();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    let tempTenders = [...tenders]; // Clone pour éviter la mutation

    // Filtre par nom de tender
    if (searchTerm) {
      tempTenders = tempTenders.filter((tender) =>
        tender.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.sector) {
      tempTenders = tempTenders.filter((tender) =>
        tender.sectors.some((sector) => sector._id === filters.sector)
      );
    }

    if (filters.entreprise) {
      tempTenders = tempTenders.filter(
        (tender) => tender.entreprise === filters.entreprise
      );
    }

    if (filters.startDate) {
      //dateEchehance < startDate
      tempTenders = tempTenders.filter(
        (tender) =>
          new Date(tender.dateEchehance) <= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      //dateEchehance > endDate
      tempTenders = tempTenders.filter(
        (tender) => new Date(tender.dateEchehance) >= new Date(filters.endDate)
      );
    }

    if (filters.tenderType) {
      tempTenders = tempTenders.filter(
        (tender) => tender.type === filters.tenderType
      );
    }

    if (filters.wilaya) {
      tempTenders = tempTenders.filter(
        (tender) => tender.wilaya === filters.wilaya
      );
    }
    if (tempTenders.length == 0) {
      Swal.fire({
        title: "Aucun tender n'est retourné !",
        text: "Veuillez vous assurez à propos de la logique de votre filtre",
        icon: "error",
      });
    }

    setFilteredTenders(tempTenders);
  };

  const handleDetailsClick = (tender, isSubscribedToTender) => {
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
      if (isLoggedIn) {
        //jj
        Swal.fire({
          title: "Vous n'êtes pas abonné !",
          text: "Abonnez-vous pour avoir l'accès aux détails des appels d'offres : journal de publication, numero anep, announce de l'appel d'offre..",
          showCancelButton: true,
          confirmButtonText: "Voir les offre",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/userhome/offres");
          }
        });
      } else {
        Swal.fire({
          title: "Vous n'êtes pas abonné !",
          text: "Abonnez-vous pour avoir l'accès aux détails des appels d'offres : journal de publication, numero anep, announce de l'appel d'offre..",
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

  const totalPages = Math.ceil(filteredTenders.length / tendersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const indexOfLastTender = currentPage * tendersPerPage;
  const indexOfFirstTender = indexOfLastTender - tendersPerPage;
  const currentTenders = filteredTenders.slice(
    indexOfFirstTender,
    indexOfLastTender
  );

  return (
    <div className="container mx-auto">
      <button
        className="text-slate-100 rounded-t-md p-2 bg-green-700 mb-0"
        onClick={() => setShowFilters(!showFilters)}
      >
        {showFilters ? (
          <FaFilterCircleXmark size={20} />
        ) : (
          <FaFilter size={20} />
        )}
      </button>
      {showFilters && (
        <div className=" transition-all relative filters mt-0 mb-4 border-2 border-green-700 p-5">
          <div className="mb-3s">
            <input
              type="text"
              placeholder="Recherche par nom de tender"
              className="dark:bg-darkColor text-metal-500 dark:text-white p-2 w-full border rounded-xl border-metal-100"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex-non md:flex justify-evenly items-center m-3">
            <select
              name="sector"
              onChange={handleFilterChange}
              className="dark:bg-darkColor text-metal-500 dark:text-white mb-2 w-full md:w-[286px] justify-start gap-2  border rounded-xl border-metal-100"
            >
              <option
                className="dark:bg-darkColor text-metal-500 dark:text-white"
                value=""
              >
                Sélectionnez un secteur
              </option>
              {sectors.map((sector) => (
                <option
                  className="text-metal-400 dark:text-white"
                  key={sector._id}
                  value={sector._id}
                >
                  {sector.title}
                </option>
              ))}
            </select>

            <select
              className="dark:bg-darkColor text-metal-500 dark:text-white mb-2 w-full md:w-[286px] justify-start gap-2 border rounded-xl border-metal-100"
              name="tenderType"
              onChange={handleFilterChange}
            >
              <option value="">Type de tender</option>
              <option value="appel d'offre">Appel d'offre</option>
              <option value="prorogation de délais">
                prorogation de délais
              </option>
              <option value="avis d'attribution">Avis d'attribution</option>
              <option value="consultaion">Consultaion</option>
              <option value="concour">Concour</option>
              <option value="annulation">Annulation</option>
            </select>

            <select
              className="dark:bg-darkColor text-metal-500 dark:text-white w-full md:w-[286px] justify-start gap-2 border rounded-xl border-metal-100"
              name="wilaya"
              onChange={handleFilterChange}
            >
              <option value="">Sélectionnez une wilaya</option>
              {wilayas.map((wilaya) => (
                <option key={wilaya.id} value={wilaya.id}>
                  {wilaya.name}
                </option>
              ))}
            </select>
          </div>

          {/*********section invisible pour le non-abonné ***************************/}
          {isSubscribed ? (
            <>
              <div className="w-full text-center px-3">
                <select
                  name="entreprise"
                  onChange={handleFilterChange}
                  className="dark:bg-darkColor text-metal-500 dark:text-white w-full md:w-10/12 justify-start gap-2 border rounded-xl mx-auto border-metal-100"
                >
                  <option value="">Sélectionnez un organisme</option>
                  {entreprises.map((entreprise, index) => (
                    <option key={index} value={entreprise}>
                      {entreprise}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-2 gap-3 flex flex-col md:flex-row justify-center items-center">
                <DatePickerComponent
                  placeholder={"Date d'échehance inférieure à"}
                  selectedDate={filters.startDate}
                  onDateChange={(date) =>
                    setFilters((prev) => ({ ...prev, startDate: date }))
                  }
                />{" "}
                <DatePickerComponent
                  placeholder={"Date d'échehance suppérieure à"}
                  selectedDate={filters.endDate}
                  onDateChange={(date) =>
                    setFilters((prev) => ({ ...prev, endDate: date }))
                  }
                />{" "}
              </div>
            </>
          ) : (
            <div className="w-full text-center text-slate-400 font-Poppins">
              Autres filtres réservés aux abonnés
            </div>
          )}
          {/********* FIN  de la section invisible pour le non-abonné ***************************/}

          <button
            onClick={applyFilters}
            className="mt-3 mx-auto p-2 rounded-sm hover:bg-green-600 text-center w-full bg-green-700 text-slate-100"
          >
            Appliquer le filtre
          </button>
          {/* <button
            onClick={resetFilters}
            className="mt-3 mx-auto p-2 rounded-sm border-2 text-gray-500 dark:text-slate-500 hover:text-green-700 dark:hover:text-green-700 border-green-700 text-center w-full"
          >
            Réinitialiser le filtre
          </button> */}
        </div>
      )}
      <h3 className="font-Poppins m-6 text-heading-6 text-black dark:text-slate-100">
        Résultat du filtre{" "}
        <Badge className="-translate-y-1" color="success" variant="border">
          {filteredTenders.length} annonces
        </Badge>
      </h3>

      {loading && (
        <Skeleton className="w-full space-y-2.5 xl:max-w-md">
          <SkeletonLine className="h-40 w-full" />
          <SkeletonLine className="h-40 w-full" />
          <SkeletonLine className="h-40 w-full" />
          <SkeletonLine className="h-40 w-full" />
          <SkeletonLine className="h-40 w-full" />
          <SkeletonLine className="h-40 w-full" />
        </Skeleton>
      )}

      {currentTenders.map((tender) => {
        const isSubscribedToTender = tender.sectors.some((sector) =>
          subscribedSectors.some(
            (subscribedSector) => subscribedSector._id === sector._id
          )
        );

        return (
          <div
            key={tender._id}
            className="p-6 relative font-Poppins shadow-md mb-4 bg-slate-100 dark:bg-gray-900 text-darkColor dark:text-lightColor"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg md:text-2xl font-bold">{tender.title}</h2>
              {isLoggedIn && <FavoriteButton tenderId={tender._id} />}
            </div>

            {isLoggedIn && isSubscribedToTender ? (
              <>
                <p className="text-gray-400 text-sm">{tender.entreprise}</p>
                <p>
                  {tender.sectors.map((sector) => (
                    <Badge key={sector._id} color="success" className="mr-1">
                      {sector.title}
                    </Badge>
                  ))}
                </p>
                <div className="flex-none md:flex justify-evenly items-center mt-2">
                  <p>
                    <FaRegCalendarCheck className="inline mr-1 text-greenLogo" />
                    {tender.dateDebut}
                  </p>
                  <p>
                    <FaMapMarker className="inline mr-1 text-greenLogo" />
                    {tender.wilaya}
                  </p>
                  <p
                    className={`${
                      new Date(tender.dateEchehance) < new Date()
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    <FaCalendarTimes className="inline mr-1 text-greenLogo" />
                    {tender.dateEchehance}
                    {new Date(tender.dateEchehance) < new Date() && (
                      <span className="ml-1">(expiré)</span>
                    )}
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
                    onClick={() =>
                      handleDetailsClick(tender, isSubscribedToTender)
                    }
                    className="bg-green-700 rounded-tl-md text-slate-50 p-2 absolute right-0 bottom-0 text-sm md:text-base"
                  >
                    <FaInfoCircle className="inline mr-2" />
                    Voir Détails
                  </button>
                </div>
              </>
            ) : (
              <>
                {isLoggedIn ? (
                  <>
                    <p className="text-gray-400 text-sm">
                      Nom de l'organisme réservé aux abonnés
                    </p>
                    <p>
                      {tender.sectors.map((sector) => (
                        <Badge
                          key={sector._id}
                          color="success"
                          className="mr-1"
                        >
                          {sector.title}
                        </Badge>
                      ))}
                    </p>
                    <div className="flex-none md:flex justify-evenly text-sm md:text-base items-center my-6">
                      <p>
                        <FaRegCalendarCheck className="inline mr-1 text-greenLogo" />
                        {tender.dateDebut}
                      </p>
                      <p className="mt-1">
                        <FaMapMarker className="inline mr-1 text-greenLogo" />
                        {tender.wilaya}
                      </p>
                      <p className="mt-1">
                        Date d'échéhance réservé aux abonnés
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
                        onClick={() =>
                          handleDetailsClick(tender, isSubscribedToTender)
                        }
                        className="bg-green-700 text-slate-50 p-2 rounded-tl-md absolute right-0 bottom-0 text-sm md:text-base"
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
                    <p>
                      {tender.sectors.map((sector) => (
                        <Badge
                          key={sector._id}
                          color="success"
                          className="mr-1"
                        >
                          {sector.title}
                        </Badge>
                      ))}
                    </p>
                    <div className="flex-none md:flex justify-evenly text-sm md:text-base items-center mt-4">
                      <p>
                        <FaRegCalendarCheck className="inline mr-1 text-greenLogo" />
                        {tender.dateDebut}
                      </p>
                      <p className="mt-1">
                        <FaMapMarker className="inline mr-1 text-greenLogo" />
                        {tender.wilaya}
                      </p>
                    </div>
                    <div className="flex justify-between mt-7">
                      <Badge
                        color="secondary"
                        variant="border"
                        className="absolute bottom-0 left-0 ml-4 mb-2"
                      >
                        {tender.type}
                      </Badge>
                      <button
                        onClick={() =>
                          handleDetailsClick(tender, isSubscribedToTender)
                        }
                        className="bg-green-700  text-slate-50 rounded-tl-md p-2 absolute right-0 bottom-0 text-sm md:text-base"
                      >
                        <FaInfoCircle className="inline mr-2" />
                        Voir Détails
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        );
      })}
      <div className="flex justify-center items-center mt-9">
        <button
          className="p-2 bg-green-700 text-slate-200 rounded-md"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span className="mx-5 p-2 bg-green-700 text-slate-200 rounded-md">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          className="p-2 bg-green-700 text-slate-200 rounded-md"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default TenderList;
