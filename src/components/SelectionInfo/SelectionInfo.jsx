import "./SelectionInfo.css";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { useNavigate } from "react-router-dom";
import LeftEdgeInfo from "../SelectionInfoGauche/SelectionInfoGauche";
import RightEdgeInfo from "../SelectionInfoDroite/SelectionInfoDroite";
import TopEdgeInfo from "../SelectionInfoHaut/SelectionInfoHaut";


const SelectionInfo = ({ styleData }) => {
  const defaultContent = <div>{styleData.infos.titre}</div>;
  document.body.style.backgroundColor = "#1a2653";

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const xInput = [-600, 0, 600];
  const yInput = [-300, 0, 300];
  const parentRef = useRef();
  const [infoContent, setInfoContent] = useState(defaultContent);
  const [isCustomRadius, setIsCustomRadius] = useState(false); // Ajouter un état pour vérifier si la condition est remplie
  const customBorderRadius = "5%"; // Définir le borderRadius personnalisé

  // Utilisez useNavigate pour obtenir la fonction de navigation
  const navigate = useNavigate();

  const handleDragEnd = (event, info) => {
    const screenWidth = window.innerWidth; // Récupérer la largeur de l'écran
    const screenHeight = window.innerHeight; // Récupérer la hauteur de l'écran
    console.log(screenWidth, screenHeight);
    const box = parentRef.current.querySelector(".box");
    const maison = parentRef.current.querySelector(".maison");

    if (info.point.x < 250) {
      // Dragged to the left edge
      setInfoContent(<LeftEdgeInfo styleData={styleData} onCloseClick={handleCustomModeDisable} resetBoxSize={resetBoxSize} />);
      box.style.width = "90vw";
      box.style.height = "90vh";
      box.style.border = "none";
      setIsCustomRadius(true); // Activer le mode personnalisé
    } else if (info.point.x > screenWidth - 250) {
      // Dragged to the right edge
      setInfoContent(<RightEdgeInfo styleData={styleData} onCloseClick={handleCustomModeDisable} resetBoxSize={resetBoxSize} />);
      box.style.width = "90vw";
      box.style.height = "90vh";
      box.style.border = "none";
      setIsCustomRadius(true); // Activer le mode personnalisé
    } else if (info.point.y < 150) {
      // Dragged to the top edge
      setInfoContent(<TopEdgeInfo styleData={styleData} onCloseClick={handleCustomModeDisable} resetBoxSize={resetBoxSize} />);
      box.style.width = "90vw";
      box.style.height = "90vh";
      box.style.border = "none";
      setIsCustomRadius(true); // Activer le mode personnalisé
    } else if (info.point.y > screenHeight - 300) {
      console.log(info.point.y);
      // Dragged to the bottom edge
      setInfoContent("Content for the bottom edge");
      box.style.width = "90vw";
      box.style.height = "90vh";
      setIsCustomRadius(true); // Activer le mode personnalisé
      navigate("/Carou");
    } else {
      setInfoContent(defaultContent);
      setIsCustomRadius(false); // Désactiver le mode personnalisé
    }
  };

  const borderRadius = useTransform(
    x,
    xInput,
    isCustomRadius ? [customBorderRadius, customBorderRadius, customBorderRadius] : ["5%", "50%", "5%"]
  );

  // Désactivez le drag lorsque le mode personnalisé est activé
  const isDragEnabled = !isCustomRadius;

  const handleCustomModeDisable = () => {
    setIsCustomRadius(false);
    setInfoContent(defaultContent);
  };
  
  const resetBoxSize = () => {
    // Réinitialisez la taille de la boîte à sa valeur initiale
    const box = parentRef.current.querySelector(".box");
    if (box) {
      box.style.width = ""; // Réinitialisez la largeur à la valeur par défaut (vide)
      box.style.height = ""; // Réinitialisez la hauteur à la valeur par défaut (vide)
      box.style.border = ""; // Réinitialisez la bordure à la valeur par défaut (vide)
    }
  };
  
    // Utilisez useAnimation pour contrôler les animations
    const histoireControls = useAnimation();
    const sousGenreControls = useAnimation();
    const instrumentsControls = useAnimation();
    const maisonControls = useAnimation();
    const boxControls = useAnimation(); // Contrôle pour la div "box"
  
    // Animation initiale pour chaque élément
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
  
    // Animation finale pour chaque élément (peut être la même)
    const animateAnimation = {
      opacity: 1,
      x: 0,
      y: 0,
    };
  
    // Utilisez useEffect pour déclencher les animations après le montage du composant
    useEffect(() => {
      // Démarrez les animations après un léger délai
      const startAnimations = async () => {
         histoireControls.start(animateAnimation);
         sousGenreControls.start(animateAnimation);
         instrumentsControls.start(animateAnimation);
         maisonControls.start(animateAnimation);
  
        // Démarrer l'animation de la div "box" après un délai
        await new Promise((resolve) => setTimeout(resolve, 500)); // Délai de 500 ms
        await boxControls.start({
          opacity: 1,
          scale: 1,
          transition: { duration: 1 }, // Durée de l'animation de la boîte
        });
      };
  
      startAnimations();
    }, [histoireControls, sousGenreControls, instrumentsControls, maisonControls, boxControls]);
  
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
            animate={{opacity: 1, scale: 1}} // Utilisez le contrôle d'animation pour l'animation de la boîte
            transition={{ duration: 2 }} // Durée de l'animation de la boîte
    
            drag={isDragEnabled} // Activez ou désactivez le drag en fonction de isCustomRadius
            dragConstraints={parentRef}
            dragDirectionLock
            dragSnapToOrigin
            dragElastic={0.1}
            whileDrag={{
              scale: 1.1,
            }}
            onDragEnd={handleDragEnd}
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
  
  export default SelectionInfo;
