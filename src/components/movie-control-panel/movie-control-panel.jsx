import React, {Fragment} from "react";
import PropTypes from "prop-types";

import {Link} from "react-router-dom";

import {appActions} from "../../reducers/app/app";
import {connect} from "react-redux";
import {filmsSelectors} from "../../reducers/films/films";
import {userActions, userOperations, userSelectors} from "../../reducers/user/user";
import Enum from "../../enum";
import {updateObject} from "../../utils/object/object";


class MovieControlPanel extends React.PureComponent {
  constructor(props) {
    super(props);

    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    this._handleFavoriteToggleClick = this._handleFavoriteToggleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    const {favoriteRequestStatus, isSubmitting, toggleFormLock} = this.props;

    if ((prevProps.favoriteRequestStatus.isSuccess !== favoriteRequestStatus.isSuccess && favoriteRequestStatus.isSuccess
        || prevProps.favoriteRequestStatus.error.isError !== favoriteRequestStatus.error.isError && favoriteRequestStatus.error.isError)
        && isSubmitting) {
      toggleFormLock();
    }
  }

  _handlePlayButtonClick() {
    const {curFilmID, openVideoPlayer} = this.props;
    openVideoPlayer(curFilmID);
  }

  _handleFavoriteToggleClick() {
    const {curFilmID, isFavorite, toggleFavorite, toggleFormLock, resetFavoriteError} = this.props;
    toggleFormLock();
    resetFavoriteError();
    toggleFavorite(curFilmID, Number(!isFavorite));
  }

  _getButtonPlayStyle() {
    const {isSubmitting, favoriteRequestStatus: {error}} = this.props;

    let style = Enum.Styles.NO_STYLE;

    if (isSubmitting) {
      style = updateObject(style, Enum.Styles.LOADING_CURSOR);
    }

    if (error.isError) {
      style = updateObject(style, Enum.Styles.ERROR_OUTLINE);
    }

    return style;
  }


  render() {
    const {curFilmID, isAuth, name, genre, released, isFavorite, isSubmitting} = this.props;

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
              <use xlinkHref={`#${Enum.Icons.PLAY_S}`}></use>
            </svg>
            <span>Play</span>
          </button>
          {isAuth &&
            <Fragment>
              <button className="btn btn--list movie-card__button" type="button" onClick={this._handleFavoriteToggleClick}
                disabled={isSubmitting} style={this._getButtonPlayStyle()}>
                <svg viewBox="0 0 19 20" width="19" height="20">
                  <use xlinkHref={`#${isFavorite ? Enum.Icons.IN_LIST : Enum.Icons.ADD}`}></use>
                </svg>
                <span>My list</span>
              </button>
              <Link to={`/films/${curFilmID}/add-review`} className="btn movie-card__button">Add review</Link>
            </Fragment>
          }
        </div>
      </div>
    );
  }
}

MovieControlPanel.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  curFilmID: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  released: PropTypes.number.isRequired,
  openVideoPlayer: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  toggleFormLock: PropTypes.func.isRequired,
  favoriteRequestStatus: PropTypes.exact({
    isSuccess: PropTypes.bool.isRequired,
    error: PropTypes.exact({
      isError: PropTypes.bool.isRequired
    }).isRequired
  }).isRequired,
  resetFavoriteError: PropTypes.func.isRequired
};

const mapStateToProps = (store, props) => ({
  isAuth: userSelectors.getIsAuth(store),
  name: filmsSelectors.getCurFilmName(store, props),
  genre: filmsSelectors.getCurFilmGenre(store, props),
  released: filmsSelectors.getCurFilmReleased(store, props),
  isFavorite: filmsSelectors.getIsFavorite(store, props),
  favoriteRequestStatus: userSelectors.getFavoriteError(store)
});

const mapDispatchToProps = (dispatch) => ({
  openVideoPlayer: (filmID) => dispatch(appActions.openVideoPlayer(filmID)),
  toggleFavorite: (curFilmID, newState) => dispatch(userOperations.toggleFavorite(curFilmID, newState)),
  resetFavoriteError: () => dispatch(userActions.resetFavoriteError())
});

export {MovieControlPanel};
export default connect(mapStateToProps, mapDispatchToProps)(MovieControlPanel);
