import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  useEffect(() => {
    const fetchStat = async () => {
      const response = await axios.get("https://api.az-tenders.com/admin/stats");
      setStats(response.data.data);
    };

    fetchStat();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6  dark:text-black dark:bg-darkColor text-center mx-auto">
      <Link
        to="/admin/tenders"
        className="h-[120px] w-[283px] border border-gray-200 bg-white text-dark p-5 rounded-lg shadow-md hover:bg-gray-200"
      >
        <h2 className="text-xl font-bold mb-1">
          <span className="mr-3 font-Cabin text-3xl text-green-700">
            {stats.numberOfTenders}
          </span>{" "}
          Tenders
        </h2>
        <h4 className="text-lg font-bold mb-1 text-gray-700">
          dans
          <span className="mx-1 font-Cabin text-xl text-green-700">
            {stats.numberOfSectors}
          </span>{" "}
          Secteurs
        </h4>
      </Link>

      <Link
        to="/admin/contacts"
        className="h-[120px] w-[283px] border border-gray-200 bg-white text-dark p-7 rounded-lg shadow-md hover:bg-gray-200"
      >
        <h2 className="text-xl font-bold mb-1">
          <span className="mr-3 font-Cabin text-3xl text-green-700">
            {stats.numberOfNewMessages}
          </span>{" "}
          Nouveaux messages
        </h2>
      </Link>

      <Link
        to="/admin/utilisateurs"
        className="h-[120px] w-[283px] border border-gray-200 bg-white text-dark p-8 rounded-lg shadow-md hover:bg-gray-200"
      >
        <h2 className="text-xl font-bold mb-1">
          <span className="mr-3 font-Cabin text-3xl text-green-700">
            {stats.numberOfUsers}
          </span>{" "}
          Utilisateurs
        </h2>
      </Link>

      <Link
        to="/admin/abonnements"
        className="h-[120px] w-[283px] border border-gray-200 bg-white text-dark p-5 rounded-lg shadow-md hover:bg-gray-200"
      >
        <h2 className="text-xl font-bold mb-1">
          <span className="mr-3 font-Cabin text-3xl text-green-700">
            {stats.numberOfAskedSubscriptions}
          </span>{" "}
          Demandes d'abonnement
        </h2>
      </Link>

      <Link
        to="/admin/abonnements"
        className="h-[120px] w-[283px] border border-gray-200 bg-white text-dark p-6 rounded-lg shadow-md hover:bg-gray-200"
      >
        <h2 className="text-xl font-bold mb-1">
          <span className="mr-3 font-Cabin text-3xl text-green-700">
            {stats.numberOfUpdatedSubscriptions}
          </span>{" "}
          Abonnement en cours
        </h2>
      </Link>

      <Link
        to="/admin/abonnements"
        className="h-[120px] w-[283px] border border-gray-200 bg-white text-dark p-8 rounded-lg shadow-md hover:bg-gray-200"
      >
        <h2 className="text-xl font-bold mb-1">
          <span className="mr-3 font-Cabin text-3xl text-green-700">
            {stats.numberOfExpiredSubscriptions}
          </span>{" "}
          Abonnement expiré
        </h2>
      </Link>
    </div>
  );
};

export default AdminDashboard;
