// ***************************THIS COMPONONENT IS UNUSED ***********************************************

import React, { useState } from 'react';
import { Button } from 'keep-react';
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const TableComponent = ({ Secteurs }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2); // Par défaut, 2 éléments par page

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(Secteurs.length / itemsPerPage);

  // Gestion des données affichées
  const indexOfLastItem = currentPage * itemsPerPage + 1;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Secteurs.slice(indexOfFirstItem, indexOfLastItem);  // Utiliser currentItems pour le rendu
  
  // Change le nombre d'éléments par page
  const handleItemsPerPageChange = (event) => {
    const newValue = Number(event.target.value);
    if (newValue > 0) {
      setItemsPerPage(newValue);
      setCurrentPage(1); // Réinitialiser à la page 1 lors du changement d'éléments par page
      console.log(currentItems);
    }
  };

  return (
    <div className="container flex flex-col justify-center mt-5 mb-10">
      <div className="mb-4">
        <label className="mr-2">Éléments par page :</label>
        <input
          type="number"
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          min="1"  // Assure qu'on ne peut pas entrer une valeur inférieure à 1
        />
      </div>
      
      <table className="table datatable w-full border border-black text-center">
        <thead>
          <tr>
            <th scope="col" className="border-b border-black p-2">Nom Prenom</th>
            <th scope="col" className="border-b border-black p-2">Email</th>
            <th scope="col" className="w-30% border-b border-black p-2">Domaines d'expertise</th>
            <th scope="col" className="border-b border-black p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((Secteur) => (
              <tr key={Secteur.id}>
                <td className="border-b border-black p-2">{Secteur.title}</td>
                <td className="border-b border-black p-2">{Secteur.description}</td>
                <td className="border-b border-black p-2">{Secteur.type}</td>
                <td className="border-b border-black p-2">
                  <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <a href={`./Admin${Secteur._id}`}>
                      <Button color='primary' className='m-1'>
                        <FaPencilAlt />
                      </Button>
                    </a>
                    <Button color='error' onClick={() => handleDelete(Secteur.id)} className='m-1'>
                      <FaTrashAlt />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border-b border-black p-2">Aucun professeur trouvé.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-center space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 bg-gray-800 text-white rounded disabled:opacity-50"
        >
          Précédent
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`p-2 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="p-2 bg-gray-800 text-white rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default TableComponent;
