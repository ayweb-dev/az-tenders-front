import axios from "axios"; // Import Axios
import { Button, Input } from "keep-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarUser from "../../components/NavbarUser";

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

const UserEditProfile = () => {
  const [error, setError] = useState(""); // pour gérer les erreurs
  const [user, setUser] = useState(null); // Laisser user null au départ
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    wilaya: "",
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("userToEdit");
    localStorage.removeItem("userToEdit");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser); // Mettre à jour l'utilisateur
      setFormData({
        // Synchroniser formData avec user une fois récupéré
        _id: parsedUser._id,
        nom: parsedUser.nom,
        prenom: parsedUser.prenom,
        email: parsedUser.email,
        tel: parsedUser.tel,
        wilaya: parsedUser.wilaya,
      });
    } else {
      setError("Aucun utilisateur trouvé dans localStorage");
    }
  }, []); // Ce useEffect se déclenche lors du montage pour charger les données de l'utilisateur
  const navigate = useNavigate(); // Pour rediriger après la soumission

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // Assurez-vous que le token est stocké dans localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Envoyer la requête PUT pour mettre à jour les informations de l'utilisateur
      const response = await axios.post(
        "https://api.az-tenders/admin/update-personal-info",
        formData,
        config
      );

      if (response.status === 200) {
        Swal.fire({
          text: "Profil mis à jour avec succès",
          icon: "success",
          confirmButtonText: "Ok",
          confirmButtonColor: "#3085d6",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/profile");
          }
        });
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur :", error);
      setError("Une erreur est survenue lors de la mise à jour du profil");
    }
  };

  //   if (!user) return <p>Loading...</p>; // Affiche un message de chargement pendant que user est null

  return (
    <div className="min-h-screen bg-white dark:bg-darkColor">
      <div>
        <NavbarUser />
      </div>
      <div className="flex">
        <div className="w-full pb-10">
          <div className="min-h-screen flex items-center justify-center">
            <div className=" p-8 rounded-lg  w-full max-w-2xl">
              <h2 className="text-2xl dark:text-slate-200 font-bold mb-9 text-center">
                Modification du profile
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-slate-900 dark:text-slate-400 font-semibold mb-2">
                      Nom
                    </label>
                    <Input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 p-3 rounded-md focus:outline-none focus:border-green-600 dark:bg-white dark:text-black"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-slate-900 dark:text-slate-400 font-semibold mb-2">
                      Prenom
                    </label>
                    <Input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 p-3 rounded-md focus:outline-none focus:border-green-600 dark:bg-white dark:text-black"
                      required
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-slate-900 dark:text-slate-400 font-semibold mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 p-3 rounded-md focus:outline-none focus:border-green-600 dark:bg-white dark:text-black"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-slate-900 dark:text-slate-400 font-semibold mb-2">
                      Téléphone
                    </label>
                    <Input
                      type="text"
                      name="tel"
                      value={formData.tel}
                      onChange={handleInputChange}
                      className="w-full border-gray-300 p-3 rounded-md focus:outline-none focus:border-green-600 dark:bg-white dark:text-black"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-slate-900 dark:text-slate-400 font-semibold mb-2">
                      Wilaya
                    </label>
                    <div className="relative text-gray-300">
                      <select
                        name="wilaya"
                        value={formData.wilaya}
                        onChange={handleInputChange}
                        className="block w-full bg-white h-10 border border-gray-300 rounded-lg shadow-sm mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-border-green-600 focus:border-green-600 sm:text-sm"
                        required
                      >
                        <option value="" disabled></option>
                        {wilayas.map((wilaya, index) => (
                          <option key={wilaya} value={wilaya}>
                            {`${(index + 1)
                              .toString()
                              .padStart(2, "0")}-${wilaya}`}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center gap-4 items-center mt-7">
                  <Link to="/profile">
                    <Button
                      color="secondary"
                      variant="outline"
                      className="w-auto px-4 py-2"
                    >
                      Annuler
                    </Button>
                  </Link>
                  <Button
                    color="success"
                    className="w-auto px-4 py-2"
                    type="submit"
                  >
                    Confirmer
                  </Button>
                </div>
                <Link
                  to="/profile/edit/password"
                  className="text-blue-700 text-center block mt-7 w-full"
                >
                  Modifier Mot de passe
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditProfile;
