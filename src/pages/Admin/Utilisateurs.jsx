import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarAdmin from "../../components/NavbarAdmin";
import { SideBar } from "../../components/SideBar";
import TableModeleVerify from "../../components/Table/Modele/TableModeleVerify";

const Utilisateurs = () => {
  const [dataMyTable, setdataMyTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
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

  useEffect(() => {
    getMyTable();
  }, []);

  const getMyTable = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token"); // Récupération du token d'authentification
      // Faire une requête GET vers votre backend pour récupérer les secteurs
      const response = await axios.get("https://api.az-tenders/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Mettre à jour l'état avec les données récupérées
      setdataMyTable(response.data.users || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des Utilisateur :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (Userd) => {
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
          const token = localStorage.getItem("token"); // Récupération du token d'authentification
          const response = axios.delete(
            `https://api.az-tenders/admin/user/${Userd}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            setMessage("User supprimé avec succès !");
          }
          getMyTable(); // Actualiser les données après la suppression
        }
      });
      // Requête DELETE vers l'API backend
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      setMessage("Erreur lors de la suppression");
    }
  };

  return (
    <div className="dark:bg-darkColor dark:text-white">
      <div>
        <NavbarAdmin />
      </div>
      <div className="flex">
        <SideBar className="w-1/4" />
        <div className="w-3/4">
          <h2 className="text-heading-6 md:text-heading-5 m-6 font-Poppins font-bold">
            Utilisateurs
          </h2>
          {message && <p className="mb-4 text-black">{message}</p>}

          <TableModeleVerify
            headers={[
              { column: "nom", label: "Nom" },
              { column: "prenom", label: "Prenom" },
              { column: "tel", label: "Tel" },
              { column: "wilaya", label: "Wilaya" },
              { column: "abonne", label: "Abonnement" },
            ]}
            data={dataMyTable}
            isLoading={isLoading}
            loadingTag={<span>Loading...</span>}
            delete_func={deleteUser}
          />
        </div>
      </div>
    </div>
  );
};

export default Utilisateurs;
