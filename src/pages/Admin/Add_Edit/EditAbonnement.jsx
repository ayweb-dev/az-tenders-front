import axios from "axios";
import { Button } from "keep-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { SideBar } from "../../../components/SideBar";

const AjoutAbonnement = () => {
  const [users, setUsers] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedSectors, setSelectedSectors] = useState([]);
  const [type, setType] = useState("");
  const [dateDeb, setDateDeb] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const SubTo = JSON.parse(localStorage.getItem("SubToEdit"));
  localStorage;

  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
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
    const fetchSubscription = async () => {
      try {
        const response = await axios
          .get(`https://api.az-tenders/admin/abo/${SubTo}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            const subscription = res.data.subscriptions;

            // Pré-remplissage des champs avec les valeurs de l'abonnement
            setSelectedUser(subscription.user._id);
            setType(subscription.type);
            setSelectedSectors(
              subscription.sectors.map((sector) => sector._id)
            );
            setDateDeb(subscription.dateDeb.split("T")[0]); // format YYYY-MM-DD
            setDateFin(subscription.dateFin.split("T")[0]);
          });
      } catch (error) {
        console.error("Erreur lors de la récupération de l'abonnement", error);
      }
    };

    const fetchSectors = async () => {
      try {
        const response = await axios.get(
          "https://api.az-tenders/admin/sectors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSectors(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des secteurs", error);
      }
    };

    fetchSubscription();
    fetchSectors();
  }, []);

  const handleSectorChange = (e) => {
    const { value, checked } = e.target;
    setSelectedSectors((prevSelected) => {
      return checked
        ? [...prevSelected, value]
        : prevSelected.filter((id) => id !== value);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(dateDeb) > new Date(dateFin)) {
      Swal.fire({
        title: "Erreur !",
        text: "La date de début ne peut pas être après la date de fin.",
        icon: "error",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.put(
        `https://api.az-tenders/admin/abonnement/${SubTo}`,
        {
          userId: selectedUser,
          type,
          sectors: selectedSectors,
          dateDeb,
          dateFin,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          title: "Succès !",
          text: "Abonnement mis à jour avec succès",
          icon: "success",
        });
        localStorage.removeItem("SubToEdit");
        navigate("/admin/abonnements");
      }
    } catch (error) {
      Swal.fire(error.response.data.message, "", "error");
    } finally {
      setIsLoading(false);
      localStorage.removeItem("SubToEdit");
    }
  };

  const handleDateDebChange = (e) => {
    const newDateDeb = e.target.value;
    setDateDeb(newDateDeb);

    // Calculate dateFin as one year from dateDeb
    const dateDebObj = new Date(newDateDeb);
    const dateFinObj = new Date(dateDebObj);
    dateFinObj.setFullYear(dateDebObj.getFullYear() + 1);
    setDateFin(dateFinObj.toISOString().split("T")[0]);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavbarAdmin />
      <div className="flex">
        <SideBar className="w-1/4 min-h-screen" />
        <div className="w-3/4 p-6">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
              Modifier un Abonnement
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Type d'abonnement:
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Selectionner un type</option>
                    <option value="Essai">Essai</option>
                    <option value="Basic">Base</option>
                    <option value="Silver">Argent</option>
                    <option value="Gold">Gold</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Secteurs:
                </label>
                <div className="mt-1 grid grid-cols-2 gap-4">
                  {sectors.map((sector) => (
                    <div key={sector._id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={sector._id}
                        value={sector._id}
                        checked={selectedSectors.includes(sector._id)}
                        onChange={handleSectorChange}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={sector._id}
                        className="ml-2 block text-sm text-gray-900 dark:text-gray-300"
                      >
                        {sector.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date de début:
                  </label>
                  <input
                    type="date"
                    value={dateDeb}
                    onChange={handleDateDebChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Date de fin:
                  </label>
                  <input
                    type="date"
                    value={dateFin}
                    onChange={(e) => setDateFin(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  color="success"
                  disabled={isLoading}
                  className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                  {isLoading
                    ? "Mise à jour en cours..."
                    : "Mettre à jour Abonnement"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjoutAbonnement;
