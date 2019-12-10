import React from "react";
import PropTypes from "prop-types";

import {connect} from "react-redux";

import MoviesList from "../movies-list/movies-list.jsx";

import {filmsSelectors} from "../../reducers/films/films.js";
import {userOperations, userSelectors} from "../../reducers/user/user";


class CatalogMyList extends React.PureComponent {
  componentDidMount() {
    const {myListState, loadMyList} = this.props;

    if (!myListState.isMyListLoaded) {
      loadMyList();
    }
  }

  render() {
    const {filmsCards, myListState} = this.props;

    return (
      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <MoviesList filmsCards={filmsCards}/>
        {!myListState.isMyListLoaded && !myListState.isLoading &&
          <p>Something goes wrong. We cant download all of you favorite list. Please try again later.</p>}
      </section>
    );
  }
}

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
  myListState: PropTypes.exact({
    isMyListLoaded: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
  })
};

const mapStateToProps = (store) => ({
  filmsCards: filmsSelectors.getMyListCardsInfo(store),
  myListState: userSelectors.getMyListStatus(store)
});

const mapDispatchToProps = (dispatch) => ({
  loadMyList: () => dispatch(userOperations.getMyListFilms())
});

export {CatalogMyList};
export default connect(mapStateToProps, mapDispatchToProps)(CatalogMyList);
