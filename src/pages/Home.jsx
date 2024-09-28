import axios from "axios";
import { useState } from "react";
import { BsTwitterX } from "react-icons/bs";
import {
  FaEnvelope,
  FaExternalLinkAlt,
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import bigLogo from "../assets/logoDarkNavBar.png";
import logoPrimary from "../assets/logoPrimary.png";
import { CardComponent } from "../components/CardComponent";
import Navbar from "../components/Navbar";
import FullScreenSlider from "../components/fullScreenSlider";

// chaque templete aura sa propre page

const Home = () => {
  // const [formData.Messagesnom, setMessagesnom] = useState("");
  // const [Messagestel, setMessagestel] = useState("");
  // const [Messagesemail, setMessagesemail] = useState("");
  // const [Messagesbody, setMessagesbody] = useState("");
  const [formData, setFormData] = useState({
    nom: "",
    tel: "",
    email: "",
    body: "",
  });
  localStorage.removeItem("userToEdit");
  localStorage.removeItem("tenderToEdit");
  localStorage.removeItem("SubToEdit");

  const handleInputChange = (e) => {
    const { name, value } = e.target; // Obtenez le nom et la valeur de l'input
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Met à jour uniquement le champ modifié
    }));
  };

  const addMessages = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://api.az-tenders.com/admin/msg", {
        nom: formData.nom,
        tel: formData.tel,
        email: formData.email,
        body: formData.body,
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Succès",
          text: "Message ajouté avec succès!",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du message :", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de l'envoi du message, veuillez rééssayer plus tard !",
      });
    }
  };

  return (
    <div className="text-black dark:bg-darkColor dark:text-white">
      <Navbar />

      {/*slider*/}
      <div>
        <FullScreenSlider />
      </div>

      {/* INTRO */}

      <div style={{ height: "100vh", position: "relative" }} data-aos="fade-up">
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "75%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
          }}
        >
          <h1 className="text-3xl md:text-6xl font-Poppins">AZ Tenders</h1>
          <h3 className="text-center text-lg md:text-4xl">
            Augmentez votre portée avec <br /> des{" "}
            <Link
              to="/UserHome"
              className="text-green-500 font-Satisfy text-2xl md:text-5xl drop-shadow-sm"
            >
              oporunités sans limites{" "}
              <FaExternalLinkAlt className="inline" size={"20px"} />
            </Link>
          </h3>
        </div>
        <div className="bubbles">
          <div className="bubble"></div>
          <div className="bubble invisible md:visible"></div>
          <div className="bubble"></div>
          <div className="bubble invisible md:visible"></div>
          <div className="bubble invisible md:visible"></div>
          <div className="bubble"></div>
          <div className="bubble invisible md:visible"></div>
          <div className="bubble"></div>
          <div className="bubble invisible md:visible"></div>
          <div className="bubble"></div>
        </div>
      </div>

      {/* FIN INTRO */}

      {/* Vous hesitez ?*/}
      <div className="grid gap-0 md:grid-cols-2 grid-cols-1 z-10">
        <div className="m-0 p-5 font-Poppin z-30  dark:bg-blue-950 bg-gray-200 bg-opacity-30 dark:bg-opacity-10">
          <h1 className="text-heading-3 m-4 text-center">Vous hésitez ?</h1>
          <p className="text-xl p-6 text-justify">
            Ne laissez plus les opportunités vous échapper ! Avec AZ Tenders,
            vous accédez en temps réel aux appels d'offres qui peuvent
            transformer votre entreprise. Que vous soyez une PME ou un grand
            acteur du marché, notre service vous donne un avantage compétitif.
            Simplifiez vos recherches, gagnez du temps et maximisez vos chances
            de succès.
          </p>
        </div>
        <div
          className="imgContainer bg-hesitez-img bg-center bg-cover h-96 m-0 p-0 z-30"
          data-aos="fade-up"
        ></div>
      </div>
      {/* FIN Vous hesitez ?*/}

      {/* Image en losange */}
      <div className="h-48 w-full my-40 bg-green-300 bg-opacity-50 flex justify-center items-centerS">
        <div className="flex justify-center items-center">
          <img src={bigLogo} alt="AZ Tenders full logo" data-aos="fade-right" />
        </div>
      </div>

      {/* A propos de nous*/}
      <div
        id="AboutUs"
        className=" w-full bg-gray-200 dark:bg-blue-950 mx-auto px-2 md:px-72 bg-opacity-10"
      >
        <h3 className="text-center text-heading-6 md:text-heading-3 font-Poppins mt-10 pt-10">
          A Propos De Nous
        </h3>
        <div className="grid grid-cols-1 gap-4 pb-10">
          {/* Texte */}
          <div className="flex-1 text-left">
            <div className="space-y-2">
              <h5 className="text-center font-Poppins p-8">
                AZ Tenders est une entreprise innovante qui facilite l'accès aux
                appels d’offres dans les secteurs privé et public via une
                plateforme intuitive. Équipée d’une équipe d'experts passionnés,
                AZ Tenders aide les entreprises, grandes ou petites, à saisir
                les meilleures opportunités, optimiser leurs chances de réussite
                et naviguer efficacement dans le monde des appels d’offres.
              </h5>
            </div>
          </div>
        </div>
      </div>
      {/* FIN A propos de nous */}

      {/* Offres */}
      <section id="Offres" className="my-20 overflow-hidden">
        <h3 className="text-center text-heading-5 md:text-heading-3 font-Poppins pt-10 mt-16 mb-5">
          Nos Plans
        </h3>
        <CardComponent />
      </section>
      {/* FIN Offres */}

      {/* Comment s'abonner */}
      <section id="etapes" className="my-20 overflow-hidden">
        <div className="container w-full mx-auto p-3">
          <h3 className="text-center text-heading-6 md:text-heading-5 font-Poppins mb-5">
            Comment s'abonner ?
          </h3>
          <div className="w-full md:w-2/3 mx-3 md:mx-auto font-Poppins">
            <div className="flex items-center mb-2" data-aos="fade-left">
              <div className="px-2 w-7 h-7 text-lg bg-green-600 text-white mr-2">
                1
              </div>{" "}
              <p className="text-xs md:text-base">S'inscrire à AZ Tenders</p>
            </div>
            <div className="flex items-center mb-2" data-aos="fade-left">
              <div className="px-2 w-7 h-7 text-lg bg-green-600 text-white mr-2">
                2
              </div>{" "}
              <p className="text-xs md:text-base">
                Choisir le plan qui vous convient et attendre l'appel de l'un
                des administrateurs du site
              </p>
            </div>
            <div className="flex items-center mb-2" data-aos="fade-left">
              <div className="px-2 w-7 h-7 text-lg bg-green-600 text-white mr-2">
                3
              </div>{" "}
              <div className="text-xs md:text-base">
                Effectuer le paiement en choisissant l'une des deux méthodes :
                <p className="">CCP : 0025264255223 Clé 25</p>
                <p>BaridiMob : 777777995266553233333</p>
              </div>
            </div>
            <div className="flex items-center mb-2" data-aos="fade-left">
              <div className="px-2 w-7 h-7 text-lg bg-green-600 text-white mr-2">
                4
              </div>{" "}
              <div className="text-xs md:text-base">
                <p>
                  Envoyer le reçu de paiement par mail :
                  aztenders.contact@gmail.com
                </p>
                <p>Ou, par WhatsApp : +213 666 88 99 55</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}

      <section id="Contact" className="my-20 ">
        <div className="grid font-Poppins sm:grid-cols-2 items-start gap-16 p-4 mx-auto max-w-6xl bg-white  dark:text-white dark:bg-darkColor">
          <div>
            <h1 className="text-gray-800 text-3xl font-extrabold dark:text-white">
              Parlons !!
            </h1>
            <p className="text-semibold text-gray-500 mt-4 dark:text-white">
              Vous avez une grande idée ou une marque à développer et vous avez
              besoin d'aide ? Alors contactez-nous, nous serions ravis de
              connaître votre projet et de vous aider.
            </p>

            <div className="mt-12">
              <ul className="mt-4">
                <li className="flex items-center">
                  <div className=" h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <FaEnvelope size={20} color="#40CB56" />
                  </div>
                  <a
                    href="mailto:info@example.com"
                    className="text-[#40CB56] text-sm ml-4 dark:text-white"
                  >
                    <small className="block">Email</small>
                    <strong>info@example.com</strong>
                  </a>
                </li>
                <li className="flex items-center pt-5">
                  <div className=" h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                    <FaPhoneAlt size={20} color="#40CB56" />
                  </div>
                  <a
                    href="tel:+1234567890"
                    className="text-[#40CB56] text-sm ml-4 dark:text-white"
                  >
                    <small className="block">Télephone</small>
                    <strong>+123 456 7890</strong>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <form onSubmit={addMessages} className="ml-auto space-y-4">
            <input
              name="nom"
              type="text"
              value={formData.nom}
              onChange={handleInputChange}
              placeholder="Nom"
              className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-700 dark:text-gray-200 text-sm outline-blue-500 focus:bg-transparent"
            />
            <input
              name="tel"
              type="tel"
              value={formData.tel}
              onChange={handleInputChange}
              placeholder="Numéro de Téléphone"
              className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-700 dark:text-gray-200 text-sm outline-blue-500 focus:bg-transparent"
            />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full rounded-md py-3 px-4 bg-gray-100 text-gray-700 dark:text-gray-200 text-sm outline-blue-500 focus:bg-transparent"
            />
            <textarea
              name="body"
              value={formData.body}
              onChange={handleInputChange}
              placeholder="Votre Message"
              rows="6"
              className="w-full rounded-md px-4 bg-gray-100 text-gray-700 dark:text-gray-200  text-sm pt-3 outline-blue-500 focus:bg-transparent"
            ></textarea>
            <button
              type="submit"
              className="text-white font-bold bg-greenLogo hover:bg-green-800 tracking-wide rounded-md text-lg px-4 py-3 w-full !mt-6"
            >
              Send
            </button>
          </form>
        </div>
      </section>

      <hr />

      {/* FOOTER */}

      <footer className="bg-gray-900 font-Poppins text-center md:text-right">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex  md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="./" className="flex items-center">
                <img
                  src={logoPrimary}
                  className="h-10 md:h-14 lg:h-20 me-6"
                  alt="AZ Tenders Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                  AZ Tenders
                </span>
              </a>
            </div>
            <div className="">
              <ul className="flex mt-4 space-x-4">
                {/* Facebook */}
                <li className=" h-10 w-10 flex items-center justify-center shrink-0">
                  <a href="#">
                    <FaFacebookSquare size={30} color="#40CB56" />
                  </a>
                </li>

                {/* LinkedIn */}
                <li className=" h-10 w-10 flex items-center justify-center shrink-0">
                  <a href="#">
                    <FaLinkedin size={30} color="#40CB56" />
                  </a>
                </li>

                {/* Instagram */}
                <li className=" h-10 w-10  flex items-center justify-center shrink-0 overflow-hidden">
                  <a href="#">
                    <FaInstagramSquare size={30} color="#40CB56" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="md:flex md:justify-around md:items-center">
              <div className="mt-5">
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="">
                    <a href="#Slider" className="hover:underline">
                      Présentation
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="">
                    <a href="#About Us" className="hover:underline">
                      A propos
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="">
                    <a href="#Offres" className="hover:underline">
                      Offres
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mt-5">
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="">
                    <a href="#Contact" className="hover:underline">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-900 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className=" text-center">
            <p className="text-sm text-gray-500 sm:text-center dark:text-gray-400 mb-3">
              © 2024{" "}
              <a href="./" className="hover:underline">
                AY Web™
              </a>
              . All Rights Reserved.
            </p>
            <div className="flex mt-4 justify-center items-center mt-0">
              {/* Facebook */}
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                <FaFacebookSquare className="w-4 h-4" />
                <span className="sr-only">Facebook page</span>
              </a>
              {/* Twitter */}
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <BsTwitterX className="w-4 h-4" />
                <span className="sr-only">Twitter page</span>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <FaInstagramSquare className="w-4 h-4" />
                <span className="sr-only">Instagram page</span>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
              >
                <FaLinkedin className="w-4 h-4" />
                <span className="sr-only">LinkedIn page</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Home;
