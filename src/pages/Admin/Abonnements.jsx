import axios from "axios";
import { Button } from "keep-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarAdmin from "../../components/NavbarAdmin";
import { SideBar } from "../../components/SideBar";
import TableModeleButton from "../../components/Table/Modele/TableModeleButton";
import TableModeleMono from "../../components/Table/Modele/TableModeleMono";

const Abonnements = () => {
  const [dataMyTable, setdataMyTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTable, setActiveTable] = useState("updated"); // Gère quel tableau est actif
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
    localStorage.removeItem("SubToEdit");
    getMyTable();
  }, []);

  const getMyTable = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.az-tenders.com/admin/abonnements",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setdataMyTable(response.data.subscriptions || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const [showButtons, setShowButtons] = useState(false); // État pour afficher les boutons

  const handleToggle = () => {
    setShowButtons((prev) => !prev); // Bascule entre les vues
  };

  // decomposer les structures de donnés pour les integrer a une seule
  const flattenedData = dataMyTable.map((item) => ({
    _id: item._id,
    email: item.user.email,
    nom: item.user ? item.user.nom : "",
    prenom: item.user ? item.user.prenom : "",
    dateFin: item.dateFin,
    type: item.type,
    status: item.status,
    sectors: item.sectors
      ? item.sectors.map((sector) => sector.title).join(", ")
      : "", // Extraire les titres des secteurs et les joindre
  }));

  const editSub = async (SubID) => {
    navigate("/admin/abonnements/edit");
    // Passage des données du tender via l'état
    localStorage.setItem("SubToEdit", JSON.stringify(SubID));
  };

  const deleteSub = async (SubId) => {
    try {
      Swal.fire({
        title: "Etes vous sûr !",
        text: "Vous êtes sur le point de suprimer cet abonnement, ",
        icon: "warning",
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: "Supprimer",
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isDenied) {
          // Requête DELETE vers l'API backend
          const token = localStorage.getItem("token"); // Récupération du token d'authentification
          const response = axios.delete(
            `https://api.az-tenders.com/admin/abonnement/${SubId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            Swal.fire("Abonnement supprimé avec succès!", "", "success");
          }
          getMyTable(); // Actualiser les données après la suppression
        }
      });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      Swal.fire("Erreur lors de la suppression", "", "error");
    }
  };

  const filterSubscriptionsByStatus = (stat) => {
    return flattenedData.filter((sub) => sub.status === stat);
  };

  return (
    <div className="dark:bg-darkColor dark:text-white">
      <div>
        <NavbarAdmin />
      </div>
      <div className="flex">
        <SideBar className="w-1/4" />
        <div className="w-3/4">
          <div className="grid grid-cols-1 p-6 sm:grid-cols-1 md:grid-cols-3">
            <h5 className="hidden text-heading-5 font-Poppins sm:block ">
              Abonnements
            </h5>
            <div className="col-span-1"></div>
            <Link to="/admin/abonnements/ajout">
              <Button color="success" className="w-full">
                Ajouter un abonnement
              </Button>
            </Link>
          </div>

          <div className="mb-4 ml-3">
            <Button
              onClick={() => setActiveTable("updated")}
              className={`p-2 mr-1 rounded ${
                activeTable === "updated"
                  ? "bg-gray-100 text-black dark:bg-gray-700 dark:text-white rounded-none cursor-not-allowed" // Style pour désactiver le bouton
                  : "bg-blue-500 text-white"
              }`}
              disabled={activeTable === "updated"} // Désactiver le bouton actif
            >
              Abonnements
            </Button>

            {/* Bouton pour afficher le TableModele avec boutons (edit, delete) */}
            <Button
              onClick={() => setActiveTable("asked")}
              className={`p-2 mr-1 rounded ${
                activeTable === "asked"
                  ? "bg-gray-100 text-black dark:bg-gray-700 dark:text-white rounded-none cursor-not-allowed" // Style pour désactiver le bouton
                  : "bg-blue-500 text-white"
              }`}
              disabled={activeTable === "asked"} // Désactiver le bouton actif
            >
              Demandes
            </Button>

            {/* Bouton pour afficher le TableModele avec boutons (edit, delete) */}
            <Button
              onClick={() => setActiveTable("expired")}
              className={`p-2 mr-1 rounded ${
                activeTable === "expired"
                  ? "bg-gray-100 text-black dark:bg-gray-700 dark:text-white rounded-none cursor-not-allowed" // Style pour désactiver le bouton
                  : "bg-blue-500 text-white"
              }`}
              disabled={activeTable === "expired"} // Désactiver le bouton actif
            >
              Expirés
            </Button>
            <Button
              onClick={() => setActiveTable("deleted")}
              className={`p-2 rounded ${
                activeTable === "deleted"
                  ? "bg-gray-100 text-black dark:bg-gray-700 dark:text-white rounded-none cursor-not-allowed" // Style pour désactiver le bouton
                  : "bg-blue-500 text-white"
              }`}
              disabled={activeTable === "deleted"} // Désactiver le bouton actif
            >
              Supprimés
            </Button>
          </div>
          {activeTable === "updated" ? (
            <TableModeleButton
              headers={[
                { column: "email", label: "Email" },
                { column: "nom", label: "nom" },
                { column: "prenom", label: "prenom" },
                { column: "type", label: "types" },
                // { column: "sectors", label: "secteurs" },
                { column: "dateFin", label: "date Fin" },
              ]}
              data={filterSubscriptionsByStatus("updated")}
              isLoading={isLoading}
              loadingTag={<h1>Loading...</h1>} // Affiche TableModeleButton
              edit_func={editSub}
              delete_func={deleteSub}
            />
          ) : activeTable === "asked" ? (
            <TableModeleButton
              headers={[
                { column: "email", label: "Email" },
                { column: "nom", label: "nom" },
                { column: "prenom", label: "prenom" },
                { column: "type", label: "types" },
                { column: "sectors", label: "secteurs" },
              ]}
              data={filterSubscriptionsByStatus("asked")} // Utilise des données spécifiques pour 'expired'
              isLoading={isLoading}
              loadingTag={<h1>Loading expired data...</h1>} // Affiche TableModeleButton pour 'expired'
              edit_func={editSub}
              delete_func={deleteSub}
            />
          ) : activeTable === "expired" ? (
            <TableModeleButton
              headers={[
                { column: "email", label: "Email" },
                { column: "nom", label: "nom" },
                { column: "prenom", label: "prenom" },
                { column: "type", label: "types" },
                { column: "sectors", label: "secteurs" },
              ]}
              data={filterSubscriptionsByStatus("expired")}
              isLoading={isLoading}
              loadingTag={<h1>Loading...</h1>} // Affiche TableModele normal
              edit_func={editSub}
              delete_func={deleteSub}
            />
          ) : (
            <TableModeleMono
              headers={[
                { column: "email", label: "Email" },
                { column: "nom", label: "nom" },
                { column: "prenom", label: "prenom" },
                { column: "type", label: "types" },
                { column: "sectors", label: "secteurs" },
              ]}
              data={filterSubscriptionsByStatus("deleted")}
              isLoading={isLoading}
              loadingTag={<h1>Loading...</h1>} // Affiche TableModele normal
              edit_func={editSub}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Abonnements;
