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
import CatalogLikeThis from "../catalog-like-this/catalog-like-this.jsx";

class MoviePage extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const {curFilmID, resetTabs} = this.props;

    if (prevProps.curFilmID !== curFilmID) {
      resetTabs();
    }
  }

  render() {
    const {renderTabs, film} = this.props;

    return (
      <Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <MovieBackground
              name={film.name}
              image={film.background.image}
              backgroundColor={film.background.color}
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
            curFilmID={film.id}
          />
          <PageFooter/>
        </div>
      </Fragment>
    );
  }
}

MoviePage.propTypes = {
  curFilmID: PropTypes.number.isRequired,
  renderTabs: PropTypes.func,
  resetTabs: PropTypes.func,
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    background: PropTypes.exact({
      color: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
    released: PropTypes.number.isRequired
  }),
  setCurrentPageFilmID: PropTypes.func
};

const mapStateToProps = (store, props) => ({
  film: filmsSelectors.getFilmByCurrentID(store, props)
});

export {MoviePage};
export default connect(mapStateToProps)(MoviePage);
