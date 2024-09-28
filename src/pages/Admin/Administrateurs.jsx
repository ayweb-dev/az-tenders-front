import axios from "axios";
import { Button } from "keep-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarAdmin from "../../components/NavbarAdmin";
import { SideBar } from "../../components/SideBar";
import TableModeleButton from "../../components/Table/Modele/TableModeleButton";

function Administrateurs() {
  const [dataMyTable, setdataMyTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState([]);
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
        setRole(response.data.role);

        if (response.data.status === "success" ) {
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
      const response = await axios.get("https://api.az-tenders.com/admin/admins", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setdataMyTable(response.data.data.users || []); //Merci pour cette ligne youva ^^ j'ai pris tres peut de temps, et beaucoup de plaisir a l'ecrire
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const editAdmin = async (adminID) => {
    if (role === "super admin"){
    navigate("/admin/administrateurs/edit");
    // Passage des données du tender via l'état
    localStorage.setItem("adminToEdit", adminID);
    } else  {
        alert("Seuls le super admin peut modifier un admin");
    }
  };

  const deleteAdmin = async (adminId) => {
    if (role === "super admin"){
    try {
      Swal.fire({
        title: "Etes vous sûr !",
        text: "Vous êtes sur le point de suprimer cet administrateur, ",
        icon: "warning",
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: "Oui, Supprimer l'admin",
      }).then((result) => {
        if (result.isDenied) {
          // Requête DELETE vers l'API backend
          const token = localStorage.getItem("token"); // Récupération du token d'authentification
          // const token = "Matoub_3emek";
          const response = axios.delete(
            `https://api.az-tenders.com/admin/admin/${adminId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            Swal.fire("Admin supprimé", "", "success");
            getMyTable(); // Actualiser les données après la suppression
          }
        }
      });
    } catch (error) {
      console.error("Erreur lors de la suppression de l'admin :", error);
      Swal.fire("Erreur lors de la suppressio", "", "error");
    }
  } else  {
    alert("Seuls le super admin peut supprimer un admin");
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
            <h5 className="text-heading-6 md:text-heading-5 font-Poppins">
              {" "}
              Administrateurs{" "}
            </h5>
            <Link to="/admin/administrateurs/ajout">
              <Button color="success" className="w-full">
                Ajouter un Admin
              </Button>
            </Link>
          </div>
          <div className="">
            <TableModeleButton
              headers={[
                { column: "nom", label: "Nom" },
                { column: "prenom", label: "Prenom" },
                { column: "tel", label: "Telephone" },
                { column: "email", label: "E-Mail" },
                { column: "wilaya", label: "Wilaya" },
                { column: "nbrTenders", label: "Nb Tenders" },
              ]}
              data={dataMyTable}
              isLoading={isLoading}
              loadingTag={<h1>Loading...</h1>}
              edit_func={editAdmin}
              delete_func={deleteAdmin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Administrateurs;
