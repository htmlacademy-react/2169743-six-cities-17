import type { TUserDataState } from '../types';

function setupUserState(): TUserDataState {
  return {
    profile: null,
    favorites: [],
  };
}

export default setupUserState;
