import { useEffect, useState } from "react";
import axios from "axios";
import { FaSortAlphaDown, FaCheck, FaTimes } from "react-icons/fa"; // Importer les icônes


const CheckUserSubscription = ({ userId }) => {
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const checkSubscription = async () => {
      try {
        const response = await axios.get(
            `https://api.az-tenders/user/checkSubscriptionByParam/${userId}`,
            {
              headers: {
                authorization: `Bearer ${token}`,
              },
            }
          );        
          if (response.status === 200 && response.data.sectors.length > 0) {
          setHasSubscription(true);
        } else {
          setHasSubscription(false);
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'abonnement:", error);
        setHasSubscription(false);
      }
    };

    checkSubscription();
  }, [userId]);

  return hasSubscription ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />;
};

export default CheckUserSubscription;