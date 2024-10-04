import axios from "axios"; // Import Axios pour gérer les requêtes HTTP
import { Button } from "keep-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { SideBar } from "../../../components/SideBar";

const EditPassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    newPasswordConfirm: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, newPasswordConfirm } = formData;

    // Validation basique sur le front-end
    if (!currentPassword || !newPassword || !newPasswordConfirm) {
      setErrorMessage("Tous les champs doivent être remplis");
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setErrorMessage("Les nouveaux mots de passe ne correspondent pas");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Assurez-vous que le token est stocké

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      // Requête PUT pour mettre à jour le mot de passe
      const response = await axios.post(
        "https://api.az-tenders/admin/update-password",
        formData,
        config
      );

      if (response.status === 200) {
        setSuccessMessage("Mot de passe mis à jour avec succès");
        Swal.fire({
          title: "Succès !",
          text: "Mot de passe modifié avec succès",
          icon: "info",
        });
        setErrorMessage("");
        navigate("/admin/profile"); // Rediriger vers la page Admin après la mise à jour
      }
    } catch (error) {
      setErrorMessage("Erreur lors de la mise à jour du mot de passe");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-darkColor">
      <div>
        <NavbarAdmin />
      </div>
      <div className="flex">
        <SideBar className="w-1/4 min-h-screen" />
        <div className="w-3/4">
          <div className="min-h-screen flex pt-5 justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Modifier le mot de passe
              </h2>
              {errorMessage && (
                <p className="text-red-500 mb-4 text-center">{errorMessage}</p>
              )}
              {successMessage && (
                <p className="text-green-500 mb-4 text-center">
                  {successMessage}
                </p>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Mot de passe actuel
                  </label>
                  <input
                    type="text"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Nouveau mot de passe
                  </label>
                  <input
                    type="text"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <input
                    type="text"
                    name="newPasswordConfirm"
                    value={formData.newPasswordConfirm}
                    onChange={handleInputChange}
                    className="w-full border-gray-300 p-3 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="flex justify-between items-center">
                  <Button
                    color="primary"
                    className="w-auto px-4 py-2"
                    type="submit"
                  >
                    Confirmer
                  </Button>
                  <Link to="/admin/profile">
                    <Button color="secondary" className="w-auto px-4 py-2">
                      Annuler
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

export default EditPassword;
