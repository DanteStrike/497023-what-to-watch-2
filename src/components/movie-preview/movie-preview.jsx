import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import PageHeader from "../page-header/page-header.jsx";
import UserBlock from "../user-block/user-block.jsx";
import MovieBackground from "../movie-background/movie-background.jsx";
import MoviePoster from "../movie-poster/movie-poster.jsx";
import MovieControlPanel from "../movie-control-panel/movie-control-panel.jsx";

import withToggleState from "../../hocs/with-toggle-state/with-toggle-state.jsx";

import {filmsSelectors} from "../../reducers/films";


const MovieControlPanelWrapped = withToggleState(`isSubmitting`, false, `toggleFormLock`)(MovieControlPanel);

const MoviePreview = (props) => {
  const {promo} = props;

  return (
    <section className="movie-card">
      <MovieBackground name={promo.name} image={promo.background.image} backgroundColor={promo.background.color}/>
      <h1 className="visually-hidden">WTW</h1>
      <PageHeader mixinClass={`movie-card__head`} rightPart={<UserBlock/>}/>
      <div className="movie-card__wrap">
        <div className="movie-card__info">
          <MoviePoster isBig={false} isSmall={false} name={promo.name} image={promo.posterImage}/>
          <MovieControlPanelWrapped curFilmID={promo.id}/>
        </div>
      </div>
    </section>
  );
};

MoviePreview.propTypes = {
  promo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    background: PropTypes.exact({
      color: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  }),
};


const mapStateToProps = (store) => ({
  promo: filmsSelectors.getPromoFilm(store)
});

export {MoviePreview};
export default connect(mapStateToProps)(MoviePreview);


