import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MoviesList from "../movies-list/movies-list.jsx";
import {genreFilterActions} from "../../reducers/genre-filter/index.js";
import {filmsSelectors} from "../../reducers/films/index.js";
import {movieListActions} from "../../reducers/movie-list/index.js";
import {genreFilterSelectors} from "../../reducers/genre-filter/index";


class CatalogLikeThis extends React.PureComponent {
  componentDidMount() {
    const {genre, maxItemsAmount, setDisplayedItems, setCurrentFilter} = this.props;
    setCurrentFilter(genre);
    setDisplayedItems(4, maxItemsAmount - 1);
  }

  componentDidUpdate() {
    const {maxItemsAmount, setDisplayedItems} = this.props;
    setDisplayedItems(4, maxItemsAmount - 1);
  }

  render() {
    const {filmsCards} = this.props;

    return (
      <section className={`catalog catalog--like-this`}>
        <h2 className="catalog__title">More like this</h2>
        <MoviesList filmsCards={filmsCards}/>
      </section>
    );
  }
}

CatalogLikeThis.propTypes = {
  id: PropTypes.number.isRequired,
  genre: PropTypes.string.isRequired,
  maxItemsAmount: PropTypes.number.isRequired,
  setDisplayedItems: PropTypes.func.isRequired,
  setCurrentFilter: PropTypes.func.isRequired,

  filmsCards: PropTypes.arrayOf(PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    preview: PropTypes.exact({
      image: PropTypes.string.isRequired,
      videoSrc: PropTypes.string.isRequired
    }).isRequired
  }))
};

const mapStateToProps = (store, props) => ({
  filmsCards: filmsSelectors.getLikeThisCardsInfo(store, props.id),
  maxItemsAmount: genreFilterSelectors.getCurrentFilterFilmsAmount(store),
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentFilter: (genre) => dispatch(genreFilterActions.setCurrentFilter(genre)),
  setDisplayedItems: (amount, maxAmount) => dispatch(movieListActions.setDisplayedFilmsAmount(amount, maxAmount)),
});


export {CatalogLikeThis};
export default connect(mapStateToProps, mapDispatchToProps)(CatalogLikeThis);
