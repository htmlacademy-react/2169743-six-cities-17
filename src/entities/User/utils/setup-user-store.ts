import type { TUserState } from './../types';

function setupUserState(): TUserState {
  return {
    profile: null,
    favorites: [],
  };
}

export default setupUserState;
