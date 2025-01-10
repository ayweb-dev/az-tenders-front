import axios from "axios";
import { Button } from "keep-react";
import { useEffect, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import { GiQueenCrown } from "react-icons/gi";
import { VscSymbolField } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import NavbarUser from "../../components/NavbarUser";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [subscribedSectors, setSubscribedSectors] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState("Free");
  const [subExpire, setSubExpire] = useState(null);

  localStorage.removeItem("userToEdit");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSubscription = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "https://api.az-tenders.com/user/checkSubscription",
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const sectorsResponse = await axios.get(
        "https://api.az-tenders.com/admin/sectors",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status === "success") {
        if (response.data.sectors && response.data.sectors.length > 0) {
          setIsSubscribed(true);
          setSubscribedSectors(response.data.sectors);
          setSubscriptionType(response.data.subscription.type);
          setSubExpire(response.data.subscription.dateFin);
        }
      }
    };

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

        Swal.fire({
          title: "Vous n'avez pas accès à cette section !",
          text: "Connectez vous pour acceder à cette page.",
        }).then(() => {
          
            navigate("/signin");
          
        });
        
      }
    };

    fetchUser();
    fetchSubscription();
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
        navigate("/profile"); // Cela vous garde sur la page actuelle
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
        navigate("/userhome");
      } else {
        console.error("Erreur lors de la suppression de l'utilisateur");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur", error);
    }
  };

  if (!user) return navigate("/userhome");

  return (
    <div className="dark:text-white dark:bg-darkColor min-h-screen">
      <div>
        <NavbarUser />
      </div>
      <div className="flex">
        <div className="w-full">
          <div className="min-h-screen flex justify-center pt-10 pb-10">
            <div className="bg-white rounded-lg p-8 w-full max-w-3xl">
              <div className="flex items-center mb-6">
                <div className="w-24 h-24 bg-blue-500 text-white rounded-full flex items-center justify-center text-4xl">
                  <FaUser />
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.nom} {user.prenom}
                  </h2>
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

                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <GiQueenCrown className="text-blue-500 inline-block mr-2" />
                  <span className="text-gray-800 font-semibold">
                    Abonnement:
                  </span>
                  <p className="text-gray-600 flex justify-between">
                    {" "}
                    {subscriptionType}{" "}
                    {isSubscribed && (
                      <span className="mr-2 text-sm text-gray-500">
                        jusqu'au {subExpire}
                      </span>
                    )}
                  </p>
                </div>
                {isSubscribed && (
                  <div className="bg-gray-50 md:col-span-2 p-4 rounded-lg shadow-sm">
                    <VscSymbolField className="text-blue-500 inline-block mr-2" />
                    <span className="text-gray-800 font-semibold">
                      Secteurs:
                    </span>
                    <p className="text-gray-600">
                      {subscribedSectors
                        .map((sector) => sector.title)
                        .join(", ")}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <Link
                  to="/profile/edit"
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

export default UserProfile;
