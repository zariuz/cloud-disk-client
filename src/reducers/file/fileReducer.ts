const SET_FILES = 'SET_FILES';
const SET_CURRENT_DIR = 'SET_CURRENT_DIR';
const ADD_FILE = 'ADD_FILE';
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY';
const PUSH_TO_STACK = 'PUSH_TO_STACK';
const DELETE_FILE = 'DELETE_FILE';
const SET_VIEW = 'SET_VIEW';

type stateType = {
  files: Object[] | any;
  currentDir: null | string;
  popupDisplay: string;
  dirStack: Array<String>;
  view: string;
};

const defaultState: stateType = {
  files: [],
  currentDir: null,
  popupDisplay: 'none',
  dirStack: [],
  view: 'list',
};

export default function fileReducer(state = defaultState, action: any) {
  switch (action.type) {
    case SET_FILES:
      return {
        ...state,
        files: action.payload,
      };
    case SET_CURRENT_DIR:
      return {
        ...state,
        currentDir: action.payload,
      };
    case ADD_FILE:
      return {
        ...state,
        files: [...state.files, action.payload],
      };
    case SET_POPUP_DISPLAY:
      return {
        ...state,
        popupDisplay: action.payload,
      };
    case PUSH_TO_STACK:
      return {
        ...state,
        dirStack: [...state.dirStack, action.payload],
      };
    case DELETE_FILE:
      return {
        ...state,
        files: [...state.files.filter((file: any) => file._id !== action.payload)],
      };
    case SET_VIEW:
      return {...state, view: action.payload};
    default:
      return state;
  }
}

export const setFiles = (files: any) => ({type: SET_FILES, payload: files});
export const setCurrentDir = (dir: any) => ({type: SET_CURRENT_DIR, payload: dir});
export const addFile = (file: any) => ({type: ADD_FILE, payload: file});
export const setPopupDisplay = (display: any) => ({
  type: SET_POPUP_DISPLAY,
  payload: display,
});
export const pushToStack = (dir: any) => ({type: PUSH_TO_STACK, payload: dir});
export const deleteFileAction = (dirId: any) => ({type: DELETE_FILE, payload: dirId});
export const setFileView = (payload: any) => ({type: SET_VIEW, payload});
