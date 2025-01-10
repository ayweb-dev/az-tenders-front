import { createContext, useEffect, useState, useRef } from "react";

// Create a context to manage the script loading state
const CloudinaryScriptContext = createContext();

function CloudinaryUploadWidget({ uwConfig, setPublicId }) {
  const [loaded, setLoaded] = useState(false);
  const [fileName, setFileName] = useState(""); // Pour stocker le nom du fichier
  const [fileSize, setFileSize] = useState(0);  // Pour stocker la taille du fichier
  const widgetRef = useRef(null); // Ref pour stocker l'instance unique du widget

  // Charger le script Cloudinary
  useEffect(() => {
    if (!loaded) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  // Initialiser le widget Cloudinary
  const initializeCloudinaryWidget = () => {
    if (loaded && !widgetRef.current) {
      widgetRef.current = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info);
            setPublicId(result.info.public_id);

            // Enregistrer le nom du fichier et la taille
            setFileName(result.info.original_filename);
            setFileSize((result.info.bytes / 1024).toFixed(2)); // Convertir en Ko
          }
        }
      );
    }
    widgetRef.current.open();
  };

  // Fonction de réinitialisation du widget
  const resetWidget = () => {
    setFileName("");
    setFileSize(0);
    setPublicId(null); // Réinitialiser l'ID public
  };

  // Réinitialiser le widget au rechargement de la page
  useEffect(() => {
    window.addEventListener("beforeunload", resetWidget);
    return () => {
      window.removeEventListener("beforeunload", resetWidget);
    };
  }, []);

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          id="upload_widget"
          className="cloudinary-button"
          onClick={(e) => {
            e.preventDefault(); // Empêche le submit par défaut
            initializeCloudinaryWidget();
          }}
        >
          Upload
        </button>

        {/* Afficher le nom du fichier et la taille si disponibles */}
        {fileName && (
          <div style={{ marginLeft: "10px" }}>
            <p style={{ margin: 0 }}>
              <strong>File:</strong> {fileName}
            </p>
            <p style={{ margin: 0 }}>
              <strong>Size:</strong> {fileSize} KB
            </p>
          </div>
        )}

        {/* Bouton pour réinitialiser les informations d'upload */}
        {fileName && (
          <button
          className="bg-red-600 rounded p-4"
            onClick={(e) => {
              e.preventDefault();
              resetWidget();
            }}
            style={{ marginLeft: "30px" }}
          >
            <p className="text-white">Reset</p>
          </button>
        )}
      </div>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
