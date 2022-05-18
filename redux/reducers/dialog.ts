import { HYDRATE } from "next-redux-wrapper";
import { AnyAction } from "redux";
import { DialogActionTypes, DialogState } from "../types/dialog";
import { MessageActionTypes } from "../types/message";

const initialState: DialogState = {
  items: [],
  currentDialogId:
    typeof window !== "undefined" &&
    +window?.location.pathname.split("dialogs/")[1],
  isLoading: false,
  error: null,
};

export const dialogReducer = (
  state = initialState,
  action: AnyAction
): DialogState => {
  console.log("reducer");
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload.dialog };

    case DialogActionTypes.REQUEST_DIALOGS_SUCCESS:
      return { ...state, items: action.payload, isLoading: false };

    case DialogActionTypes.REQUEST_DIALOGS_ERROR:
      return { ...state, error: action.payload, isLoading: false };

    case MessageActionTypes.ADD_MESSAGE:
      return {
        ...state,
        items: state.items.map((dialogObj) => {
          if (dialogObj.id === action.payload.dialog.id)
            dialogObj.lastMessage = action.payload;

          return dialogObj;
        }),
      };

    case DialogActionTypes.REQUEST_CREATE_DIALOG_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
        isLoading: false,
      };

    case DialogActionTypes.REQUEST_CREATE_DIALOG_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case DialogActionTypes.REQUEST_DELETE_DIALOG_SUCCESS: {
      const newItems = state.items.filter(
        (dialogObj) => dialogObj.id !== action.payload
      );
      return { ...state, items: newItems, isLoading: false };
    }

    case DialogActionTypes.REQUEST_DELETE_DIALOG_ERROR: {
      const newItems = state.items.filter(
        (dialogObj) => dialogObj.id !== action.payload
      );
      return { ...state, error: action.payload, isLoading: false };
    }

    case DialogActionTypes.SET_IS_LOADING_DIALOG:
      return { ...state, isLoading: action.payload };

    case DialogActionTypes.SET_CURRENT_DIALOG:
      // console.log(("yes"));
      // console.log(action.payload);

      return { ...state, currentDialogId: action.payload, isLoading: false };

    case DialogActionTypes.SET_READED_STATUS_LAST_MESSAGE:
      console.log(state.items);
      return {
        ...state,
        items: state.items.map((dialogObj) => {
          if (dialogObj.id === action.payload && dialogObj.lastMessage !== null)
            dialogObj.lastMessage.read = true;

          return dialogObj;
        }),
      };

    case DialogActionTypes.DELETE_MESSAGE:
      return {
        ...state,
        items: state.items.map((dialogObj) => {
          if (dialogObj.id === action.payload.dialogId)
            dialogObj.lastMessage = action.payload.message;

          return dialogObj;
        }),
      };

    case DialogActionTypes.SET_IS_ONLINE:
      return {
        ...state,
        items: state.items.map((dialogObj) => {
          const userIndex = dialogObj.users.findIndex(
            (user) => user.id === action.payload.userId
          );
          dialogObj.users[userIndex].isOnline = action.payload.isOnline;

          return dialogObj;
        }),
      };

    default:
      return state;
  }
};

export default dialogReducer;
