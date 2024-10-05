import { useState, useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import axios from "axios";

const FavoriteButton = ({ tenderId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    // Si l'utilisateur est récupéré, vérifier si le tender est dans les favoris
    if (user && user.favorites && user.favorites.includes(tenderId)) {
      setIsFavorite(true);
    }
  }, [user, tenderId]);

  const toggleFavorite = async () => {
    try {
      const token = localStorage.getItem("token");

      if (isFavorite) {
        // Supprimer des favoris
        await axios.delete(`https://api.az-tenders.com/user/favorites/${tenderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsFavorite(false);
      } else {
        // Ajouter aux favoris
        await axios.post(`https://api.az-tenders.com/user/favorites/${tenderId}`, {}, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Erreur lors de la gestion des favoris", error);
    }
  };

  return (
    <span onClick={toggleFavorite} className="cursor-pointer">
      {isFavorite ? (
        <FaStar className="text-purple-700" />
      ) : (
        <FaRegStar className="text-gray-400 hover:text-purple-700" />
      )}
    </span>
  );
};

export default FavoriteButton;
