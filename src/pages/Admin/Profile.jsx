import axios from "axios";
import { Button } from "keep-react";
import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarAdmin from "../../components/NavbarAdmin";
import { SideBar } from "../../components/SideBar";

const AdminProfile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  localStorage.removeItem("userToEdit");

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://api.az-tenders.com/admin/admin-access",
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
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("https://api.az-tenders.com/admin/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de l'utilisateur",
          error
        );
      }
    };

    fetchUser();
  }, []);

  const confirmDeleteUser = (userId) => {
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cette action supprimera définitivement le compte utilisateur.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        // Appeler la fonction deleteUser si l'utilisateur confirme
        deleteUser(userId);
      } else {
        // Rediriger ou rester sur la page actuelle
        navigate("/admin/profile"); // Cela vous garde sur la page actuelle
      }
    });
  };

  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `https://api.az-tenders.com/admin/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Erreur lors de la suppression de l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur", error);
    }
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="dark:text-white dark:bg-darkColor min-h-screen">
      <div>
        <NavbarAdmin />
      </div>
      <div className="flex">
        <SideBar className="w-1/4" />
        <div className="w-3/4">
          <div className="min-h-screen flex justify-center pt-10 bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-3xl">
              <div className="flex items-center mb-6">
                <div className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center text-4xl">
                  <RiAdminFill />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.nom} {user.prenom}
                  </h2>
                  <p className="text-gray-600">Rôle: {user.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <FaEnvelope className="text-blue-500 inline-block mr-2" />
                  <span className="text-gray-800 font-semibold">Email:</span>
                  <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <FaPhone className="text-blue-500 inline-block mr-2" />
                  <span className="text-gray-800 font-semibold">
                    Téléphone:
                  </span>
                  <p className="text-gray-600">{user.tel}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <FaMapMarkerAlt className="text-blue-500 inline-block mr-2" />
                  <span className="text-gray-800 font-semibold">Wilaya:</span>
                  <p className="text-gray-600">{user.wilaya}</p>
                </div>
                {(user.role === "admin" || user.role === "super admin") && (
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <span className="text-gray-800 font-semibold">
                      Nombre de Tenders ajoutés:
                    </span>
                    <p className="text-gray-600">{user.nbrTenders}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <Link
                  to="/admin/profile/edit"
                  onClick={() =>
                    localStorage.setItem("userToEdit", JSON.stringify(user))
                  }
                >
                  <Button color="primary">Edit Profile</Button>
                </Link>
                <Button
                  color="error"
                  onClick={() => confirmDeleteUser(user._id)}
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
