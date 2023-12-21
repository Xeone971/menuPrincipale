import React from "react";
import "./SelectionInfoHaut.css";

const TopEdgeInfo = ({ styleData, onCloseClick, resetBoxSize }) => {

  const handleCrossClick = () => {
    // Appelez la fonction de rappel pour désactiver le mode personnalisé
    onCloseClick();

    resetBoxSize();
  };

  return (
    <section className="container-modal" id="container-modal-left">
      <img className="croix" src="../../media/croix.svg" onClick={handleCrossClick}/>
      <div className="container-info-gauche-titre">
          <h2 id="info-gauche-titre">{styleData.infos.titre}</h2>
      </div>

      <div className="container-list">
        <ul className="instrument-list">
          {styleData.infos.sousGenre.map((instrument, index) => (
            <li key={index} className={`instrument-item ${index >= 6 ? 'two-columns' : ''}`}>
              {instrument}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TopEdgeInfo;
