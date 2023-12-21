import React, { useEffect, useState } from 'react';
import axios from 'axios';

function extractContentBetweenTags(pageContent, startTag, endTag, targetIndex) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(pageContent, 'text/html');

  let targetCount = 0;
  let insideTargetTags = false;
  let content = '';

  const removeHyperlinks = (node) => {
    node.querySelectorAll('a').forEach(a => {
      const textNode = document.createTextNode(a.textContent);
      a.parentNode.replaceChild(textNode, a);
    });
  };

  // Parcourir les éléments pour extraire le contenu entre les balises spécifiques
  doc.querySelectorAll('*').forEach(element => {
    if (element.tagName.toLowerCase() === startTag.toLowerCase()) {
      targetCount++;
      if (targetCount === targetIndex) {
        insideTargetTags = true;
      } else {
        insideTargetTags = false;
      }
    } else if (element.tagName.toLowerCase() === endTag.toLowerCase()) {
      if (insideTargetTags) {
        insideTargetTags = false;
        targetCount++;
      }
    }

    if (insideTargetTags) {
      // Cloner l'élément pour ne pas altérer l'original
      const clonedElement = element.cloneNode(true);
      // Supprimer les liens
      removeHyperlinks(clonedElement);
      // Supprimer le contenu entre crochets []
      clonedElement.innerHTML = clonedElement.innerHTML.replace(/\[.*?\]/g, '');
      content += clonedElement.outerHTML;
    }
  });

  return content;
}


const PopGenrePage = () => {
  const [popContent, setPopContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://fr.wikipedia.org/w/api.php?action=parse&format=json&page=Pop_(musique)&prop=text&origin=*'
        );

        if (response.data && response.data.parse && response.data.parse.text) {
          const pageContent = response.data.parse.text['*'];
          console.log(pageContent);
          // Extraire le contenu entre les balises h2
          const extractedContent = extractContentBetweenTags(pageContent, 'h2', 'h2', 2,);
          setPopContent(extractedContent);
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
      <div className="pop-content" dangerouslySetInnerHTML={{ __html: popContent }} />
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
