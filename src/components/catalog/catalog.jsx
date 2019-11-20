import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MoviesList from "../movies-list/movies-list.jsx";
import GenreList from "../genre-list/genre-list.jsx";
import {appSelectors} from "../../reducers/app/index.js";
import {movieListActions, movieListSelectors} from "../../reducers/movie-list/index.js";
import {genreFilterActions, genreFilterSelectors} from "../../reducers/genre-filter/index.js";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";

class Catalog extends React.PureComponent {
  constructor(props) {
    super(props);

    this._showMoreItems = this._showMoreItems.bind(this);
  }

  componentDidMount() {
    const {defaultFilter, setCurrentFilter} = this.props;

    setCurrentFilter(defaultFilter);
  }

  componentDidUpdate(prevProps) {
    const {isItemsLoaded, currentFilter, defaultItemsAmount, maxItemsAmount, setDisplayedItems} = this.props;

    if (prevProps.isItemsLoaded !== isItemsLoaded || prevProps.currentFilter !== currentFilter) {
      setDisplayedItems(defaultItemsAmount, maxItemsAmount);
    }
  }

  _showMoreItems() {
    const {itemsAmount, increaseAmountRate, maxItemsAmount, showMoreItems} = this.props;

    showMoreItems(itemsAmount, increaseAmountRate, maxItemsAmount);
  }

  render() {
    const {itemsAmount, maxItemsAmount} = this.props;

    return (
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <GenreList/>
        <MoviesList/>
        {(itemsAmount < maxItemsAmount) &&
          <ShowMoreButton onShowMoreButtonClick={this._showMoreItems}/>
        }
      </section>
    );
  }
}

Catalog.propTypes = {
  defaultFilter: PropTypes.string.isRequired,
  defaultItemsAmount: PropTypes.number.isRequired,
  increaseAmountRate: PropTypes.number.isRequired,

  isItemsLoaded: PropTypes.bool.isRequired,
  currentFilter: PropTypes.string.isRequired,
  itemsAmount: PropTypes.number.isRequired,
  maxItemsAmount: PropTypes.number.isRequired,

  setCurrentFilter: PropTypes.func.isRequired,
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
  setCurrentFilter: (genre) => dispatch(genreFilterActions.setCurrentFilter(genre)),
  setDisplayedItems: (amount, maxAmount) => dispatch(movieListActions.setDisplayedFilmsAmount(amount, maxAmount)),
  showMoreItems: (currentAmount, increaseRate, maxAmount) => dispatch(movieListActions.showMoreFilms(currentAmount, increaseRate, maxAmount))
});


export {Catalog};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
