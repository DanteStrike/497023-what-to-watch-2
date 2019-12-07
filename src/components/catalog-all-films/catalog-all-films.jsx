import React from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";
import configs from "../../configs.js";

import GenreList from "../genre-list/genre-list.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";

import {catalogActions, catalogSelectors} from "../../reducers/catalog/catalog.js";
import {genreFilterActions, genreFilterSelectors} from "../../reducers/genres/genres.js";
import {filmsSelectors} from "../../reducers/films/films.js";


class CatalogAllFilms extends React.PureComponent {
  constructor(props) {
    super(props);

    this._defaultGenre = configs.catalogAllFilmsConfig.defaultGenre;
    this._defaultItemsAmount = configs.catalogAllFilmsConfig.defaultItemsAmount;
    this._increaseAmountRate = configs.catalogAllFilmsConfig.increaseAmountRate;

    this._showMoreItems = this._showMoreItems.bind(this);
  }

  componentDidMount() {
    const {maxItemsAmount, setCurrentFilter, setDisplayedItems} = this.props;

    setCurrentFilter(this._defaultGenre);
    setDisplayedItems(this._defaultItemsAmount, maxItemsAmount);
  }

  componentDidUpdate(prevProps) {
    const {currentFilter, maxItemsAmount, setDisplayedItems} = this.props;

    if (prevProps.currentFilter !== currentFilter) {
      setDisplayedItems(this._defaultItemsAmount, maxItemsAmount);
    }
  }

  _showMoreItems() {
    const {itemsAmount, maxItemsAmount, showMoreItems} = this.props;

    showMoreItems(itemsAmount, this._increaseAmountRate, maxItemsAmount);
  }

  render() {
    const {itemsAmount, maxItemsAmount, filmsCards} = this.props;

    return (
      <section className={`catalog`}>
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <GenreList/>
        <MoviesList filmsCards={filmsCards}/>
        {(itemsAmount < maxItemsAmount) &&
          <ShowMoreButton onShowMoreButtonClick={this._showMoreItems}/>
        }
      </section>
    );
  }
}

CatalogAllFilms.propTypes = {
  currentFilter: PropTypes.string.isRequired,
  itemsAmount: PropTypes.number.isRequired,
  maxItemsAmount: PropTypes.number.isRequired,

  setCurrentFilter: PropTypes.func.isRequired,
  setDisplayedItems: PropTypes.func.isRequired,
  showMoreItems: PropTypes.func.isRequired,

  filmsCards: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    preview: PropTypes.exact({
      image: PropTypes.string.isRequired,
      videoSrc: PropTypes.string.isRequired
    }).isRequired
  }))
};

const mapStateToProps = (store) => ({
  currentFilter: genreFilterSelectors.getCurrentFilter(store),
  itemsAmount: catalogSelectors.getDisplayedFilmsAmount(store),
  maxItemsAmount: genreFilterSelectors.getCurrentFilterFilmsAmount(store),
  filmsCards: filmsSelectors.getDisplayedCardInfo(store),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentFilter: (genre) => dispatch(genreFilterActions.setCurrentFilter(genre)),
  setDisplayedItems: (amount, maxAmount) => dispatch(catalogActions.setDisplayedFilmsAmount(amount, maxAmount)),
  showMoreItems: (currentAmount, increaseRate, maxAmount) => dispatch(catalogActions.showMoreFilms(currentAmount, increaseRate, maxAmount))
});


export {CatalogAllFilms};
export default connect(mapStateToProps, mapDispatchToProps)(CatalogAllFilms);
