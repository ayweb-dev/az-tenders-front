import React from "react";

const Filter = ({ filterGenre, filterYear, menuGenres, menuYears }) => {
  return (
    <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }} >
      {/* Dropdown pour les genres */}
      <select onChange={(e) => filterGenre(e.target.value)} style={{ marginRight: '10px' }} className="text-black dark:bg-darkColor dark:text-white">
        <option value="">Tous les genres</option>
        {menuGenres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Dropdown pour les années */}
      <select onChange={(e) => filterYear(e.target.value)} style={{ marginRight: '10px' }} className="text-black dark:bg-darkColor dark:text-white">
        <option value="">Toutes les années</option>
        {menuYears.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;




