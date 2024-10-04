import React, { useState, useEffect } from "react";
import TableModele from "../../components/Table/Modele/TableModele";
import NavbarAdmin from "../../components/NavbarAdmin";
import { SideBar } from "../../components/SideBar";

function Utilisateurs() {
  const [dataMyTable, setdataMyTable] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMyTable();
  }, []);

  useEffect(() => {
    getMyTable();
  }, []);

  const getMyTable = async (pdateFrom, pdateTo) => {
    try {
      setIsLoading(true);
      const response = [
        { ID: 1, Name: "John Doe", Title: "Software Engineer" },
        { ID: 2, Name: "Jane Smith", Title: "Product Manager" },
        { ID: 3, Name: "Bob Johnson", Title: "UI/UX Designer" },
        { ID: 4, Name: "Alice Williams", Title: "Data Scientist" },
        { ID: 5, Name: "Charlie Brown", Title: "DevOps Engineer" },
        { ID: 6, Name: "Eva Davis", Title: "QA Tester" },
        { ID: 7, Name: "Frank White", Title: "Business Analyst" },
        { ID: 8, Name: "John Doe", Title: "Software Engineer" },
        { ID: 9, Name: "Jane Smith", Title: "Product Manager" },
        { ID: 10, Name: "Bob Johnson", Title: "UI/UX Designer" },
        { ID: 11, Name: "Alice Williams", Title: "Data Scientist" },
        { ID: 12, Name: "Charlie Brown", Title: "DevOps Engineer" },
        { ID: 13, Name: "Eva Davis", Title: "QA Tester" },
        { ID: 14, Name: "Frank White", Title: "Business Analyst" },
        { ID: 15, Name: "John Doe", Title: "Software Engineer" },
        { ID: 16, Name: "Jane Smith", Title: "Product Manager" },
        { ID: 17, Name: "Bob Johnson", Title: "UI/UX Designer" },
        { ID: 18, Name: "Alice Williams", Title: "Data Scientist" },
        { ID: 19, Name: "Charlie Brown", Title: "DevOps Engineer" },
        { ID: 20, Name: "Eva Davis", Title: "QA Tester" },
        { ID: 21, Name: "Frank White", Title: "Business Analyst" },
        { ID: 22, Name: "John Doe", Title: "Software Engineer" },
        { ID: 23, Name: "Jane Smith", Title: "Product Manager" },
        { ID: 24, Name: "Bob Johnson", Title: "UI/UX Designer" },
        { ID: 25, Name: "Alice Williams", Title: "Data Scientist" },
        { ID: 26, Name: "Charlie Brown", Title: "DevOps Engineer" },
        { ID: 27, Name: "Eva Davis", Title: "QA Tester" },
        { ID: 28, Name: "Frank White", Title: "Business Analyst" },
        { ID: 29, Name: "John Doe", Title: "Software Engineer" },
        { ID: 30, Name: "Jane Smith", Title: "Product Manager" },
        { ID: 31, Name: "Bob Johnson", Title: "UI/UX Designer" },
        { ID: 32, Name: "Alice Williams", Title: "Data Scientist" },
        { ID: 33, Name: "Charlie Brown", Title: "DevOps Engineer" },
        { ID: 34, Name: "Eva Davis", Title: "QA Tester" },
        { ID: 35, Name: "Frank White", Title: "Business Analyst" },
      ];
      // Set state values
      setdataMyTable(response || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dark:bg-darkColor dark:text-white">
      <div>
        <NavbarAdmin />
      </div>
      <div className="flex">
        <SideBar className="w-1/4" />
        <div className="w-3/4">
          <TableModele
            headers={[
              { column: "ID", label: "ID" },
              { column: "Name", label: "File Upload" },
              { column: "Title", label: "File Name" },
            ]}
            data={dataMyTable}
            isLoading={isLoading}
            loadingTag={<h1>Loading...</h1>}
          />
        </div>
      </div>
    </div>
  );
}

export default Utilisateurs