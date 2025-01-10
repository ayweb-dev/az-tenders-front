// ******* note : on doit imperativement limiter l'accés au details du tenders au boutton voir details pour qu'elle
// *******-> ne soit pas accessible via une url ou par un navigate via le cmd c ok maintenat car phase de test

import axios from "axios";
import { Badge } from "keep-react";
import React, { useEffect, useState } from "react";
import { FaMapMarker, FaCalendarTimes } from "react-icons/fa";
import { FaFileCircleExclamation, FaArrowLeft } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import FavoriteButton from "../../components/FavoritesComponent";
import NavbarUser from "../../components/NavbarUser";
const TenderDetails = () => {
  const { id } = useParams(); // Récupération de l'ID depuis les paramètres d'URL
  const [isPDF, setIsPDF] = useState(false);
  const [upload, setUpload] = useState(true);
  const [tender, setTender] = useState(null);

  useEffect(() => {
    const fetchTenderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `https://api.az-tenders.com/user/tender/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status === "success") {
          setTender(response.data.tender);
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error,
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error(
          "Erreur lors de la récupération des détails du tender:",
          error
        );
      }
    };

    fetchTenderDetails();
  }, [id]);

  useEffect(() => {
    const checkFileType = async () => {
      if (tender && tender.imageUrl) {
        try {
          const rep = await fetch(tender.imageUrl, { method: "HEAD" });
          if (rep.status === 200) {         
          const fileType = rep.headers.get("content-type");
          if (fileType.includes("pdf")) {
            setIsPDF(true);
          }
        }else {
          setUpload(false);
        }
        } catch (error) {
          console.error("Erreur lors de la vérification du type de fichier :", error);
        }
      }
    };
  
    checkFileType();
  }, [tender]);

  const handleDownload = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Erreur lors du téléchargement du fichier:", error);
      Swal.fire({
        title: "Error!",
        text: "Erreur lors du téléchargement du fichier",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const parseDateString = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`); // Format yyyy-mm-dd
  };

  return (
    <div className="text-black dark:text-slate-100 min-h-screen dark:bg-darkColor">
      <NavbarUser />
      <h1 className="text-heading-4 m-5 text-center font-Poppins">
        Détail du Tender
      </h1>

      <button
        onClick={() => window.history.back()}
        className="bg-green-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
       <span><FaArrowLeft /> Retour </span>
      </button> 
      {tender ? (
        <div className="w-full p-3 md:p-0 md:w-[900px]  mx-auto mt-4 font-Poppins">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg md:text-2xl mr-4 font-bold inline">
                {tender.title}
              </h2>
              <Badge
                color="secondary"
                variant="border"
                className="inline whitespace-nowrap"
              >
                {tender.type}
              </Badge>
            </div>
            <FavoriteButton tenderId={tender._id} />
          </div>

          <p className="text-gray-700 dark:text-slate-300 text-sm mt-2">
            {tender.entreprise} .{" "}
            <FaMapMarker className="inline mr-1 text-green-600" />
            {tender.wilaya}
          </p>

          <p className="mt-2">
            {tender.sectors.map((sector) => (
              <Badge key={sector._id} color="success" className="mr-1">
                {sector.title}
              </Badge>
            ))}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:m-4 my-5 text-base md:text-lg text-gray-900 dark:text-slate-300 ">
            <p>
              Date de publication :{" "}
              <span className="font-bold dark:text-slate-100 text-black">
                {tender.dateDebut}
              </span>
            </p>

            <p
              className={`${tender.dateEchehance &&
                parseDateString(tender.dateEchehance) < new Date()
                ? "text-red-500"
                : ""
                }`}
            >
              <FaCalendarTimes className="inline mr-1 text-greenLogo" />
              {tender.dateEchehance}
              {tender.dateEchehance && parseDateString(tender.dateEchehance) < new Date() && (
                <span className="ml-1">(expiré)</span>
              )}
            </p>

            <p>
              Numéro ANEP :{" "}
              <span className="font-bold">
                {tender.anep ? tender.anep : <>non renseigné</>}
              </span>
            </p>
            <p>
              Journal :{" "}
              <span className="font-bold">
                {tender.journal ? tender.journal : <>non renseigné</>}
              </span>
            </p>
          </div>
          {tender.imageUrl && upload ? (
            <button
              onClick={() => handleDownload(tender.imageUrl, tender.title)}
              className="bg-green-700 hover:bg-green-600 text-slate-100 py-2 px-4 w-full justify-center rounded inline-flex items-center"
            >
              <svg
                className="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span>Télécharger l'annonce</span>
            </button>
          ) : (
            <button className="bg-gray-900 hover:bg-gray-800 text-slate-100 py-2 px-4 w-full justify-center rounded inline-flex items-center">
              <FaFileCircleExclamation className="inilne mr-1" />
              Annonce non renseignée
            </button>
          )}
          <div className="pb-10">

            {tender.imageUrl && upload &&(
              isPDF ? (
                // <embed src={tender.imageUrl} type='application/pdf'       width="100%"
                // height="500px"/>
                <iframe
                  className="my-10 mx-auto"
                  src={tender.imageUrl}
                  width="100%"
                  height="900px"
                  title="Document PDF"
                />
                // <object width="100%" height="400" className="mb-10" data={tender.imageUrl} type="application/pdf">   </object>
                //  <Document file={tender.imageUrl} />  
              ) : (
                <img
                  className="my-10 mx-auto"
                  src={tender.imageUrl}
                  alt="Annonce du tender"
                />
              )
            )}
          </div>

        </div>
      ) : (
        <p className="text-center">Chargement des détails du tender...</p>
      )}
    </div>
  );
};

export default TenderDetails;
