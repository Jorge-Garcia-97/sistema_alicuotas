import throttle from "lodash.throttle";
import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./authReducer";
import { datosReducer } from "./datosReducer";

const reducers = combineReducers({
  auth: authReducer,
  data: datosReducer
});

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

const persistedState = loadState();

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    console.log(e);
  }
};

export const store = createStore(reducers, persistedState, applyMiddleware(thunk));

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);
