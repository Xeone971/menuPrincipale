import React from "react";
import "./SelectionInfoDroite.css";
import { map } from "jquery";

const RightEdgeInfo = ({ styleData, onCloseClick, resetBoxSize }) => {

  const handleCrossClick = () => {
    // Appelez la fonction de rappel pour désactiver le mode personnalisé
    onCloseClick();

    resetBoxSize();
  };

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
      <div key={index} className="photos"> {/* Ajoutez la classe photos ici */}
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

export default RightEdgeInfo;
