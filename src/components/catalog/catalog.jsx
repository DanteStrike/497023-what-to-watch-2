import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MoviesList from "../movies-list/movies-list.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import {appSelectors} from "../../reducers/app/index.js";
import {movieListActions, movieListSelectors} from "../../reducers/movie-list/index.js";
import {genreFilterActions, genreFilterSelectors} from "../../reducers/genre-filter/index.js";

const Catalog = (props) => {
  const {
    defaultFilter,
    currentFilter,
    defaultItemsAmount,
    isItemsLoaded,
    itemsAmount,
    increaseAmountRate,
    maxItemsAmount,
    setDefaultFilter,
    setDisplayedItems,
    showMoreItems
  } = props;

  useEffect(() => {
    setDefaultFilter(defaultFilter);
  }, [isItemsLoaded]);

  useEffect(() => {
    setDisplayedItems(defaultItemsAmount, maxItemsAmount);
  }, [isItemsLoaded, currentFilter]);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <GenreList/>
      <MoviesList/>
      {(itemsAmount < maxItemsAmount) ?
        <div className="catalog__more">
          <button className="catalog__button" type="button" onClick={() => showMoreItems(itemsAmount, increaseAmountRate, maxItemsAmount)}>Show more</button>
        </div> : null
      }
    </section>
  );
};

Catalog.propTypes = {
  isItemsLoaded: PropTypes.bool.isRequired,
  defaultFilter: PropTypes.string.isRequired,
  defaultItemsAmount: PropTypes.number.isRequired,
  currentFilter: PropTypes.string.isRequired,
  increaseAmountRate: PropTypes.number.isRequired,
  itemsAmount: PropTypes.number.isRequired,
  maxItemsAmount: PropTypes.number.isRequired,
  setDefaultFilter: PropTypes.func.isRequired,
  setDisplayedItems: PropTypes.func.isRequired,
  showMoreItems: PropTypes.func.isRequired
};

const mapStateToProps = (store) => ({
  isItemsLoaded: appSelectors.getAppIsReady(store),
  currentFilter: genreFilterSelectors.getCurrentFilter(store),
  itemsAmount: movieListSelectors.getDisplayedFilmsAmount(store),
  maxItemsAmount: genreFilterSelectors.getCurrentFilterFilmsAmount(store),
});

const mapDispatchToProps = (dispatch) => ({
  setDefaultFilter: (genre) => dispatch(genreFilterActions.setCurrentFilter(genre)),
  setDisplayedItems: (amount, maxAmount) => dispatch(movieListActions.setDisplayedFilmsAmount(amount, maxAmount)),
  showMoreItems: (currentAmount, increaseRate, maxAmount) => dispatch(movieListActions.showMoreFilms(currentAmount, increaseRate, maxAmount))
});


export {Catalog};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
