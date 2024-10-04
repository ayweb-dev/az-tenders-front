import axios from "axios";
import { Button, Input } from "keep-react"; // Inputs and buttons with style
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

const AjoutAdmin = () => {
  const [formData, setFormData] = useState({
    Nom: "",
    Prenom: "",
    Email: "",
    tel: "",
    Password: "",
    passwordConfirm: "",
    wilaya: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://api.az-tenders/admin/admin-access",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Obtenez le nom et la valeur de l'input
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Met à jour uniquement le champ modifié
    }));
  };

  const addAdmin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://api.az-tenders/admin/new-admin",
        {
          nom: formData.Nom,
          prenom: formData.Prenom,
          tel: formData.tel,
          wilaya: formData.wilaya,
          email: formData.Email,
          password: formData.Password,
          passwordConfirm: formData.passwordConfirm,
          role: "admin",
          nbrTenders: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire("Admin ajouté avec succès !", "", "success");
        navigate("/admin/administrateurs");
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout de l'admin :",
        error.response.data.message
      );
      Swal.fire("Erreur", error.response.data.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-darkColor">
      <NavbarAdmin />
      <div className="flex">
        <SideBar className="w-1/4 min-h-screen" />
        <div className="w-3/4">
          <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Nouvel Admin</h1>
            <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
              {/* Le formulaire qui englobe tous les champs */}
              <form onSubmit={addAdmin}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-gray-700 font-semibold">Nom</label>
                    <Input
                      type="text"
                      name="Nom"
                      value={formData.Nom}
                      onChange={handleInputChange}
                      placeholder="Entrez le Nom"
                      className="w-full mt-2"
                      autoComplete="family-name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-gray-700 font-semibold">
                      Prenom
                    </label>
                    <Input
                      type="text"
                      name="Prenom"
                      value={formData.Prenom}
                      onChange={handleInputChange}
                      placeholder="Entrez le Prenom"
                      className="w-full mt-2"
                      autoComplete="given-name"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-gray-700 font-semibold">
                    Téléphone
                  </label>
                  <Input
                    type="text"
                    name="tel"
                    value={formData.tel}
                    onChange={handleInputChange}
                    placeholder="Enter contact phone"
                    className="w-full mt-2"
                    pattern="^0\d{9}$"
                    autoComplete="tel"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="text-gray-700 font-semibold">Email</label>
                  <Input
                    type="email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleInputChange}
                    placeholder="Entrez l'e-mail"
                    className="w-full mt-2 "
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="text-gray-700 font-semibold">Wilaya</label>
                  <div className="relative text-gray-300">
                    <select
                      name="wilaya"
                      value={formData.wilaya}
                      onChange={handleInputChange}
                      className="block w-full bg-white dark:bg-gray-800  border border-black rounded-lg shadow-sm mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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

                <div className="mb-4">
                  <label className="text-gray-700 font-semibold">
                    Mot de passe (Min 8 charactéres)
                  </label>
                  <Input
                    type="password"
                    name="Password"
                    value={formData.Password}
                    onChange={handleInputChange}
                    placeholder="Entrez votre mot de passe"
                    className="w-full mt-2"
                    autoComplete="new-password"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="text-gray-700 font-semibold">
                    Confirmer le mot de passe
                  </label>
                  <Input
                    type="password"
                    name="passwordConfirm"
                    value={formData.passwordConfirm}
                    onChange={handleInputChange}
                    placeholder="Confirmer le mot de passe"
                    className="w-full mt-2"
                    autoComplete="new-password"
                    required
                  />
                </div>

                <Button color="primary" type="submit" className="w-full mt-4">
                  Créer l'admin
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjoutAdmin;
