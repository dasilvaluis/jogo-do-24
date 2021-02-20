import { SET_DIFFICULTY } from './types';

export default {
  setDifficulty: (grade) => ({
    type: SET_DIFFICULTY,
    payload: grade,
  }),
};
