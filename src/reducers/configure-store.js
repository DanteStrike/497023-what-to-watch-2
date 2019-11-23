import configureAPI from "../server/configure-API";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer} from "./app";
import {filmsReducer} from "./films";
import {genreFilterReducer} from "./genre-filter";
import {movieListReducer} from "./movie-list";
import {compose} from "recompose";
import thunk from "redux-thunk";
import StoreNameSpace from "./store-name-space";

const api = configureAPI((...args) => configuredStore.dispatch(...args));

const rootReducer = combineReducers({
  [StoreNameSpace.APP]: appReducer,
  [StoreNameSpace.FILMS]: filmsReducer,
  [StoreNameSpace.GENRES]: genreFilterReducer,
  [StoreNameSpace.MOVIE_LIST]: movieListReducer
});

const configuredStore = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

export default configuredStore;
