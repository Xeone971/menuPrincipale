import "./SelectionInfo.css"; // Importe les styles CSS pour ce composant
import React, { useEffect, useRef, useState } from "react"; // Importe les bibliothèques React nécessaires
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion"; // Importe les composants de framer-motion pour l'animation
import { useNavigate } from "react-router-dom"; // Importe la fonction de navigation de React Router DOM
import LeftEdgeInfo from "../SelectionInfoGauche/SelectionInfoGauche"; // Importe un composant personnalisé
import RightEdgeInfo from "../SelectionInfoDroite/SelectionInfoDroite"; // Importe un composant personnalisé
import TopEdgeInfo from "../SelectionInfoHaut/SelectionInfoHaut"; // Importe un composant personnalisé

const SelectionInfo = ({ styleData }) => {
  // Définit le composant principal SelectionInfo
  const defaultContent = <div>{styleData.infos.titre}</div>; // Contenu par défaut basé sur des données passées en prop
  document.body.style.backgroundColor = "#1a2653"; // Change la couleur de fond du corps de la page

  // Utilisation de framer-motion pour gérer les valeurs de mouvement et de transformation
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xInput = [-600, 0, 600];
  const yInput = [-300, 0, 300];
  const parentRef = useRef(); // Référence à un élément DOM parent
  const [infoContent, setInfoContent] = useState(defaultContent); // Contenu d'information dynamique
  const [isCustomRadius, setIsCustomRadius] = useState(false); // État pour activer/désactiver un mode personnalisé
  const customBorderRadius = "5%"; // Définit le rayon de bordure personnalisé

  // Utilise useNavigate pour obtenir la fonction de navigation
  const navigate = useNavigate();

  // Gestionnaire appelé lorsque le glisser-déposer se termine
  const handleDragEnd = (event, info) => {
    const screenWidth = window.innerWidth; // Obtient la largeur de l'écran
    const screenHeight = window.innerHeight; // Obtient la hauteur de l'écran
    const box = parentRef.current.querySelector(".box");
    const maison = parentRef.current.querySelector(".maison");

    if (info.point.x < 250) {
      // Glissé vers le bord gauche
      setInfoContent(<LeftEdgeInfo styleData={styleData} onCloseClick={handleCustomModeDisable} resetBoxSize={resetBoxSize} />);
      box.style.width = "90vw";
      box.style.height = "90vh";
      box.style.border = "none";
      setIsCustomRadius(true); // Active le mode personnalisé
    } else if (info.point.x > screenWidth - 250) {
      // Glissé vers le bord droit
      setInfoContent(<RightEdgeInfo styleData={styleData} onCloseClick={handleCustomModeDisable} resetBoxSize={resetBoxSize} />);
      box.style.width = "90vw";
      box.style.height = "90vh";
      box.style.border = "none";
      setIsCustomRadius(true); // Active le mode personnalisé
    } else if (info.point.y < 150) {
      // Glissé vers le bord supérieur
      setInfoContent(<TopEdgeInfo styleData={styleData} onCloseClick={handleCustomModeDisable} resetBoxSize={resetBoxSize} />);
      box.style.width = "90vw";
      box.style.height = "90vh";
      box.style.border = "none";
      setIsCustomRadius(true); // Active le mode personnalisé
    } else if (info.point.y > screenHeight - 300) {
      // Glissé vers le bord inférieur
      setInfoContent("Content for the bottom edge");
      box.style.width = "90vw";
      box.style.height = "90vh";
      setIsCustomRadius(true); // Active le mode personnalisé
      navigate("/Carou"); // Navigue vers une autre page
    } else {
      setInfoContent(defaultContent);
      setIsCustomRadius(false); // Désactive le mode personnalisé
    }
  };

  // Utilise useTransform pour gérer la transformation de la bordure en fonction de la position x
  const borderRadius = useTransform(
    x,
    xInput,
    isCustomRadius ? [customBorderRadius, customBorderRadius, customBorderRadius] : ["5%", "50%", "5%"]
  );

  // Désactive le glisser-déposer lorsque le mode personnalisé est activé
  const isDragEnabled = !isCustomRadius;

  // Gestionnaire pour désactiver le mode personnalisé
  const handleCustomModeDisable = () => {
    setIsCustomRadius(false);
    setInfoContent(defaultContent);
  };

  // Fonction pour réinitialiser la taille de la boîte
  const resetBoxSize = () => {
    const box = parentRef.current.querySelector(".box");
    if (box) {
      box.style.width = ""; // Réinitialise la largeur à la valeur par défaut (vide)
      box.style.height = ""; // Réinitialise la hauteur à la valeur par défaut (vide)
      box.style.border = ""; // Réinitialise la bordure à la valeur par défaut (vide)
    }
  };

  // Utilise useAnimation pour contrôler les animations de différents éléments
  const histoireControls = useAnimation();
  const sousGenreControls = useAnimation();
  const instrumentsControls = useAnimation();
  const maisonControls = useAnimation();
  const boxControls = useAnimation(); // Contrôle pour la div "box"

  // Configurations d'animation initiales pour chaque élément
  const initialHistoire = {
    opacity: 0,
    x: -250, // Animation initiale personnalisée pour histoire
    y: 0,
  };

  const initialSousGenre = {
    opacity: 0,
    x: -250, // Animation initiale personnalisée pour sous-genre
    y: 0,
  };

  const initialInstruments = {
    opacity: 0,
    x: 250, // Animation initiale personnalisée pour instruments
    y: 0,
  };

  const initialMaison = {
    opacity: 0,
    x: 0,
    y: -250, // Animation initiale personnalisée pour maison
  };

  // Configuration d'animation finale pour chaque élément (peut être la même pour tous)
  const animateAnimation = {
    opacity: 1,
    x: 0,
    y: 0,
  };

  // Utilise useEffect pour déclencher les animations après le montage du composant
  useEffect(() => {
    // Démarre les animations après un léger délai
    const startAnimations = async () => {
      histoireControls.start(animateAnimation);
      sousGenreControls.start(animateAnimation);
      instrumentsControls.start(animateAnimation);
      maisonControls.start(animateAnimation);

      // Démarre l'animation de la div "box" après un délai
      await new Promise((resolve) => setTimeout(resolve, 500)); // Délai de 500 ms
      await boxControls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 1 }, // Durée de l'animation de la boîte
      });
    };

    startAnimations();
  }, [histoireControls, sousGenreControls, instrumentsControls, maisonControls, boxControls]);

  // Rendu du composant
  return (
    <div className="example-container" ref={parentRef}>
      <motion.div
        className="box-container"
        initial={{ opacity: 0, scale: 0 }} // Animation initiale pour la boîte
        animate={boxControls} // Utilisez le contrôle d'animation pour l'animation de la boîte
        transition={{ duration: 1 }} // Durée de l'animation de la boîte
      >
        <motion.div
          style={{
            x,
            y,
            touchAction: "none",
            borderRadius,
          }}
          className="box"
          initial={{ opacity: 0, scale: 0 }} // Animation initiale pour la boîte
          animate={{ opacity: 1, scale: 1 }} // Utilisez le contrôle d'animation pour l'animation de la boîte
          transition={{ duration: 2 }} // Durée de l'animation de la boîte
          drag={isDragEnabled} // Activez ou désactivez le glisser-déposer en fonction de isCustomRadius
          dragConstraints={parentRef}
          dragDirectionLock
          dragSnapToOrigin
          dragElastic={0.1}
          whileDrag={{
            scale: 1.1,
          }}
          onDragEnd={handleDragEnd} // Gestionnaire appelé lors de la fin du glisser-déposer
        >
          <div className="GenreName">{infoContent}</div>
        </motion.div>
      </motion.div>
      <motion.div
        className="histoire"
        initial={initialHistoire}
        animate={histoireControls}
        transition={{ duration: 1 }}
      >
        Histoire
      </motion.div>
      <motion.div
        className="sous-genre"
        initial={initialSousGenre}
        animate={sousGenreControls}
        transition={{ duration: 1 }}
      >
        Sous-genre
      </motion.div>
      <motion.div
        className="instruments"
        initial={initialInstruments}
        animate={instrumentsControls}
        transition={{ duration: 1 }}
      >
        Instruments
      </motion.div>
      <motion.div
        className="maison"
        initial={initialMaison}
        animate={maisonControls}
        transition={{ duration: 1 }}
      >
        <img src="../../media/maison.svg" alt="maison" />
      </motion.div>
    </div>
  );
};

export default SelectionInfo; // Exporte le composant SelectionInfo