import { motion } from 'framer-motion';
// import { accentsTidy } from '../../libs/utils';

const genresMusicaux = [
  "Blues", "Chanson française", "Dubstep", "Drum and bass", "Easy listening",
  "Electronic dance music", "Electronica", "Funk", "Gospel", "Heavy metal",
  "Jazz", "Musique classique", "Musique country", "Musique électronique",
  "Musique expérimentale", "Musique folk", "Musique instrumentale", "Musique latine",
  "Musique soul", "Musiques du monde", "New age", "Pop", "Rap", "Reggae",
  "RnB contemporain", "Rock", "Tekno"
];

const Menu = () => {
  const circleVariants = {
    initial: {
      scale: 0,
    },
    animate: {
      scale: 1,
    },
  };

  const circles = genresMusicaux.map((genre, index) => (
    <motion.a
    //   href={`/infos/${accentsTidy(genre)}`}
      key={index}
      className="circle"
      variants={circleVariants}
      initial="initial"
      animate="animate"
    >
      <p>{genre}</p>
    </motion.a>
  ));

  return (
    <div className="circle-selection-page">
      {circles}
      <style jsx>{`
        .circle-selection-page {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f0f0f0;
        }

        .circle {
          width: 100px;
          height: 100px;
          background-color: #0070f3;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px;
          cursor: pointer;
        }

        p {
          color: white;
          font-size: 13px;
          font-weight: bold;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

