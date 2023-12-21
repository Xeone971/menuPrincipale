import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import $ from 'jquery';

const PopGenrePage = () => {
  const [popContent, setPopContent] = useState('');
  const popContentRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://fr.wikipedia.org/w/api.php?action=parse&format=json&page=Genre_musical&prop=text&origin=*'
        );

        if (response.data && response.data.parse && response.data.parse.text) {
          console.log(response.data)
          const pageContent = response.data.parse.text['*']//.find('infobox_v3');
          let $popContent = $('<div>').html(pageContent);
          //console.log($popContent.text());
          // Trouver le premier paragraphe
          $popContent = $popContent.find('.infobox_v3').first();
          console.log($popContent.text())
          /*if (firstParagraph) {
           setPopContent(firstParagraph.text());
          }*/
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      
    };
    

    fetchData();
  }, []);

  return (
    <div>
      <h1>Pop Music Wikipedia Info</h1>
      <div className="pop-content" ref={popContentRef}>
        {popContent}
      </div>
      <style>
        {`
          /* Ajoutez vos styles CSS personnalisés ici */
          .pop-content {
            margin: 20px;
            padding: 10px;
            border: 1px solid #ccc;
            background-color: #f7f7f7;
            color: #333;
          }
        `}
      </style>
    </div>
  );
};

export default PopGenrePage;
