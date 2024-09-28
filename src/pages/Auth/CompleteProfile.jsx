// src/pages/CompleteProfile.jsx
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const wilayas = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M’Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arreridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
  "Timimoune",
  "Bordj Badji Mokhtar",
  "Ouled Djellal",
  "Béni Abbès",
  "In Salah",
  "In Guezzam",
  "Touggourt",
  "Djanet",
  "El M'Ghair",
  "El Meniaa",
];

const CompleteProfile = () => {
  const [tel, setTel] = useState("");
  const [wilaya, setWilaya] = useState("");
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(window.location.search);
  const userId = queryParams.get("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://api.az-tenders.com/user/update-profile",
        {
          userId,
          tel,
          wilaya,
        }
      );

      if (response.status === 200) {
        Swal.fire(
          "Bienvenue",
          "Compte créé avec succès, Connectez-vous !",
          "success"
        );
        navigate("/SignIn");
      } else {
        console.log("Erreur lors de la mise à jour du profil");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">
          Compléter le Profil
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="tel"
              className="block text-sm font-medium text-gray-700"
            >
              Téléphone:
            </label>
            <input
              type="text"
              id="tel"
              name="tel"
              value={tel}
              autoComplete="tel"
              pattern="^0\d{9}$"
              onChange={(e) => setTel(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="wilaya"
              className="block text-sm font-medium text-gray-700"
            >
              Wilaya:
            </label>
            <select
              id="wilaya"
              name="wilaya"
              value={wilaya}
              onChange={(e) => setWilaya(e.target.value)}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
            >
              <option value="">Sélectionner une wilaya</option>
              {wilayas.map((wilaya, index) => (
                <option key={wilaya} value={wilaya}>
                  {`${(index + 1).toString().padStart(2, "0")}-${wilaya}`}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Compléter le Profil
          </button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
