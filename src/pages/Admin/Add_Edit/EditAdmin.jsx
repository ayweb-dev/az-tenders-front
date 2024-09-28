import axios from "axios"; // Import Axios
import { Button, Input } from "keep-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { SideBar } from "../../../components/SideBar";

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

const EditAdmin = () => {
  const [error, setError] = useState(""); // pour gérer les erreurs
  const [user, setUser] = useState(null); // Laisser user null au départ
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    tel: "",
    wilaya: "",
  });
  const storedAdmin = localStorage.getItem("adminToEdit");

  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://api.az-tenders.com/admin/admin-access",
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "success") {
          // Aucun code ici, car tout est en ordre
          return;
        } else {
          Swal.fire({
            title: "Vous n'avez pas accès à cette section !",
            text: "Seuls les administrateurs ont accès à cette page.",
          }).then(() => {
            navigate("/signin");
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Vous n'avez pas accès à cette section !",
          text: "Seuls les administrateurs ont accès à cette page.",
        }).then(() => {
          navigate("/signin");
        });
      }
    };

    checkAccess();
  }, [navigate]);

  useEffect(() => {
    const fetchAdminToEdit = async () => {
      if (storedAdmin) {
        try {
          const token = localStorage.getItem("token"); // Ajout d'un token si nécessaire pour l'authentification
          const response = await axios.get(
            `https://api.az-tenders.com/admin/users/${storedAdmin}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const admin = response.data.user; // Accès direct à l'objet `user`
          setUser(admin); // Mettre à jour l'utilisateur
          setFormData({
            // Synchroniser formData avec les données de l'utilisateur récupéré
            _id: admin._id || "",
            nom: admin.nom || "",
            prenom: admin.prenom || "",
            email: admin.email || "",
            tel: admin.tel || "",
            wilaya: admin.wilaya || "",
          });
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l'utilisateur :",
            error
          );
          setError("Erreur lors de la récupération de l'utilisateur");
        }
      } else {
        setError("Aucun utilisateur trouvé dans localStorage");
      }
    };

    fetchAdminToEdit();
  }, []); // Ce useEffect s'exécute une fois lorsque le composant est monté

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
        `https://api.az-tenders.com/admin/update-admin-info/${storedAdmin}`,
        formData,
        config
      );

      if (response.status === 200) {
        localStorage.removeItem("adminToEdit");
        Swal.fire("admin mis à jour avec succès", "", "success");
        navigate("/admin/administrateurs");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'admin :", error);
      setError("Une erreur est survenue lors de la mise à jour de l'admin");
    }
  };

  if (!user) return navigate("/admin"); // Affiche un message de chargement pendant que user est null

  return (
    <div className="min-h-screen bg-white dark:bg-darkColor">
      <div>
        <NavbarAdmin />
      </div>
      <div className="flex">
        <SideBar className="w-1/4 min-h-screen" />
        <div className="w-3/4">
          <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-5">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Modification de l'admin
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Nom
                  </label>
                  <Input
                    type="text"
                    name="nom"
                    value={formData.nom}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500 dark:bg-white dark:text-black"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Prenom
                  </label>
                  <Input
                    type="text"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500 dark:bg-white dark:text-black"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500 dark:bg-white dark:text-black"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Téléphone
                  </label>
                  <Input
                    type="text"
                    name="tel"
                    value={formData.tel}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500 dark:bg-white dark:text-black"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-gray-700 font-semibold">Wilaya</label>
                  <div className="relative text-gray-300">
                    <select
                      name="wilaya"
                      value={formData.wilaya}
                      onChange={handleInputChange}
                      className="block w-full bg-white border border-black rounded-lg shadow-sm mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                {/* {error && (
                                    <div className="text-red-500 mb-4">{error}</div> // Afficher les erreurs
                                )} */}
                <div className="flex justify-between items-center">
                  <Button
                    color="primary"
                    className="w-auto px-4 py-2"
                    type="submit"
                  >
                    Confirmer
                  </Button>
                  <Link to="/admin">
                    <Button color="secondary" className="w-auto px-4 py-2">
                      Annuler
                    </Button>
                  </Link>
                  <Link to="/admin/administrateurs/edit/adminpassword">
                    <Button color="primary" className="w-auto px-4 py-2">
                      Mot de passe
                    </Button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;
