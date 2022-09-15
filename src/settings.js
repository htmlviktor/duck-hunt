const DUCK_SIZE = {
  width: 90,
  height: 90,
};

const DUCK_DURATION_TIME = 5000;

const DEFAULT_POSITION = {
  x: -100,
  y: 200,
};

const GAME_STATE = {
  PLAY: 'play',
  STOP: 'stop',
  READY: 'ready',
  PENDING: 'pending',
  FINISH: 'finish',
};

const PLAYER_STATE = {
  SUCCESS: 'success',
  LOOSE: 'loose',
};

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL;

export {
  DUCK_SIZE, DEFAULT_POSITION, GAME_STATE, DUCK_DURATION_TIME, PLAYER_STATE, SOCKET_URL,
};
