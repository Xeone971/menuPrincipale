import React, { useEffect } from 'react';

const fetchGenres = async () => {
  try {
    const response = await fetch(
      "https://fr.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=true&explaintext=true&titles=Genre_musicalorigin=*"
    );
    const data = await response.json();

    const page = data.query.pages[Object.keys(data.query.pages)[0]];
    const genreText = page.extract;

    const genres = genreText.match(/\[\[(.*?)\]\]/g).map(match => match.replace(/\[\[|\]\]/g, ''));

    console.log("Genres musicaux principaux :", genres);

    // Naviguer vers la page du premier genre musical (vous pouvez personnaliser cela)
    if (genres.length > 0) {
      const firstGenre = genres[0];
      navigateToGenrePage(firstGenre);
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des genres :", error);
  }
};

const navigateToGenrePage = (genre) => {
  const genrePageUrl = `https://fr.wikipedia.org/wiki/${encodeURIComponent(genre)}`;
  window.open(genrePageUrl, '_blank'); // Ouvrir dans un nouvel onglet
};

const GenrePageNavigator = () => {
  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div>
      <h1>Genres Musicaux</h1>
      <p>Cliquez sur le bouton pour naviguer vers la page du premier genre musical.</p>
      <button onClick={() => fetchGenres()}>Récupérer et naviguer</button>
    </div>
  );
};

export default GenrePageNavigator;
