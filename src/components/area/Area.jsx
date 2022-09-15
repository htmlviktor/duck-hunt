import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import style from './Area.module.css';
import Counter from '../counter/Counter';
import Duck from '../duck/Duck';
import { DEFAULT_POSITION, DUCK_DURATION_TIME, GAME_STATE } from '../../settings';
import { addLoosedPlayerGame, addSuccessPlayerGame } from '../../logic/player';
import { setGameStatus } from '../../logic/game';
import useAnimationFrame from '../../hooks/use-animation-frame';
import useWindowWidth from '../../hooks/use-window-width';
import { getAllGamesCount, getGameState } from '../../logic/game/selectors';
import { getProgress } from '../../logic/player/selectors';

function Area({
  children,
  allCount,
  progress,
  gameStatus,
  addSuccessGame,
  addLoosedGame,
  setStatusGame,
  startPosition,
}) {
  const windowWidth = useWindowWidth();
  const [isDuckKill, setIsKill] = useState(false);
  const [duckPosition, setDuckPosition] = useState(DEFAULT_POSITION);

  const resetGame = () => {
    setTimeout(() => {
      setDuckPosition(DEFAULT_POSITION);
      setIsKill(false);
    }, 3000);
  };

  const handleDuckShoot = () => {
    addSuccessGame();
    setIsKill(true);
    setStatusGame(GAME_STATE.STOP);
    resetGame();
  };

  const handleDuckMiss = () => {
    addLoosedGame();
    setStatusGame(GAME_STATE.STOP);
    resetGame();
  };

  const setHandlePosition = (time) => {
    setDuckPosition(
      (prevState) => ({ x: time * windowWidth, y: prevState.y - 1 }),
    );
  };

  useAnimationFrame(setHandlePosition, DUCK_DURATION_TIME, gameStatus === GAME_STATE.PLAY);

  useEffect(() => {
    if (duckPosition.x >= windowWidth) handleDuckMiss();
  }, [duckPosition, windowWidth]);

  useEffect(() => {
    setDuckPosition(startPosition);
  }, [startPosition.y]);

  return (
    <div className={style.area}>
      {children}
      <Duck coordinates={duckPosition} isKill={isDuckKill} onClick={handleDuckShoot} />
      <Counter allCount={allCount} progress={progress} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  gameStatus: getGameState(state),
  progress: getProgress(state),
  allCount: getAllGamesCount(state),
});

const mapDispatchToProps = (dispatch) => ({
  addSuccessGame: () => dispatch(addSuccessPlayerGame()),
  addLoosedGame: () => dispatch(addLoosedPlayerGame()),
  setStatusGame: (status) => dispatch(setGameStatus(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Area);
