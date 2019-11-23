import React, {Fragment} from "react";
import PropTypes from "prop-types";
import PageHeader from "../page-header/page-header.jsx";
import UserBlock from "../user-block/user-block.jsx";
import PageFooter from "../page-footer/page-footer.jsx";
import MovieBackground from "../movie-background/movie-background.jsx";
import MoviePoster from "../movie-poster/movie-poster.jsx";
import MovieControlPanel from "../movie-control-panel/movie-control-panel.jsx";
import {filmsSelectors} from "../../reducers/films";
import {connect} from "react-redux";
import Catalog from "../catalog/catalog.jsx";
import CatalogLikeThis from "../catalog-like-this/catalog-like-this.jsx";

const MoviePage = (props) => {
  const {renderTabs, film} = props;
  return (
    <Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <MovieBackground
            name={film.name}
            {...film.background}
          />
          <h1 className="visually-hidden">WTW</h1>
          <PageHeader mixinClass={`movie-card__head`} rightPart={<UserBlock/>}/>
          <div className="movie-card__wrap">
            <MovieControlPanel
              id={film.id}
              name={film.name}
              genre={film.genre}
              released={film.released}
            />
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <MoviePoster
              isBig={true}
              name={film.name}
              image={film.posterImage}
            />
            {renderTabs && renderTabs(film)}
          </div>
        </div>
      </section>

      <div className="page-content">
        <CatalogLikeThis
          id={film.id}
          genre={film.genre}
        />
        <PageFooter/>
      </div>
    </Fragment>
  );
};

MoviePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  renderTabs: PropTypes.func,
  film: PropTypes.object,
  setCurrentPageFilmID: PropTypes.func
};

const mapStateToProps = (store, props) => ({
  film: filmsSelectors.getFilmByCurrentID(store, Number(props.match.params.id))
});

export {MoviePage};
export default connect(mapStateToProps)(MoviePage);
