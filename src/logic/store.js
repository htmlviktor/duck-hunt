import { configureStore } from '@reduxjs/toolkit';
import gameReducer from './game';
import playerReducer from './player';

export default configureStore({
  reducer: {
    game: gameReducer,
    player: playerReducer,
  },
});
