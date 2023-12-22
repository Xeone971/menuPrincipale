import React from "react";  // Importation de React, la bibliothèque pour la création d'interfaces utilisateur.
import "./SelectionInfoDroite.css";  // Importation d'une feuille de style CSS.

// Importation de la fonction map depuis la bibliothèque jQuery (inutilisée dans ce code, probablement une importation inutile).
import { map } from "jquery";

// Définition du composant `RightEdgeInfo` en tant que fonction fléchée prenant des propriétés (props) en entrée.
const RightEdgeInfo = ({ styleData, onCloseClick, resetBoxSize }) => {

  // Définition d'une fonction `handleCrossClick` qui sera appelée lorsqu'un utilisateur clique sur une croix (x).
  const handleCrossClick = () => {
    // Appelez la fonction de rappel `onCloseClick` pour effectuer une action lorsque l'utilisateur ferme quelque chose.
    onCloseClick();

    // Appelez la fonction `resetBoxSize` pour effectuer une action de réinitialisation de la taille de la boîte (non définie ici).
    resetBoxSize();
  };

  // Le rendu du composant commence ici.
  return (
    <section className="container-modal"> 
      <div id="container-modal-gauche" className="container-modal-gauche">  
        <div className="container-info-droite-titre">  
          <h2 id="info-droite-titre">{styleData.infos.titre}</h2>  
        </div>
        <h3 id="info-droite-sous-titre">Un peu de contexte</h3>  
        <p id="info-droite-texte">{styleData.infos.contexte}</p>  
        <h3 id="info-droite-sous-titre">Quel est sont histoire ?</h3>  
        <p id="info-droite-texte">{styleData.infos.histoire}</p>  
      </div>

      <div id="container-modal-droite" className="container-modal-droite">  
        {styleData.infos.photo.map((image, index) => (
          <div key={index} className="photos">  
            {console.log(image)}  
            <img className="photos" src={image} alt={styleData.infos.alt[index]} />  
            <p className="alt">{styleData.infos.alt[index]}</p>  
          </div>
        ))}
      </div>
      <img className="croix" src="../../media/croix.svg" onClick={handleCrossClick} />
    </section>
  );
};

// Exportation du composant `RightEdgeInfo`
export default RightEdgeInfo;
