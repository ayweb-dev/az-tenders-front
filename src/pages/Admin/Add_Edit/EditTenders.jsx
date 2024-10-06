import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarAdmin from "../../../components/NavbarAdmin";
import { SideBar } from "../../../components/SideBar";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";

const wilayas = ["Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra",
  "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret",
  "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda", "Skikda",
  "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem",
  "M’Sila", "Mascara", "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj",
  "Boumerdès", "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
  "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent", "Ghardaïa", "Relizane",
  'Timimoune', 'Bordj Badji Mokhtar', 'Ouled Djellal', 'Béni Abbès', 'In Salah', 'In Guezzam',
  'Touggourt', 'Djanet', "El M'Ghair", 'El Meniaa'];

const EditTenderForm = () => {
  const [sectors, setSectors] = useState([]);
  const [selectedSectors, setSelectedSectors] = useState([]);
  // Définition des états pour les champs du formulaire
  const [formData, setFormData] = useState({
    _id: 0,
    title: "",
    entreprise: "",
    anep: "",
    journal: "",
    type: "",
    dateDebut: "",
    dateEchehance: "",
    wilaya: "",
    sectors: [],
    image: null,
  });

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
    const formatDate = (dateString) => {
      if (!dateString) return ''; // Vérifiez si la date existe
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return ''; // Vérifiez si la date est valide
    
      const day = String(date.getDate()).padStart(2, '0'); // Ajoute un 0 devant si nécessaire
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois de 0 à 11, donc +1
      const year = date.getFullYear();
    
      return `${day}/${month}/${year}`; // Format jj/mm/AAAA
    };
    
    const token = localStorage.getItem("token");
    const tenderToEdit = JSON.parse(localStorage.getItem('tenderToEdit'));
    const fetchTender = async () => {
      try {
        const response = await axios.get(`https://api.az-tenders.com/admin/tend/${tenderToEdit}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => {
          const tender = res.data.tender;          
  
          // Mise à jour du formData avec les données récupérées
          setFormData({
            _id: tender._id || '',
            title: tender.title || '',
            entreprise: tender.entreprise || '',
            anep: tender.anep || '',
            journal: tender.journal || '',
            type: tender.type || '',
            dateDebut: formatDate(tender.dateDebut) || '',
            dateEchehance: formatDate(tender.dateEchehance) || '',
            wilaya: tender.wilaya || '',
            sectors: tender.sectors || '',
            image: tender.image || '',
          });
  
          // Mise à jour de selectedSectors avec les secteurs du tender
          setSelectedSectors(tender.sectors.map(sector => sector._id));
      })

      } catch (error) {
        console.error("Erreur lors de la récupération du tender", error);
      }
    };
    fetchTender();
    const fetchSectors = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('https://api.az-tenders.com/admin/sectors', 
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

    
    fetchSectors();
  }, []
  );

  const [message, setMessage] = useState(null);

  

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Gestion de l'upload de l'image
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSectorChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedSectors([...selectedSectors, value]);
    } else {
      setSelectedSectors(selectedSectors.filter(id => id !== value));
    }

    // Mettre à jour formData.sectors
    setFormData({
      ...formData,
      sectors: checked ? [...selectedSectors, value] : selectedSectors.filter(id => id !== value)
    });
  };

  // Gestion de l'envoi du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();        

    try {
      const token = localStorage.getItem("token");
      // Envoi des données vers l'API
      const response = await axios.put(`https://api.az-tenders.com/admin/tender/${formData._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Gestion du succès
      if (response.status === 200) {
        alert("Tender ajouté avec succès !");
        localStorage.removeItem('tenderToEdit');
        navigate("/admin")
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du tender:", error);
      setMessage("Erreur lors de l'ajout du tender.");
    }
  };

  return (
    <div className="dark:text-white dark:bg-gray-900 min-h-screen">
      <NavbarAdmin />
      <div className="flex">
        <SideBar className="w-1/4" />
        <div className="w-3/4 p-8">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Modifier un Tender</h2>
            {message && <p className="mb-4 text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">

              {/* Titre */}
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">Titre</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-300"
                />
              </div>

              {/* Entreprise */}
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">Entreprise</label>
                <input
                  type="text"
                  name="entreprise"
                  value={formData.entreprise}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-300"
                />
              </div>

              {/* Numéro ANEP */}
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">Numéro ANEP</label>
                <input
                  type="text"
                  name="anep"
                  value={formData.anep}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-300"
                />
              </div>

              {/* Journal */}
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">Journal</label>
                <input
                  type="text"
                  name="journal"
                  value={formData.journal}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-300"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-300"
                >
                  <option value="">Sélectionner</option>
                  <option value="appel d'offre">Appel d'offre</option>
                  <option value="concours">Concours</option>
                  <option value="avis d'attribution">Avis d'attribution</option>
                  <option value="annulation">Annulation</option>
                  <option value="consultation">Consultation</option>
                  <option value="prorogation de delais">Prorogation de délais</option>
                  <option value="infructuosite">Infructuosite</option>
                  <option value="mise en demeure">Mise en demeure</option>
                  <option value="vente et adjudication">Vente et adjudication</option>

                </select>
              </div>

              {/* Date de début */}
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">Date de début</label>
                <input
                  type="date"
                  name="dateDebut"
                  value={formData.dateDebut}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-300"
                />
              </div>

              {/* Date d'échéance */}
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">Date d'échéance</label>
                <input
                  type="date"
                  name="dateEchehance"
                  value={formData.dateEchehance}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-300"
                />
              </div>

              {/* Wilaya */}
              <div className="mb-4">
                <label className="text-gray-700 font-semibold">
                  Wilaya
                </label>
                <div className="relative text-gray-300">
                  <select
                    name="wilaya"
                    value={formData.wilaya}
                    onChange={handleChange}
                    className="block w-full bg-white dark:bg-gray-800  border border-black rounded-lg shadow-sm mt-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  >
                    <option value="" disabled>

                    </option>
                    {wilayas.map((wilaya, index) => (
                      <option key={wilaya} value={wilaya}>
                        {`${(index + 1).toString().padStart(2, '0')}-${wilaya}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Secteurs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Secteurs:</label>
                <div className="mt-1 grid grid-cols-2 gap-4"> {/* Grid pour un meilleur alignement */}
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
                      <label htmlFor={sector._id} className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                        {sector.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div>
                <label className="block text-gray-600 dark:text-gray-300 mb-2">Image (Ajouté une nouvelle sinon garder l'ancienne)</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-300"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-600"
              >
                Ajouter le Tender
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default EditTenderForm;