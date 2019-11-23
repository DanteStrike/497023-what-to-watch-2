import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MoviesList from "../movies-list/movies-list.jsx";
import ShowMoreButton from "../show-more-button/show-more-button.jsx";
import {movieListActions, movieListSelectors} from "../../reducers/catalog/index.js";
import {genreFilterActions, genreFilterSelectors} from "../../reducers/genres/index.js";
import {filmsSelectors} from "../../reducers/films/index.js";


class Catalog extends React.PureComponent {
  constructor(props) {
    super(props);

    this._showMoreItems = this._showMoreItems.bind(this);
  }

  componentDidMount() {
    const {defaultFilter, defaultItemsAmount, maxItemsAmount, setCurrentFilter, setDisplayedItems} = this.props;

    setCurrentFilter(defaultFilter);
    setDisplayedItems(defaultItemsAmount, maxItemsAmount);
  }

  componentDidUpdate(prevProps) {
    const {currentFilter, defaultItemsAmount, maxItemsAmount, setDisplayedItems} = this.props;

    if (prevProps.currentFilter !== currentFilter) {
      setDisplayedItems(defaultItemsAmount, maxItemsAmount);
    }
  }

  _showMoreItems() {
    const {itemsAmount, increaseAmountRate, maxItemsAmount, showMoreItems} = this.props;

    showMoreItems(itemsAmount, increaseAmountRate, maxItemsAmount);
  }

  render() {
    const {title, classModifier, itemsAmount, maxItemsAmount, increaseAmountRate, filmsCards, children} = this.props;

    return (
      <section className={`catalog${(classModifier) ? ` ${classModifier}` : ``}`}>
        {(!title) ?
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          :
          <h2 className="catalog__title">{title}</h2>
        }

        {children}
        <MoviesList filmsCards={filmsCards}/>
        {(itemsAmount < maxItemsAmount) &&
          <ShowMoreButton onShowMoreButtonClick={this._showMoreItems}/>
        }
      </section>
    );
  }
}

Catalog.propTypes = {
  title: PropTypes.string,
  classModifier: PropTypes.string,
  children: PropTypes.element,

  defaultFilter: PropTypes.string.isRequired,
  defaultItemsAmount: PropTypes.number.isRequired,
  increaseAmountRate: PropTypes.number.isRequired,

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
  itemsAmount: movieListSelectors.getDisplayedFilmsAmount(store),
  maxItemsAmount: genreFilterSelectors.getCurrentFilterFilmsAmount(store),
  filmsCards: filmsSelectors.getCurrentCardsInfo(store),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentFilter: (genre) => dispatch(genreFilterActions.setCurrentFilter(genre)),
  setDisplayedItems: (amount, maxAmount) => dispatch(movieListActions.setDisplayedFilmsAmount(amount, maxAmount)),
  showMoreItems: (currentAmount, increaseRate, maxAmount) => dispatch(movieListActions.showMoreFilms(currentAmount, increaseRate, maxAmount))
});


export {Catalog};
export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
