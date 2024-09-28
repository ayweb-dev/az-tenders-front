// **********************CE TEMPLATE EST INUTILISER**************************************************

import React from "react";
import { FaMapMarker, FaStar } from "react-icons/fa";

const TenderCard = ({ tender, subscribedSectors }) => {
  // Vérifier si l'utilisateur est abonné à au moins un secteur de l'appel d'offres
  const isSubscribedToTender =
    tender.sectors &&
    tender.sectors.some((sector) => subscribedSectors.includes(sector._id));

  return (
    <div className="border rounded-lg p-4 shadow-md mb-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">{tender.title}</h2>
        <FaStar />
      </div>
      {isSubscribedToTender && (
        <p className="text-gray-500">Entreprise: {tender.entreprise}</p>
      )}
      <p>Date de début: {new Date(tender.dateDebut).toLocaleDateString()}</p>
      <p>
        <FaMapMarker className="inline" /> {tender.wilaya}
      </p>
      <p>
        Secteurs:{" "}
        {tender.sectors
          ? tender.sectors.map((sector) => sector.name).join(", ")
          : "N/A"}
      </p>
      {isSubscribedToTender && (
        <>
          <p>
            Date d'échéance:{" "}
            {new Date(tender.dateEcheance).toLocaleDateString()}
          </p>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Plus de détails
          </button>
        </>
      )}
    </div>
  );
};

export default TenderCard;
