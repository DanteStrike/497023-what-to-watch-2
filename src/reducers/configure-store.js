import configureAPI from "../server/configure-API";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {appReducer} from "./app";
import {filmsReducer} from "./films";
import {genreFilterReducer} from "./genre-filter";
import {movieListReducer} from "./movie-list";
import {compose} from "recompose";
import thunk from "redux-thunk";

const api = configureAPI((...args) => configuredStore.dispatch(...args));

const rootReducer = combineReducers({
  app: appReducer,
  films: filmsReducer,
  genreFilter: genreFilterReducer,
  movieList: movieListReducer
});

const configuredStore = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument(api)),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
);

export default configuredStore;
