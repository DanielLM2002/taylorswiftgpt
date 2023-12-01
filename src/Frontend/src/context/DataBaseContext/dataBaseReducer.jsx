import { 
  CHATS, 
  LOADING,
  COLLECTION, 
  CURRENT_CHAT, 
  TEMPERATURE 
} from '../../types';

export default (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case CHATS: {
      return {
        ...state,
        chats: payload
      };
    } break;
    case LOADING: {
      return {
        ...state,
        loading: payload
      };
    } break;
    case COLLECTION: {
      return {
        ...state,
        _collection: payload
      };
    } break;
    case CURRENT_CHAT: {
      return {
        ...state,
        currentChat: payload
      };
    } break;
    case TEMPERATURE: {
      return {
        ...state,
        temperature: payload
      };
    } break;
  };
};
