import React, { Component, useEffect, useState } from 'react';
import classNames from 'classnames';

import useSound from 'use-sound';
import { useInView } from 'react-intersection-observer';
import style from './Duck.module.css';
import awp from '../../audio/awp.mp3';
import quack from '../../audio/quack.mp3';

function Duck({ coordinates, isKill, onClick }) {
  const { ref, inView } = useInView();
  const [awpPlay] = useSound(awp, {
    volume: 0.5,
  });
  const [quackPlay, { stop: quackStop }] = useSound(quack, {
    volume: 0.5,
    loop: true,
  });
  const { x, y } = coordinates;
  const handleClick = () => {
    if (!isKill) {
      awpPlay();
      onClick();
      quackStop();
    }
  };

  useEffect(() => {
    if (inView) quackPlay();
    if (!inView) quackStop();
  }, [inView]);

  return <div ref={ref} style={{ transform: `translate(${x}px, ${y}px)` }} onClick={handleClick} className={classNames(style.duck, isKill && style.kill)} />;
}

export default Duck;
