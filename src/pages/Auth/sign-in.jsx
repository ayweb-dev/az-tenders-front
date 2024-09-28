import { Button, Input } from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Pattern from "../../assets/pattern.png";

export function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // pour gérer les erreurs

  const handleGoogleLogin = () => {
    window.open("https://api.az-tenders.com/auth/google", "_self");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://api.az-tenders.com/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Stocker le token
        // Redirection ou autre action après connexion réussie
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Connextion",
          showConfirmButton: false,
          timer: 1500,
        });

        // Rediriger vers une autre page, par exemple :
        // Rediriger en fonction du rôle de l'utilisateur
        if (
          response.data.user.role === "admin" ||
          response.data.user.role === "super admin"
        ) {
          navigate("/admin"); // Rediriger vers la page Admin
        } else if (response.data.user.role === "user") {
          navigate("/userhome"); // Rediriger vers la page User
        } else {
          alert("Rôle inconnu !");
        }
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setError(
        "Erreur lors de la connexion : " + error.response?.data.message ||
          "Erreur inconnue"
      );
    }
  };

  return (
    <section className="mx-8 my-2  flex gap-4">
      <div className="w-full lg:w-3/5 mt-8">
        <div className="text-center">
          <h2 className="font-bold mb-4 text-heading-5 md:text-heading-2">
            Connexion
          </h2>
          <typography
            component={"span"}
            variant="paragraph"
            color="blue-gray"
            className="text-lg font-semibold"
          >
            Entrez vos informations pour vous connecter.
          </typography>
        </div>
        <form
          className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2"
          onSubmit={handleSubmit}
        >
          <div className="mb-1 flex flex-col gap-6">
            <typography
              component={"span"}
              variant="md"
              color="blue-gray"
              className="-mb-3 font-bold"
            >
              Votre email
            </typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <typography
              component={"span"}
              variant="md"
              color="blue-gray"
              className="-mb-3 font-bold"
            >
              Password
            </typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              autoComplete="current-password"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <div className="text-red-500 mb-4">{error}</div> // Afficher les erreurs
          )}
          {/* <Checkbox
            label={
              <typography
                component={"span"}
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                J'accepte les&nbsp;
                <a
                  href="#"
                  className="font-normal text-black transition-colors hover:text-gray-900 underline"
                >
                  Terms and Conditions
                </a>
              </typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          /> */}
          <Button className="mt-6" fullWidth type="submit">
            Se connecter
          </Button>

          <div className="space-y-4 my-2">
            <Button
              onClick={handleGoogleLogin}
              size="lg"
              color="white"
              className="flex items-center gap-2 justify-center shadow-md"
              fullWidth
            >
              <FcGoogle size={20} />
              <span>Utilisez Google</span>
            </Button>
          </div>
          <typography
            component={"span"}
            variant="paragraph"
            className="text-center w-full text-blue-gray-500 font-medium mt-6"
          >
            Pas de compte?
            <Link to="/signup" className="text-green-800 ml-1">
              Inscrivez-vous
            </Link>
          </typography>
        </form>
      </div>
      <div className="w-2/5 h-full hidden lg:block">
        <img src={Pattern} className="h-full w-full object-cover rounded-3xl" />
      </div>
    </section>
  );
}

export default SignIn;
