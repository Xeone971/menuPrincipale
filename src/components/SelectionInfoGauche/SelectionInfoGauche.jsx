import React from "react";  // Importation de React, la bibliothèque pour la création d'interfaces utilisateur.
import "./SelectionInfoGauche.css";  // Importation d'une feuille de style CSS spécifique.

// Définition du composant `LeftEdgeInfo` en tant que fonction fléchée prenant des propriétés (props) en entrée.
const LeftEdgeInfo = ({ styleData, onCloseClick, resetBoxSize }) => {

  // Définition d'une fonction `handleCrossClick` qui sera appelée lorsqu'un utilisateur clique sur une croix (x).
  const handleCrossClick = () => {
    // Appelez la fonction de rappel `onCloseClick` pour effectuer une action lorsque l'utilisateur ferme quelque chose.
    onCloseClick();

    // Appelez la fonction `resetBoxSize` pour effectuer une action de réinitialisation de la taille de la boîte (non définie ici).
    resetBoxSize();
  };

  // Le rendu du composant commence ici.
  return (
    <section className="container-modal" id="container-modal-left"> 
      <img className="croix" src="../../media/croix.svg" onClick={handleCrossClick}/> 
      <div className="container-info-gauche-titre">  
          <h2 id="info-gauche-titre">{styleData.infos.titre}</h2> 
      </div>
      <div className="container-list">  
        <ul className="instrument-list">  
          {styleData.infos.instrument.map((instrument, index) => (
            <li key={index} className={`instrument-item ${index >= 6 ? 'two-columns' : ''}`}>
              {instrument}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

// Exportation du composant `LeftEdgeInfo`
export default LeftEdgeInfo;