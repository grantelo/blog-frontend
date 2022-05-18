import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { MessageActionTypes, MessageState } from "../types/message";

const initialState: MessageState = {
  items: [],
  isLoading: false,
  error: null,
};

export const messageReducer = (
  state = initialState,
  action: AnyAction
): MessageState => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.message };

    case MessageActionTypes.REQUEST_MESSAGES_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isLoading: false,
        error: null,
      };

    case MessageActionTypes.REQUEST_MESSAGES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case MessageActionTypes.ADD_MESSAGE: {
      return {
        ...state,
        items: [...state.items, action.payload],
        isLoading: false,
      };
    }

    case MessageActionTypes.REQUEST_DELETE_MESSAGE_SUCCESS: {
      return {
        ...state,
        items: state.items.filter(
          (messageObj) => messageObj.id !== action.payload
        ),
        isLoading: false,
        error: null,
      };
    }

    case MessageActionTypes.REQUEST_DELETE_MESSAGE_ERROR: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case MessageActionTypes.SET_READED_STATUS_LAST_MESSAGES: {
      console.log(state.items);

      return {
        ...state,
        items: state.items.map((messageObj) => {
          if (messageObj.dialog.id === action.payload) messageObj.read = true;

          return messageObj;
        }),
      };
    }

    default:
      return state;
  }
};

export default messageReducer;
