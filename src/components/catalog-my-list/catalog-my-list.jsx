import React, {useEffect} from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import MoviesList from "../movies-list/movies-list.jsx";

import {filmsSelectors} from "../../reducers/films/films.js";
import {userOperations, userSelectors} from "../../reducers/user/user";


const CatalogMyList = (props) => {
  const {filmsCards, isMyListLoaded, loadMyList} = props;

  useEffect(() => {
    if (!isMyListLoaded) {
      loadMyList();
    }
  }, []);

  return (
    <section className="catalog">
      <h2 className="catalog__title visually-hidden">Catalog</h2>
      <MoviesList filmsCards={filmsCards}/>
      {!isMyListLoaded && <p>Something goes wrong. We cant download all of you favorite list. Please try again later.</p>}
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
  })),
  loadMyList: PropTypes.func.isRequired,
  isMyListLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = (store) => ({
  filmsCards: filmsSelectors.getMyListCardsInfo(store),
  isMyListLoaded: userSelectors.getIsMyListLoaded(store)
});

const mapDispatchToProps = (dispatch) => ({
  loadMyList: () => dispatch(userOperations.getMyListFilms())
});

export {CatalogMyList};
export default connect(mapStateToProps, mapDispatchToProps)(CatalogMyList);
