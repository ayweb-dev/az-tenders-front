import { Button } from "keep-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavbarAdmin from "../../components/NavbarAdmin";
import { SideBar } from "../../components/SideBar";
// import AnnonceTable from "../../components/Admin/FilterTenders";
import axios from "axios";
import { CgAddR } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import TableModeleType from "../../components/Table/Modele/TableModeleType";

const Tenders = () => {
  const [dataMyTable, setdataMyTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); // Pour afficher les messages de retour
  const navigate = useNavigate(); // Hook pour la redirection

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://api.az-tenders.com/admin/admin-access", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
  
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
      // Faire une requête GET vers votre backend pour récupérer les secteurs
      const token = localStorage.getItem("token");
      const response = await axios.get("https://api.az-tenders.com/admin/tenders",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      // Mettre à jour l'état avec les données récupérées
      setdataMyTable(response.data.tenders || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des secteurs :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const editTenders = async (tenderID) => {
    navigate("/admin/tenders/edit");
    // Passage des données du tender via l'état
    localStorage.setItem("tenderToEdit", JSON.stringify(tenderID));
  };

  const deleteTenders = async (TendersId) => {
    try {
      Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Vous êtes sur le point de supprimer ce tender",
        showCancelButton: true,
        confirmButtonText: "Supprimer",
        confirmButtonColor: "#a60a0a",
        icon: "warning",
      }).then((result) => {
        if (result.isConfirmed) {
          // Requête DELETE vers l'API backend
          const token = localStorage.getItem("token"); // Récupération du token d'authentification
          const response = axios.delete(
            `https://api.az-tenders.com/admin/tender/${TendersId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            setMessage("Secteur supprimé avec succès !");
            getMyTable(); // Actualiser les données après la suppression
          }
        }
      });
    } catch (error) {
      console.error("Erreur lors de la suppression du secteur :", error);
      setMessage("Erreur lors de la suppressio");
    }
  };

  return (
    <div className="dark:text-white dark:bg-darkColor min-h-screen">
      <div>
        <NavbarAdmin />
      </div>
      <div className="flex">
        <SideBar className="w-1/4" />
        <div className="w-3/4">
          <div className="flex justify-between p-6">
            <h5 className="text-heading-6 md:text-heading-5 font-Poppins">
              {" "}
              Liste des Annonces{" "}
            </h5>
            <Link to="/admin/tenders/ajout">
              <Button color="success">
                <CgAddR className="inline" />{" "}
                <span className="hidden md:inline-block">
                  Ajouter une annonce
                </span>
              </Button>
            </Link>
          </div>
          <div className="border-2 border-black rounded-lg p-2 ml-4">
            <TableModeleType
              headers={[
                { column: "title", label: "Titre" },
                { column: "entreprise", label: "Entreprise" },
                { column: "anep", label: "Num Anep" },
                { column: "journal", label: "Journal" },
                { column: "type", label: "type" },
                { column: "dateDebut", label: "Date Publication" },
                { column: "dateEchehance", label: "Date Echehance" },
                { column: "wilaya", label: "Wilaya" },
                { column: "sectors", label: "Secteurs" },
              ]}
              data={dataMyTable}
              isLoading={isLoading}
              loadingTag={<h1>Loading...</h1>}
              edit_func={editTenders}
              delete_func={deleteTenders}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tenders;
