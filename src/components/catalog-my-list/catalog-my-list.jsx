import React from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import MoviesList from "../movies-list/movies-list.jsx";

import {filmsSelectors} from "../../reducers/films/films.js";


const CatalogMyList = (props) => {
  const {filmsCards} = props;

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <MoviesList filmsCards={filmsCards}/>
    </section>
  );
};

CatalogMyList.propTypes = {
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
  filmsCards: filmsSelectors.getMyListCardsInfo(store),
});

export {CatalogMyList};
export default connect(mapStateToProps)(CatalogMyList);
