import { USER_CREDENTIALS } from '../../types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_CREDENTIALS: {
      return {
        ...state, 
        userCredentials: payload
      };
    } break;
  }
};
