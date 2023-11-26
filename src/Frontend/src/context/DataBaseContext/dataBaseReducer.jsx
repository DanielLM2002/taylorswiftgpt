import { SESSION, CURRENT_CHAT } from '../../types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case SESSION: {
      return {
        ...state,
        session: payload
      };
    } break;
    case CURRENT_CHAT: {
      return {
        ...state,
        currentChat: payload
      };
    } break;
  };
};
