import axios from "axios";
import { Button } from "keep-react";
import { useEffect, useState } from "react";
import { CgAddR } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importer SweetAlert2
import NavbarAdmin from "../../components/NavbarAdmin";
import { SideBar } from "../../components/SideBar";
import TableModeleButton from "../../components/Table/Modele/TableModeleButton";

const Secteurs = () => {
  const [dataMyTable, setdataMyTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sectorTitle, setSectorTitle] = useState(""); // État pour le titre du secteur
  const [currentSectorId, setCurrentSectorId] = useState(null); // État pour l'ID du secteur en cours de modification

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
      const token = localStorage.getItem("token");
      // Faire une requête GET vers votre backend pour récupérer les secteurs
      const response = await axios.get("https://api.az-tenders/admin/sectors", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Mettre à jour l'état avec les données récupérées
      setdataMyTable(response.data || []);
    } catch (error) {
      console.error("Erreur lors de la récupération des secteurs :", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour gérer le changement de l'input
  const handleInputChange = (e) => {
    setSectorTitle(e.target.value);
  };

  // Fonction pour gérer l'ajout d'un secteur
  const addSector = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://api.az-tenders/admin/sector",

        {
          title: sectorTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Secteur ajouté avec succès !",
        });
        resetForm(); // Réinitialiser le formulaire
        getMyTable(); // Actualiser les données après l'ajout
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du secteur :", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de l'ajout du secteur",
      });
    }
  };

  // Fonction pour gérer la modification d'un secteur
  const updateSector = async (newTitle) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `https://api.az-tenders/admin/sector/${currentSectorId}`,
        {
          title: newTitle,
        },
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
          text: "Secteur modifié avec succès !",
        });
        resetForm(); // Réinitialiser le formulaire
        getMyTable(); // Actualiser les données après la modification
      }
    } catch (error) {
      console.error("Erreur lors de la modification du secteur :", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de la modification du secteur",
      });
    }
  };

  // Fonction pour afficher la popup de modification
  const editSector = (sector) => {
    setCurrentSectorId(sector._id);
    setSectorTitle(sector.title);

    Swal.fire({
      title: "Modifier le secteur",
      html: `
        <input id="sectorTitle" class="swal2-input" placeholder="Intitulé" value="${sectorTitle}">
      `,
      showCancelButton: true,
      confirmButtonText: "Modifier",
      cancelButtonText: "Annuler",
      preConfirm: () => {
        const newTitle = Swal.getPopup().querySelector("#sectorTitle").value;
        if (!newTitle) {
          Swal.showValidationMessage("Veuillez entrer un intitulé");
        }
        return newTitle;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        updateSector(result.value);
      }
    });
  };

  // Fonction pour réinitialiser le formulaire
  const resetForm = () => {
    setSectorTitle("");
    setCurrentSectorId(null);
  };

  const deleteSector = async (sectorId) => {
    Swal.fire({
      title: "Êtes-vous sûr?",
      text: "Vous ne pourrez pas annuler cette action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, supprimer!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token"); // Récupération du token d'authentification
          const response = await axios.delete(
            `https://api.az-tenders/admin/sector/${sectorId}`,
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
              text: "Secteur supprimé avec succès !",
            });
            getMyTable(); // Actualiser les données après la suppression
          }
        } catch (error) {
          console.error("Erreur lors de la suppression du secteur :", error);
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: "Erreur lors de la suppression du secteur",
          });
        }
      }
    });
  };

  return (
    <div className="dark:text-white dark:bg-darkColor min-h-screen">
      <div>
        <NavbarAdmin />
      </div>
      <div className="flex">
        <SideBar className="w-1/4" />
        <div className="w-3/4">
          <h2 className="text-heading-6 md:text-heading-5 m-6 font-Poppins font-bold">
            Secteurs
          </h2>
          <div className="grid grid-cols-12 p-6 gap-0 md:gap-2 md:grid-cols-3">
            <h5 className="hidden text-heading-6  font-Poppins md:block">
              Ajouter un secteur
            </h5>
            <input
              type="text"
              placeholder="Intitulé"
              className="mr-5 rounded-lg col-span-10 md:col-span-1"
              value={sectorTitle || ""} // S'assurer que la valeur est toujours définie
              onChange={handleInputChange}
            />
            <Button
              color="success"
              className=" lg:mt-0 md:mt-0 col-span-2 md:col-span-1 h-full"
              onClick={addSector} // L'appel à la fonction pour ajouter un secteur
            >
              <CgAddR className="inline  md:mr-3 mr-0" />{" "}
              <span className="hidden md:inline-block">Ajouter</span>
            </Button>
          </div>
          <div>
            <TableModeleButton
              headers={[{ column: "title", label: "Intitulé" }]}
              data={dataMyTable}
              isLoading={isLoading}
              loadingTag={<span>Loading...</span>}
              delete_func={deleteSector}
              edit_func={editSector} // Ajout de la fonction d'édition
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Secteurs;
