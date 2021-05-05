import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import userReducer from './user/userReducer';
import fileReducer from './file/fileReducer';
import uploadReducer from './upload/uploadReducer';

const rootReducer = combineReducers({
  user: userReducer,
  files: fileReducer,
  upload: uploadReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
