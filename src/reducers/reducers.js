import configureAPI from "../configure-API.js";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer} from "./app/app";
import {filmsReducer} from "./films/films";
import {genreFilterReducer} from "./genres/genres";
import {catalogReducer} from "./catalog/catalog";
import {compose} from "recompose";
import thunk from "redux-thunk";
import StoreNameSpace from "./store-name-space";
import {commentsReducer} from "./comments/comments";
import {userReducer} from "./user/user";

const api = configureAPI((...args) => configuredStore.dispatch(...args));

const rootReducer = combineReducers({
  [StoreNameSpace.APP]: appReducer,
  [StoreNameSpace.FILMS]: filmsReducer,
  [StoreNameSpace.COMMENTS]: commentsReducer,
  [StoreNameSpace.GENRES]: genreFilterReducer,
  [StoreNameSpace.CATALOG]: catalogReducer,
  [StoreNameSpace.USER]: userReducer
});

const configuredStore = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

export default configuredStore;
