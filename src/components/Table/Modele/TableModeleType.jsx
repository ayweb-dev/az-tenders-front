import { Button } from "keep-react";
import React, { useState } from "react";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";

const TableHeader = ({
  headers,
  onSortColumnChange,
  sortColumn,
  sortDirection,
}) => {
  const handleHeaderClick = (column) => {
    onSortColumnChange(column);
  };
  return (
    <thead className="bg-gray-100 dark:bg-gray-300 text-left">
      <tr>
        {headers.map((header) => (
          <th
            key={header.column}
            onClick={() => handleHeaderClick(header.column)}
            className="cursor-pointer px-4 py-2 text-gray-600 font-semibold"
          >
            {header.label}{" "}
            {sortColumn === header.column && (
              <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
            )}
          </th>
        ))}
        <th className="px-4 py-2 text-gray-600 font-semibold">Actions</th>
      </tr>
    </thead>
  );
};

const TableBody = ({
  headers,
  data,
  currentPage,
  itemsPerPage,
  sortColumn,
  sortDirection,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  const sortedData = [...data].sort((a, b) => {
    const columnA = a[sortColumn];
    const columnB = b[sortColumn];

    if (columnA < columnB) {
      return sortDirection === "asc" ? -1 : 1;
    }
    if (columnA > columnB) {
      return sortDirection === "asc" ? 1 : -1;
    }
    return 0;
  });

  const paginatedData = sortedData.slice(startIdx, endIdx);

  return (
    <tbody>
      {!isLoading &&
        paginatedData.map((item, index) => (
          <tr
            key={index}
            className={`${
              index % 2 === 0
                ? "bg-gray-50 dark:bg-gray-200"
                : "bg-white dark:bg-gray-300"
            }`}
          >
            {headers.map((header) => (
              <td key={header.column} className="px-4 py-2 text-gray-700">
                {Array.isArray(item[header.column])
                  ? item[header.column].map((sector) => sector.title).join(", ")
                  : item[header.column]}
              </td>
            ))}
            <td className="px-4 py-2 text-gray-700">
              <Button
                color="primary"
                onClick={() => onEdit(item._id)}
                className="my-1"
              >
                <FaPencilAlt />
              </Button>
              <Button color="error" onClick={() => onDelete(item._id)}>
                <FaTrashAlt />
              </Button>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

const Pagination = ({
  currentPage,
  totalNumberOfPages,
  handlePageChange,
  maxPageNumbers = 5,
}) => {
  const pageNumbers = Array.from(
    { length: totalNumberOfPages },
    (_, index) => index + 1
  );

  const renderPageNumbers = () => {
    if (totalNumberOfPages <= maxPageNumbers) {
      return pageNumbers;
    }

    const middleIndex = Math.floor(maxPageNumbers / 2);

    if (currentPage <= middleIndex) {
      return [
        ...pageNumbers.slice(0, maxPageNumbers - 1),
        "...",
        totalNumberOfPages,
      ];
    } else if (currentPage >= totalNumberOfPages - middleIndex) {
      return [1, "...", ...pageNumbers.slice(-maxPageNumbers + 1)];
    } else {
      const startPage = currentPage - middleIndex + 1;
      const endPage = currentPage + middleIndex - 1;
      return [
        1,
        "...",
        ...pageNumbers.slice(startPage, endPage),
        "...",
        totalNumberOfPages,
      ];
    }
  };

  return (
    <div className="flex justify-between items-center mt-4 dark:bg-darkColor dark:text-white">
      <p className="text-gray-600 hidden md:block lg:block">
        Page {currentPage} of {totalNumberOfPages}
      </p>
      <ul className="flex space-x-2">
        <li>
          <button
            className={`px-3 py-1 border border-black dark:border-white rounded-lg ${
              currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>
        </li>
        {renderPageNumbers().map((pageNumber, index) => (
          <li key={index}>
            <button
              className={`px-3 py-1 border border-black dark:border-white rounded-lg ${
                currentPage === pageNumber ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`px-3 py-1 border border-black dark:border-white rounded-lg ${
              currentPage === totalNumberOfPages
                ? "bg-gray-200 cursor-not-allowed"
                : ""
            }`}
            onClick={() => handlePageChange(totalNumberOfPages)}
            disabled={currentPage === totalNumberOfPages}
          >
            {">"}
          </button>
        </li>
      </ul>
    </div>
  );
};

const types = [
  "appel d'offre",
  "consultation",
  "avis d'attribution",
  "concours",
  "annulation",
  "prorogation de delais",
  "infructuosite",
  "mise en demeure",
  "vente et adjudication",
];

const Table = ({
  headers,
  data,
  isLoading,
  loadingTag,
  edit_func,
  delete_func,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState(headers[0].column);
  const [sortDirection, setSortDirection] = useState("asc");
  const [selectedType, setSelectedType] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Détecter si c'est mobile

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filteredByType = selectedType
    ? data.filter((item) => item.type === selectedType)
    : data;
  const filteredData = filteredByType.filter((item) =>
    headers.some((header) =>
      String(item[header.column])
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
  );

  const totalNumberOfPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortColumnChange = (column) => {
    if (sortColumn === column) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen p-4 bg-white shadow-md rounded-lg dark:bg-darkColor">
      {/* Filtre de types */}
      <div className="flex items-center justify-center flex-col mb-4">
        {isMobile ? (
          <select
            className="p-2 border rounded dark:text-black"
            value={selectedType || ""}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="">Sélectionnez un type</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        ) : (
          <>
            <div className="flex md:flex-wrap space-x-4 justify-center overflow-x-scroll">
              {types.map((type) => (
                <button
                  key={type}
                  className={`p-2 m-2 border ${
                    selectedType === type
                      ? "bg-green-500 text-white"
                      : "bg-gray-700 text-white"
                  }`}
                  onClick={() => {
                    setSelectedType(type);
                    setCurrentPage(1);
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
            <button
              className="p-2 m-2 border bg-blue-500 text-white"
              onClick={() => setSelectedType(null)} // Réinitialiser le filtre
            >
              Reset Filter
            </button>
          </>
        )}
      </div>

      {/* Barre de contrôle pour la recherche et la pagination */}
      <div className="flex justify-between mb-4">
        <div>
          <label className="text-gray-600 dark:text-white">
            <span className="hidden md:inline">Show</span>
          </label>
          <select
            className="ml-2 pl-3 py-1 border rounded dark:text-black"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value, 10));
              setCurrentPage(1);
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div>
          <input
            className="py-1 lg:px-3 md:px-3 border rounded"
            type="text"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search"
          />
        </div>
      </div>

      {/* Tableau */}
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <TableHeader
            headers={headers}
            onSortColumnChange={handleSortColumnChange}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
          <TableBody
            headers={headers}
            data={filteredData}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            isLoading={isLoading}
            loadingTag={loadingTag}
            onEdit={edit_func}
            onDelete={delete_func}
          />
        </table>
      </div>

      {isLoading && <p className="text-center py-4">{loadingTag}</p>}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalNumberOfPages={totalNumberOfPages}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default Table;
