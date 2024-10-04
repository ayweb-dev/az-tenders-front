// ********************Je l'ai garder on sais jamais*********************************************
import React, { useState, useEffect } from "react";
import NavbarUser from "../../components/NavbarUser";
import UserTable from "../../components/Table/UserTable";
import Filter from "../../components/Table/Filter"; // Importation du filtre
import { Data } from "../../components/Table/data"; // Données
const Dashboard = () => {
  const [item, setItem] = useState(Data); // Liste des éléments à afficher
  const [selectedGenre, setSelectedGenre] = useState(null); // Genre sélectionné
  const [selectedYear, setSelectedYear] = useState(null); // Année sélectionnée

  // Obtenir les genres et années uniques depuis les données
  const menuGenres = [...new Set(Data.flatMap((Val) => Val.genres))]; // Liste des genres
  const menuYears = [...new Set(Data.map((Val) => Val.year))]; // Liste des années

  // Effet pour appliquer les filtres lorsqu'ils changent
  useEffect(() => {
    let filteredItems = Data; // Par défaut, on affiche toutes les données
    //alert(filteredItems.length)

    if (selectedGenre) {
      filteredItems = filteredItems.filter((item) =>
        item.genres.includes(selectedGenre)
      ); // Filtrer par genre
    }

    if (selectedYear) {
      filteredItems = filteredItems.filter(
        (item) => item.year === String(selectedYear)
      ); // Filtrer par année
    }
    //alert(filteredItems.length);
    setItem(filteredItems);

    setCurrentPage(1); // Réinitialiser la pagination après filtrage
  }, [selectedGenre, selectedYear]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Par défaut, 2 éléments par page

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(Data.length / itemsPerPage);

  // Gestion des données affichées
  const indexOfLastItem = currentPage * itemsPerPage + 1;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage - 1;
  const currentItems = item.slice(indexOfFirstItem, indexOfLastItem); // Utiliser currentItems pour le rendu

  // Change le nombre d'éléments par page
  const handleItemsPerPageChange = (event) => {
    const newValue = Number(event.target.value);
    if (newValue > 0) {
      setItemsPerPage(newValue);
      setCurrentPage(1); // Réinitialiser à la page 1 lors du changement d'éléments par page
    }
  };
  // Définir la plage de pages à afficher
  const pageRange = 3; // Nombre de pages avant et après la page actuelle
  const startPage = Math.max(currentPage - pageRange, 1);
  const endPage = Math.min(currentPage + pageRange, totalPages);

  return (
    <div className="text-black min-h-screen dark:bg-darkColor pb-10">
      <NavbarUser />
      <div className="container-fluid">
        <div className="row">
          <h1 className="col-12 text-center m-5 fw-bold">AZ Tenders</h1>
          <Filter
            filterGenre={setSelectedGenre}
            filterYear={setSelectedYear}
            setItem={setItem}
            menuGenres={menuGenres}
            menuYears={menuYears}
          />
          <div className="flex justify-center mb-4">
            <div className="flex items-center">
              <label className="mr-2 dark:text-white">
                Éléments par page :
              </label>
              <input
                type="number"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                min="1" // pas de valeur inférieure à 1
                className="ml-2 p-1 border border-gray-300 rounded"
              />
            </div>
          </div>
          <UserTable item={currentItems} />

          {/* Pagination */}
          <div className="mt-4 flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 bg-gray-800 text-white rounded disabled:opacity-50"
            >
              Précédent
            </button>
            <button
              disabled={currentPage < 4}
              className="p-2 bg-gray-800 text-white rounded disabled:hidden"
            >
              ...
            </button>
            {[...Array(endPage - startPage + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`p-2 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage > totalPages - 4}
              className="p-2 bg-gray-800 text-white rounded disabled:hidden"
            >
              ...
            </button>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 bg-gray-800 text-white rounded disabled:opacity-50"
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
