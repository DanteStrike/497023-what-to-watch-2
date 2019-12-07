import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import PageHeader from "../page-header/page-header.jsx";
import UserBlock from "../user-block/user-block.jsx";
import PageFooter from "../page-footer/page-footer.jsx";
import MovieBackground from "../movie-background/movie-background.jsx";
import MoviePoster from "../movie-poster/movie-poster.jsx";
import CatalogLikeThis from "../catalog-like-this/catalog-like-this.jsx";
import MovieControlPanel from "../movie-control-panel/movie-control-panel.jsx";

import withToggleState from "../../hocs/with-toggle-state/with-toggle-state.jsx";

import {filmsSelectors} from "../../reducers/films/films";
import {commentsOperations, commentsSelectors} from "../../reducers/comments/comments";


const MovieControlPanelWrapped = withToggleState(`isSubmitting`, false, `toggleFormLock`)(MovieControlPanel);

class MoviePage extends React.PureComponent {
  componentDidMount() {
    const {curFilmID, loadCurFilmComments} = this.props;
    loadCurFilmComments(curFilmID);
  }

  componentDidUpdate(prevProps) {
    const {curFilmID, resetTabs, loadCurFilmComments} = this.props;

    if (prevProps.curFilmID !== curFilmID) {
      resetTabs();
      loadCurFilmComments(curFilmID);
    }
  }

  render() {
    const {renderTabs, film, comments} = this.props;

    return (
      <Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <MovieBackground name={film.name} image={film.background.image} backgroundColor={film.background.color}/>
            <h1 className="visually-hidden">WTW</h1>
            <PageHeader mixinClass={`movie-card__head`} rightPart={<UserBlock/>}/>
            <div className="movie-card__wrap">
              <MovieControlPanelWrapped curFilmID={film.id}/>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <MoviePoster isBig={true} isSmall={false} name={film.name} image={film.posterImage}/>
              {renderTabs([film, film, comments])}
            </div>
          </div>
        </section>

        <div className="page-content">
          <CatalogLikeThis curFilmID={film.id}/>
          <PageFooter/>
        </div>
      </Fragment>
    );
  }
}

MoviePage.propTypes = {
  curFilmID: PropTypes.number.isRequired,
  renderTabs: PropTypes.func.isRequired,
  resetTabs: PropTypes.func.isRequired,
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    background: PropTypes.exact({
      color: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
    released: PropTypes.number.isRequired
  }),
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired
  })).isRequired,
  loadCurFilmComments: PropTypes.func.isRequired
};

const mapStateToProps = (store, props) => ({
  film: filmsSelectors.getFilmByCurrentID(store, props),
  comments: commentsSelectors.getCurFilmComments(store)
});

const mapDispatchToProps = (dispatch) => ({
  loadCurFilmComments: (curFilmID) => dispatch(commentsOperations.loadCurFilmComments(curFilmID))
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);
