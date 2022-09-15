import NameSpace from '../name-space';

export const getGameState = (state) => state[NameSpace.GAME].value;
export const getAllGamesCount = (state) => state[NameSpace.GAME].allGamesCount;
export const getCurrentGame = (state) => state[NameSpace.GAME].currentGame;
export const getPlayerName = (state) => state[NameSpace.GAME].playerName;
