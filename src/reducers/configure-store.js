import configureAPI from "../server/configure-API";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer} from "./app";
import {filmsReducer} from "./films";
import {genreFilterReducer} from "./genres";
import {catalogReducer} from "./catalog";
import {compose} from "recompose";
import thunk from "redux-thunk";
import StoreNameSpace from "./store-name-space";
import {commentsReducer} from "./comments";

const api = configureAPI((...args) => configuredStore.dispatch(...args));

const rootReducer = combineReducers({
  [StoreNameSpace.APP]: appReducer,
  [StoreNameSpace.FILMS]: filmsReducer,
  [StoreNameSpace.COMMENTS]: commentsReducer,
  [StoreNameSpace.GENRES]: genreFilterReducer,
  [StoreNameSpace.CATALOG]: catalogReducer
});

const configuredStore = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

export default configuredStore;
