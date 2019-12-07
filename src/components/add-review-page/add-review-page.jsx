import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "redux";

import AddReviewForm from "../add-review-form/add-review-form.jsx";
import MovieBackground from "../movie-background/movie-background.jsx";
import Breadcrumbs from "../breadcrumbs/breadcrumbs.jsx";
import MoviePoster from "../movie-poster/movie-poster.jsx";
import PageHeader from "../page-header/page-header.jsx";
import UserBlock from "../user-block/user-block.jsx";

import withInput from "../../hocs/with-input/with-input.jsx";
import withValidation from "../../hocs/with-validation/with-validation.jsx";
import withToggleState from "../../hocs/with-toggle-state/with-toggle-state.jsx";

import {checkComment} from "../../utils/validation/validation.js";
import {filmsSelectors} from "../../reducers/films";
import {commentsActions, commentsOperations, commentsSelectors} from "../../reducers/comments";


const AddReviewFormWrapped = compose(
    withToggleState(`isSubmitting`, false, `toggleFormLock`),
    withInput(`score`, `setScore`, -1),
    withInput(`comment`, `setComment`, ``),
    withValidation(`comment`, `validateComment`, `commentValidation`, `resetValidation`, checkComment(50, 400))
)(AddReviewForm);

class AddReviewPage extends React.PureComponent {
  constructor(props) {
    super(props);

    this._postComment = this._postComment.bind(this);
  }

  componentDidMount() {
    const {resetPostCommentError} = this.props;
    resetPostCommentError();
  }

  componentDidUpdate(prevProps) {
    const {isSuccess, history, curFilmID} = this.props;

    if (prevProps.isSuccess !== isSuccess && isSuccess) {
      history.push(`/films/${curFilmID}`);
    }
  }

  _postComment(score, comment) {
    const {curFilmID, postComment} = this.props;
    postComment(curFilmID, score, comment);
  }


  render() {
    const {curFilmID, film, serverError} = this.props;

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <MovieBackground name={film.name} image={film.background.image} backgroundColor={film.background.color}/>
          <h1 className="visually-hidden">WTW</h1>
          <PageHeader
            rightPart={[
              <Breadcrumbs key="breadcrumbs" curFilmID={curFilmID} name={film.name}/>,
              <UserBlock key="user-block"/>
            ]}
          />
          <MoviePoster isBig={false} isSmall={true} name={film.name} image={film.posterImage}/>
        </div>
        <AddReviewFormWrapped serverError={serverError} postComment={this._postComment}/>
      </section>
    );
  }
}

AddReviewPage.propTypes = {
  curFilmID: PropTypes.number.isRequired,
  film: PropTypes.shape({
    name: PropTypes.string.isRequired,
    posterImage: PropTypes.string.isRequired,
    background: PropTypes.exact({
      color: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired
  }).isRequired,
  serverError: PropTypes.exact({
    isError: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  postComment: PropTypes.func.isRequired,
  resetPostCommentError: PropTypes.func.isRequired,
  isSuccess: PropTypes.bool.isRequired
};

const mapStateToProps = (store, props) => ({
  film: filmsSelectors.getFilmByCurID(store, props),
  serverError: commentsSelectors.getPostCommentError(store),
  isSuccess: commentsSelectors.getPostCommentStatus(store)
});

const mapDispatchToProps = (dispatch) => ({
  postComment: (curFilmID, score, comment) => dispatch(commentsOperations.postUserComment(curFilmID, score, comment)),
  resetPostCommentError: () => dispatch(commentsActions.resetPostCommentError())
});

export {AddReviewPage};
export default connect(mapStateToProps, mapDispatchToProps)(AddReviewPage);
