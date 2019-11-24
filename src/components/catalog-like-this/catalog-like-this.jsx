import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import MoviesList from "../movies-list/movies-list.jsx";
import {genreFilterActions} from "../../reducers/genres/index.js";
import {filmsSelectors} from "../../reducers/films/index.js";
import {catalogActions} from "../../reducers/catalog/index.js";
import {genreFilterSelectors} from "../../reducers/genres/index";
import {catalogLikeThisConfig} from "../../configs/catalog-like-this-config";


class CatalogLikeThis extends React.PureComponent {
  componentDidMount() {
    const {curFilmGenre, maxItemsAmount, initCatalogLikeThis} = this.props;
    initCatalogLikeThis(curFilmGenre, catalogLikeThisConfig.defaultItemsAmount, maxItemsAmount - 1);
  }

  componentDidUpdate() {
    const {curFilmGenre, maxItemsAmount, initCatalogLikeThis} = this.props;
    initCatalogLikeThis(curFilmGenre, catalogLikeThisConfig.defaultItemsAmount, maxItemsAmount - 1);
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
  curFilmID: PropTypes.number.isRequired,
  curFilmGenre: PropTypes.string.isRequired,
  maxItemsAmount: PropTypes.number.isRequired,
  initCatalogLikeThis: PropTypes.func.isRequired,

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
  curFilmGenre: filmsSelectors.getCurFilmGenre(store, props),
  filmsCards: filmsSelectors.getLikeThisCardsInfo(store, props),
  maxItemsAmount: genreFilterSelectors.getCurrentFilterFilmsAmount(store),
});

const mapDispatchToProps = (dispatch) => ({
  initCatalogLikeThis: (genre, amount, maxAmount) => {
    dispatch(genreFilterActions.setCurrentFilter(genre));
    dispatch(catalogActions.setDisplayedFilmsAmount(amount, maxAmount));
  }
});


export {CatalogLikeThis};
export default connect(mapStateToProps, mapDispatchToProps)(CatalogLikeThis);
