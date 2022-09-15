import { createSlice } from '@reduxjs/toolkit';
import { PLAYER_STATE } from '../../settings';

export const playerSlice = createSlice({
  name: 'player',
  initialState: {
    progress: [],
  },
  reducers: {
    addSuccessPlayerGame: (state) => {
      state.progress.push(PLAYER_STATE.SUCCESS);
    },
    addLoosedPlayerGame: (state) => {
      state.progress.push(PLAYER_STATE.LOOSE);
    },
    clearProgress: (state) => {
      state.progress = [];
    },
  },
});

export const { addSuccessPlayerGame, addLoosedPlayerGame, clearProgress } = playerSlice.actions;

export default playerSlice.reducer;
