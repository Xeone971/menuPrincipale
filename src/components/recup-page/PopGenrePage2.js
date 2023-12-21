import React, { useEffect, useState, useRef } from 'react';
import axios, { all } from 'axios';
import $, { data } from 'jquery';
import { motion } from 'framer-motion';

const MenuGenrePage = () => {
  const [pageContent, setPopContent] = useState('');
  const pageContentRef = useRef(null);
  const [currentId, setCurrentId] = useState('Genre_musical'); // ID de la page par défaut

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://fr.wikipedia.org/w/api.php?action=parse&format=json&page=${currentId}&prop=text&origin=*` 
          // lien avec la variable id des cercles avec comme page de base Genre_musical
          //'https://fr.wikipedia.org/w/api.php?action=parse&format=json&page=' + $(this).data("id") + '&prop=text&origin=*'
        );

        if (response.data && response.data.parse && response.data.parse.text) {
          const pageContent = response.data.parse.text["*"]
          let $popContent = $('<div>').html(pageContent);
          $popContent = $popContent.find('td').first(); // Récupérer le premier élément td
                  
          $popContent.find("a").replaceWith(function () {
            const href = $(this).attr("href");
            if (href) {
              console.log(href.substring(6));
              let elt = $("<div>").addClass("circle").attr("id", href.substring(6)).attr("data-id", href.substring(6)).append($("<p>").append($(this).contents()));
              console.log(elt.data("id"))
              return elt;
            }
            return "";
          });
          


          // // supprimer les nodetype 3
          $popContent.find("td").contents().filter(function() {
            return this.nodeType === 3;
          }
          ).remove();
          
          // Utiliser jQuery pour extraire le contenu entre les balises h2 "Histoire" et la prochaine balise h2
          // const extractedContent = $popContent.find("infobox_v3").nextUntil("div").clone(); 
          
          // supprimer le dernier cercle
          const extractedContent = $popContent.find("div").clone().slice(0, -1);
          

          // Récupérer les balises h2 "Histoire" également
          // const h2Elements = $popContent.find("h2").clone();


          // Mettre à jour le contenu d'affichage
          setPopContent([ ...extractedContent.toArray()]);
        }
        $("div").each(function() {
          console.log($(this).data("id"));
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, [currentId]);
  
  useEffect(() => {
    if (pageContent.length > 0 && pageContentRef.current) {
      pageContentRef.current.innerHTML = ''; // Effacer le contenu précédent

      // Ajouter chaque élément au DOM
      pageContent.forEach(element => {
        pageContentRef.current.appendChild(element);

      // Gérez les clics sur les cercles générés par jQuery
      const clickableCircles = document.querySelectorAll('.circle');
      clickableCircles.forEach(circle => {
        circle.addEventListener('click', (e) => {
          console.log("id : " + circle.getAttribute('data-id') + "");
          const circleId = circle.getAttribute('data-id');
          if (circleId) {
            // setCurrentId(circleId);
          }
        });
        });
      });
    }
  }, [pageContent]);

  return (
    <div>
      <h1>Pop Music Wikipedia Info</h1>
      <div className="pop-content" ref={pageContentRef} dangerouslySetInnerHTML={{ __html: pageContent }}/>
      <style>
        {`
          /* Ajoutez vos styles CSS personnalisés ici */
          .pop-content {
            display: flex;
            flex-wrap: wrap;
            height: 100%;            
            margin: 20px;
            padding: 10px;
            color: #333;
          }
          .circle {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px;
            cursor: pointer; // Ajoutez un curseur pointer pour les rendre cliquables
          }
          .circle:hover {
            background: #fff;
            scale: 1.1;
          }
          h1 {
            margin: 0;
          p {
            text-align: center;
            font-size: 12px;
            margin: 0.5em;
          }
        `}
      </style>
    </div>
  );
};

export default MenuGenrePage;
