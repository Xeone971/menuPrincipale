import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { accentsTidy } from './accentsTidy';
import { useNavigate } from "react-router-dom";

// import circles from "./menu"
import './carousel.scss';
import './carouCss.css'



const Carousel = ({ Data }) => {
  document.body.style.backgroundColor = "black";
  const [FlowDirection, setFlowDirection] = useState(true);
  const [CenterId, setCenterId] = useState(0);
  const [LeftId, setLeftId] = useState(Data.length - 1);
  const [RightId, setRightId] = useState(1);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  // const contentRef = useRef(null);

  const nextBtn = () => {
    if (LeftId === Data.length - 1) {
      setLeftId(0);
    } else {
      setLeftId(LeftId + 1);
    }
    if (CenterId === Data.length - 1) {
      setCenterId(0);
    } else {
      setCenterId(CenterId + 1);
    }
    if (RightId === Data.length - 1) {
      setRightId(0);
    } else {
      setRightId(RightId + 1);
    }
    setFlowDirection(true);
  };

  const prevBtn = () => {
    setFlowDirection(false);
    if (LeftId === 0) {
      setLeftId(Data.length - 1);
    } else {
      setLeftId(LeftId - 1);
    }
    if (CenterId === 0) {
      setCenterId(Data.length - 1);
    } else {
      setCenterId(CenterId - 1);
    }
    if (RightId === 0) {
      setRightId(Data.length - 1);
    } else {
      setRightId(RightId - 1);
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    if (isDragging) {
      const delta = e.touches[0].clientX - dragStart;
      setDragDelta(delta);
      // Ajustez la logique pour ne déplacer qu'un seul élément à la fois
      // contentRef.current.style.transform = `translateX(${delta}px)`;
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
    // Vérifiez si le déplacement a franchi un seuil pour changer d'élément
    if (Math.abs(dragDelta) > 180) {
      if (dragDelta > 0) {
        prevBtn();
      } else {
        nextBtn();
      }
    }
    // contentRef.current.style.transform = 'translateX(0)';
  };
  const navigate = useNavigate();
  const handleAnimationAndRedirect = (text) => {
    
  // Code pour lancer l'animation avant la redirection
  // Par exemple, tu peux utiliser framer-motion pour animer le contenu avant la redirection
    console.log("handleanimatio,")
  // Une fois l'animation terminée, tu peux effectuer la redirection vers la nouvelle page
  // const history = useHistory();
  const cleanText = accentsTidy(text);
  // history.push(`/infos/${cleanText}`);
  
  setTimeout(() => {
    navigate(`/infos/${cleanText}`)
  }, 2500);
  return (
    <motion.div
      className="box3"
      initial={{ opacity: 1, scale: 1.2 }}
      animate={{ scale: [1.2, 80], opacity: 1 }}
      transition={{
        duration: 1.5,
        ease: "easeInOut"
      }}
    />
  );
};


  // const handleDragStart = (e) => {
  //   setIsDragging(true);
  //   setDragStart(e.clientX);
  // };

  // const handleDragMove = (e) => {
  //   if (isDragging) {
  //     const delta = e.clientX - dragStart;
  //     setDragDelta(delta);
  //     contentRef.current.style.transform = `translateX(${delta}px)`;
  //   }
  // };

  // const handleDragEnd = () => {
  //   setIsDragging(false);
  //   if (Math.abs(dragDelta) > 180) {
  //     if (dragDelta > 0) {
  //       nextBtn();
  //     } else {
  //       prevBtn();
  //     }
  //   }
  //   contentRef.current.style.transform = 'translateX(0)';
  // };

  const variants = {
    center: {
      x: '0rem',
      opacity: 1,
      scale: 1.1,
      zIndex: '5',
      filter: 'brightness(100%)',
      backgroundImage: `url(${Data[CenterId]})`,
      boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.3)',
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
    left: {
      x: '-35rem',
      opacity: 1,
      filter: 'brightness(40%)',
      scale: 1,
      backgroundImage: `url(${Data[LeftId]})`,
      zIndex: '4',
      boxShadow: 'unset',
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
    right: {
      backgroundImage: `url(${Data[RightId]})`,
      x: '35rem',
      opacity: 1,
      filter: 'brightness(40%)',
      scale: 1,
      boxShadow: 'unset',
      zIndex: '3',
      transition: {
        type: 'spring',
        duration: 1,
      },
    },
    rightHidden: {
      x: '50rem',
      scale: 0,
      opacity: 0,
    },
    leftHidden: {
      x: '-50rem',
      scale: 0,
      opacity: 0,
    },
  };

  return (
    <motion.div className="carousel-wrapper">
      <motion.div
        className="carousel-content"
        // ref={contentRef}
        // ... (gestion des événements tactiles/souris)
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={LeftId}
            variants={variants}
            initial={FlowDirection ? 'center' : 'leftHidden'}
            animate="left"
            exit={'leftHidden'} 
            className="carousel-item"
            // style={{ backgroundImage: `url(${Data[LeftId].image})` }}
          >
            <img src={Data[LeftId].image} alt="" />
            <a href={`/infos/${accentsTidy(Data[LeftId].text)}`} className="carousel-link">
              <div className="carousel-overlay">
                {Data[LeftId].text}
              </div>
            </a>
          </motion.div>
          <motion.div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            variants={variants}
            key={CenterId}
            initial={FlowDirection ? 'right' : 'left'}
            animate="center"
            className="carousel-item"
            // style={{ backgroundImage: `url(${Data[CenterId].image})` }}
          >
            <img src={Data[CenterId].image} alt="" />
            {/* <a href={`/infos/${accentsTidy(Data[CenterId].text)}`} className="carousel-link"> */}
              <div className="carousel-overlay" onClick={() => handleAnimationAndRedirect(Data[CenterId].text)}>
                {Data[CenterId].text}
              </div>
            {/* </a> */}
          </motion.div>
          <motion.div
            key={RightId}
            variants={variants}
            initial={FlowDirection ? 'rightHidden' : 'center'}
            animate="right"
            exit={'rightHidden'}
            className="carousel-item"
            // style={{ backgroundImage: `url(${Data[RightId].image})` }}
          >
          <img src={Data[RightId].image} alt="" />
            <a href={`/infos/${accentsTidy(Data[RightId].text)}`} className="carousel-link">
              <div className="carousel-overlay">
                {Data[RightId].text}
              </div>
            </a>
          </motion.div>
        </AnimatePresence>
      </motion.div>
      <div className="carousel-btns">
        <motion.button
          className="bwd-btn"
          onClick={prevBtn}
        >
          Back
        </motion.button>
        <motion.button
          className="fwd-btn"
          onClick={nextBtn}
        >
          Next
        </motion.button>
      </div>
    </motion.div>
  );
  
};


const Carou = () =>{
  // const CarouselData = [
  //   'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=662&q=80',
  //   'https://images.unsplash.com/photo-1586671267731-da2cf3ceeb80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=689&q=80',
  //   'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
  //   'https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
  //   'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
  //   'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=685&q=80',
  // ]
  // const CarouselData = [
  //   "Blues", "Chanson française", "Dubstep", "Drum and bass", "Easy listening",
  //   "Electronic dance music", "Electronica", "Funk", "Gospel", "Heavy metal",
  //   "Jazz", "Musique classique", "Musique country", "Musique électronique",
  //   "Musique expérimentale", "Musique folk", "Musique instrumentale", "Musique latine",
  //   "Musique soul", "Musiques du monde", "New age", "Pop", "Rap", "Reggae",
  //   "RnB contemporain", "Rock", "Tekno"
  // ];

  const CarouselData = [
    {
      text: "Blues",
      image: "../../media/Blues/B.B._King.jpg"
    },
    {
      text: "Chanson française",
      image: "../../media/Chanson-francaise/Edith_Piaf.jpg"
    },
    {
      text: "Dubstep",
      image: "../../media/Dubstep/Skream.jpg"
    },
    {
      text: "Drum and bass",
      image: "../../media/Drum_and_bass/pendulum.jpeg"
    },
    {
      text: "Easy listening",
      image: "../../media/Easy_listening/image.jpg"
    },
    {
      text: "Electronic dance music",
      image: "../../media/Electronic-dance-music/Avicii.jpg"
    },
    {
      text: "Electronica",
      image: "../../media/Electronica/Rei-Harakami.jpg"
    },
    {
      text: "Funk",
      image: "../../media/Funk/James-brown.jpg"
    },
    {
      text: "Heavy metal",
      image: "../../media/Heavy-metal/Black-Sabbath.jpg"
    },
    {
      text: "Jazz",
      image: "../../media/Jazz/Louis_Armstrong.jpg"
    },
    {
      text: "Musique classique",
      image: "../../media/Musique-classique/Mozart.jpg"
    },
    {
      text: "Musique country",
      image: "../../media/Musique-country/Vernon_Dalhart.jpg"
    },
    {
      text: "Musique électronique",
      image: "../../media/Musique-electronique/Image1.jpg"
    },
    {
      text: "Musique expérimentale",
      image: "../../media/Musique-experimentale/Image.jpg"
    },
    {
      text: "Musique folk",
      image: "../../media/Musique-folk/Namgar.jpg"
    },
    {
      text: "Musique instrumentale",
      image: "../../media/Musique-instrumentale/Image.jpg"
    },
    {
      text: "Musique latine",
      image: "../../media/Musique-latine/Image.jpg"
    },
    {
      text: "Musique soul",
      image: "../../media/Musique-soul/James_Brown.jpg"
    },
    {
      text: "Musiques du monde",
      image: "../../media/Musique-du-monde/Image.jpg"
    },
    {
      text: "New age",
      image: "../../media/New-age/کیتاروی جوان_(Kitaro).jpg"
    },
    {
      text: "Pop",
      image: "../../media/Pop/The_Beatles_members.jpg"
    },
    {
      text: "Rap",
      image: "../../media/Rap/Tupac_Shakur.jpg"
    },
    {
      text: "Reggae",
      image: "../../media/Reggae/Bob_Marley.jpg"
    },
    {
      text: "RnB contemporain",
      image: "../../media/RnB-contemporain/Alicia_Keys.jpg"
    },
    {
      text: "Rock",
      image: "../../media/Rock/Chuck_Berry.jpg"
    },
    {
      text: "Tekno",
      image: "../../media/Tekno/Scooter.jpg"
    }
    // Ajoutez d'autres genres ici avec leurs noms et URLs d'image correspondantes
  ];
  const [IsActive, setIsActive] = useState(true)
  
  return (
    <div className="App">
      <motion.div className="carousel"
       initial={{ opacity: 0, scale: 0.8 }}
       animate={{ scale: 1, opacity: 1 }}
       transition={{
         duration: 0.2
       }}>
        {/* <h1>Carousal 3D</h1> */}
        <Carousel Data={CarouselData} />
      </motion.div>

    </div>
  )
}
export default Carou;
