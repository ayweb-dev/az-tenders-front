import axios from "axios";
import { StepLine, StepPoint, Steps } from "keep-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NavbarUser from "../../components/NavbarUser";

const SubscriptionRequest = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [form, setForm] = useState({
    type: "",
    // dateDeb: "",
    // dateFin: "",
    sectors: [],
  });
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);

    // Fetch available sectors from the server
    const fetchSectors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://api.az-tenders.com/admin/sectors",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSectors(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des secteurs:", error);
      }
    };

    fetchSectors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => {
      if (name === "type" && value === "Gold") {
        // Si le type est "Gold", sélectionner tous les secteurs
        return {
          ...prevForm,
          [name]: value,
          sectors: sectors.map((sector) => sector._id),
        };
      } else if (name === "type") {
        return { ...prevForm, [name]: value, sectors: [] };
      } else {
        return { ...prevForm, [name]: value };
      }
    });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setForm((prevForm) => {
      const newSectors = checked
        ? [...prevForm.sectors, value]
        : prevForm.sectors.filter((sector) => sector !== value);
      return { ...prevForm, sectors: newSectors };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.type === "Basic" && form.sectors.length < 1) {
        Swal.fire({
          title: "Nombre de secteurs invalide",
          text: "L'abonnement Basic inclu au moins un secteur, Veuillez compléter votre sélection.",
          icon: "info",
          confirmButtonText: "OK",
        });
        return;
      }

      if (form.type === "Silver" && form.sectors.length < 6) {
        Swal.fire({
          title: "Nombre de secteurs invalide",
          text: "L'abonnement Silver inclu au moins un 6 secteurs, Veuillez compléter votre sélection.",
          icon: "info",
          confirmButtonText: "OK",
        });
        return;
      }

      if (form.type === "Gold" && form.sectors.length !== sectors.length) {
        Swal.fire({
          title: "Nombre de secteurs invalide",
          text: "L'abonnement Gold inclu tous les secteurs, Veuillez compléter votre sélection.",
          icon: "info",
          confirmButtonText: "OK",
        });
        return;
      }

      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://api.az-tenders.com/user/askSubscription",
        form,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "success") {
        Swal.fire({
          title: "Succès!",
          text: "Votre demande d'abonnement a été envoyée avec succès.",
          icon: "success",
          confirmButtonText: "OK",
        });
        setForm({ type: "", dateDeb: "", dateFin: "", sectors: [] });
      } else {
        Swal.fire({
          title: "Erreur!",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la demande d'abonnement:", error);
      Swal.fire({
        title: "Erreur!",
        text: "Erreur lors de la demande d'abonnement.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="text-black min-h-screen dark:bg-darkColor font-Poppins">
      <NavbarUser />
      <div>
        <h3 className="text-center text-black dark:text-slate-100 text-heading-6 md:text-heading-5 font-Poppins mt-9 mb-5">
          Demande d'abonnement
        </h3>
        <div className="space-y-6 m-10 md:mx-20 overflow-x-scroll">
          <Steps className="mb-4">
            <StepPoint completed="true">
              <p className="flex size-5 items-center justify-center rounded-full border border-current text-body-5 font-medium">
                1
              </p>
              <p className="text-body-4 font-medium">Demander un abonnement</p>
            </StepPoint>
            <StepLine completed="false" />
            <StepPoint completed="false">
              <p className="flex size-5 items-center justify-center rounded-full border border-current text-body-5 font-medium">
                2
              </p>
              <p className="text-body-4 font-medium">
                Confirmation par l'admin
              </p>
            </StepPoint>
            <StepLine completed="false" />
            <StepPoint completed="false">
              <p className="flex size-5 items-center justify-center rounded-full border border-current text-body-5 font-medium">
                3
              </p>
              <p className="text-body-4 font-medium">Paiement</p>
            </StepPoint>
          </Steps>
        </div>
      </div>
      {isLoggedIn ? (
        <form
          className="max-w-2xl mx-auto bg-white dark:bg-darkColor md:shadow-md p-6 rounded-md shadow-lg dark:shadow-none dark:pb-48 mb-36 dark:mb-0 dark:shadow-gray-600"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="type"
            >
              Type d'abonnement
            </label>
            <select
              id="type"
              name="type"
              value={form.type}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3  text-gray-700 dark:text-slate-300 dark:bg-darkColor leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Sélectionnez un type</option>
              <option value="Essai">Essai(Une seule fois)</option>
              <option value="Basic">Basic</option>
              <option value="Silver">Silver</option>
              <option value="Gold">Gold</option>
            </select>
          </div>

          {/**
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="mb-4 md:mr-2">
              <label
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                htmlFor="dateDeb"
              >
                Date de début
              </label>
              <input
                type="date"
                id="dateDeb"
                name="dateDeb"
                value={form.dateDeb}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-slate-300 dark:bg-darkColor leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
                htmlFor="dateFin"
              >
                Date de fin
              </label>
              <input
                type="date"
                id="dateFin"
                name="dateFin"
                value={form.dateFin}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-slate-300 dark:bg-darkColor leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>
          */}
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-300 font-bold mb-2"
              htmlFor="sectors"
            >
              Secteurs
            </label>
            <div>
              {sectors.map((sector) => (
                <div key={sector._id} className="mb-2">
                  <input
                    type="checkbox"
                    id={sector._id}
                    name="sectors"
                    value={sector._id}
                    checked={form.sectors.includes(sector._id)}
                    onChange={handleCheckboxChange}
                    className="mr-2 leading-tight"
                    disabled={form.type === "Gold"}
                  />
                  <label
                    htmlFor={sector._id}
                    className="text-gray-700 dark:text-gray-300"
                  >
                    {sector.title}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-green-700 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none w-full focus:shadow-outline"
            >
              Envoyer la demande
            </button>
          </div>
        </form>
      ) : (
        <p className="text-center text-red-500">
          Vous devez être connecté pour demander un abonnement.
        </p>
      )}
    </div>
  );
};

export default SubscriptionRequest;
