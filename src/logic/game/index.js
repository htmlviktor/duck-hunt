import { createSlice } from '@reduxjs/toolkit';
import { GAME_STATE } from '../../settings';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    value: GAME_STATE.PENDING,
    allGamesCount: 1,
    currentGame: 0,
    playerName: 'Anonymous',
  },
  reducers: {
    setGameStatus: (state, action) => {
      state.value = action.payload;
    },
    setAllGames: (state, action) => {
      state.allGamesCount = action.payload;
    },
    resetCurrentGame: (state) => {
      state.currentGame = 0;
    },
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
    },
  },
});

export const { setGameStatus, setAllGames, setPlayerName } = gameSlice.actions;

export default gameSlice.reducer;
