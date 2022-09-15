import React, { useContext, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Area from '../area/Area';

import { DEFAULT_POSITION, GAME_STATE, PLAYER_STATE } from '../../settings';

import {
  getAllGamesCount, getGameState, getPlayerName,
} from '../../logic/game/selectors';
import GameForm from '../game-form/GameForm';
import { setAllGames, setGameStatus, setPlayerName } from '../../logic/game';
import { SocketContext } from '../../service/socket';
import { getProgress } from '../../logic/player/selectors';
import Congratulation from '../congratulation/Congratulation';
import { clearProgress } from '../../logic/player';

function App({
  gameStatus,
  progress,
  playerName,
  allCount,
  setInitialGame,
  setStatusGame,
  resetPlayerGame,
}) {
  const { socketConnect, socket } = useContext(SocketContext);
  const [startPosition, setStartPosition] = useState(DEFAULT_POSITION);

  const onFormSubmit = ({ name, count }) => {
    setInitialGame(name, count);
    setStatusGame(GAME_STATE.READY);
    socket.emit('readyGame');
  };

  const onBtnClick = () => {
    setStatusGame(GAME_STATE.PENDING);
    resetPlayerGame();
  };

  useEffect(() => {
    socket.on('startGame', (res) => {
      setStatusGame(GAME_STATE.PLAY);
      setStartPosition(res.coordinates);
    });
  }, [socket]);

  useEffect(() => {
    if (progress.length === allCount) {
      socket.emit('gameFinish');
      setStatusGame(GAME_STATE.FINISH);
    }
  }, [progress.length]);

  return (
    <Area startPosition={startPosition}>
      {gameStatus === GAME_STATE.PENDING && (
      <GameForm
        onSubmit={onFormSubmit}
        isDisabled={socketConnect}
      />
      )}
      {gameStatus === GAME_STATE.FINISH && (
      <Congratulation
        name={playerName}
        result={`${progress.filter((it) => it === PLAYER_STATE.SUCCESS).length} / ${allCount}`}
        onBtnClick={onBtnClick}
      />
      )}
    </Area>
  );
}

const mapStateToProps = (state) => ({
  gameStatus: getGameState(state),
  progress: getProgress(state),
  allCount: getAllGamesCount(state),
  playerName: getPlayerName(state),
});

const mapDispatchToProps = (dispatch) => ({
  setInitialGame: (name, count) => {
    dispatch(setAllGames(Number(count)));
    dispatch(setPlayerName(name));
  },
  setStatusGame: (status) => dispatch(setGameStatus(status)),
  resetPlayerGame: () => {
    dispatch(clearProgress());
    dispatch(setAllGames(1));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
