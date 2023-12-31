import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './carousel.scss';

const Carousel = ({ Data }) => {
  const [FlowDirection, setFlowDirection] = useState(true);
  const [CenterId, setCenterId] = useState(0);
  const [LeftId, setLeftId] = useState(Data.length - 1);
  const [RightId, setRightId] = useState(1);

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const contentRef = useRef(null);

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

  const handleDragStart = (e) => {
    setIsDragging(true);
    setDragStart(e.clientX);
  };

  const handleDragMove = (e) => {
    if (isDragging) {
      const delta = e.clientX - dragStart;
      setDragDelta(delta);
      contentRef.current.style.transform = `translateX(${delta}px)`;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (Math.abs(dragDelta) > 180) {
      if (dragDelta > 0) {
        nextBtn();
      } else {
        prevBtn();
      }
    }
    contentRef.current.style.transform = 'translateX(0)';
  };

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
      x: '-6rem',
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
      x: '6rem',
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
      x: '8rem',
      scale: 0,
      opacity: 0,
    },
    leftHidden: {
      x: '-8rem',
      scale: 0,
      opacity: 0,
    },
  };

  return (
    <motion.div className="carousel-wrapper">
      <motion.div
        className="carousel-content"
        ref={contentRef}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={LeftId}
            variants={variants}
            initial={FlowDirection ? 'center' : 'leftHidden'}
            animate="left"
            exit={'leftHidden'}
            className="carousel-item"
          ></motion.div>
          <motion.div
            variants={variants}
            key={CenterId}
            initial={FlowDirection ? 'right' : 'left'}
            animate="center"
            className="carousel-item"
          ></motion.div>
          <motion.div
            key={RightId}
            variants={variants}
            initial={FlowDirection ? 'rightHidden' : 'center'}
            animate="right"
            exit={'rightHidden'}
            className="carousel-item"
          ></motion.div>
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

export default Carousel;
