import React from "react";
import PropTypes from "prop-types";

import {Link} from "react-router-dom";

import {appActions} from "../../reducers/app";
import {connect} from "react-redux";
import {filmsSelectors} from "../../reducers/films";
import {userSelectors} from "../../reducers/user";


class MovieControlPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    this._handleFavoriteToggleClick = this._handleFavoriteToggleClick.bind(this);
  }

  _handlePlayButtonClick() {
    const {curFilmID, openVideoPlayer} = this.props;
    openVideoPlayer(curFilmID);
  }

  _handleFavoriteToggleClick() {}


  render() {
    const {curFilmID, isAuth, name, genre, released} = this.props;

    return (
      <div className="movie-card__desc">
        <h2 className="movie-card__title">{name}</h2>
        <p className="movie-card__meta">
          <span className="movie-card__genre">{genre}</span>
          <span className="movie-card__year">{released}</span>
        </p>

        <div className="movie-card__buttons">
          <button className="btn btn--play movie-card__button" type="button" onClick={this._handlePlayButtonClick}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref="#play-s"></use>
            </svg>
            <span>Play</span>
          </button>
          <button className="btn btn--list movie-card__button" type="button" onClick={this._handleFavoriteToggleClick}>
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref="#add"></use>
            </svg>
            <span>My list</span>
          </button>
          {isAuth && <Link to={`/films/${curFilmID}/add-review`} className="btn movie-card__button">Add review</Link>}
        </div>
      </div>
    );
  }
}

MovieControlPanel.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  curFilmID: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  released: PropTypes.number.isRequired,
  openVideoPlayer: PropTypes.func.isRequired
};

const mapStateToProps = (store, props) => ({
  isAuth: userSelectors.getIsAuth(store),
  name: filmsSelectors.getCurFilmName(store, props),
  genre: filmsSelectors.getCurFilmGenre(store, props),
  released: filmsSelectors.getCurFilmReleased(store, props),
  // isFavorite: filmsSelectors.getIsCurFilmFavorite(store, props)
});

const mapDispatchToProps = (dispatch) => ({
  openVideoPlayer: (filmID) => dispatch(appActions.openVideoPlayer(filmID))
});

export {MovieControlPanel};
export default connect(mapStateToProps, mapDispatchToProps)(MovieControlPanel);
