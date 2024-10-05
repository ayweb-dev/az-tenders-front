import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NavbarAdmin from "../../components/NavbarAdmin";
import { SideBar } from "../../components/SideBar";
import TableModeleContact from "../../components/Table/Modele/TableModeleContact";
import { useNavigate } from "react-router-dom";

function Contacts() {
  const [dataMyTable, setdataMyTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


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
      const token = localStorage.getItem("token");
      const response = await axios.get("https://api.az-tenders.com/admin/messages",{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

      // Set state values
      setdataMyTable(response.data.messages || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const markAsSeenMessage = async (contactId) => {
    try {
      const token = localStorage.getItem("token"); // Récupération du token d'authentification
      const response = await axios.put(
        `https://api.az-tenders.com/admin/message/${contactId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Message vu !",
        });
        getMyTable();
      }
    } catch (error) {
      console.error("Erreur lors de la vision du contact :", error);
      alert("Erreur lors de la vision");
    }
  };

  const deleteContact = async (contactId) => {
    try {
      // Requête DELETE vers l'API backend
      const token = localStorage.getItem("token"); // Récupération du token d'authentification
      // const token = "Matoub_3emek";

      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Êtes vous sûr de supprimer ce message ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, supprimer!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await axios.delete(
            `https://api.az-tenders.com/admin/message/${contactId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 204) {
            Swal.fire({
              icon: "success",
              title: "Succès",
              text: "Message supprimé avec succès !",
            });
            getMyTable(); // Actualiser les données après la suppression
          }
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Erreur lors de la suppression du message !",
      });
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
          <div className="grid grid-cols-1 p-6 sm:grid-cols-1 md:grid-cols-3">
            <h5 className="hidden  text-heading-5 font-Poppins sm:block">
              {" "}
              Messages{" "}
            </h5>
          </div>
          <div className="">
            <TableModeleContact
              headers={[
                { column: "nom", label: "nom" },
                { column: "tel", label: "tel" },
                { column: "email", label: "email" },
                { column: "body", label: "body" },
              ]}
              data={dataMyTable}
              isLoading={isLoading}
              loadingTag={<h1>Loading...</h1>}
              onMarkAsSeen={markAsSeenMessage}
              onDelete={deleteContact}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;
