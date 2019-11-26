import React, {Fragment} from "react";
import PropTypes from "prop-types";
import Review from "../review/review.jsx";


const MoviePageReviews = (props) => {
  const {filmReviews} = props;

  const reviews = filmReviews.reduce((columns, review, index) => {
    const ReviewComponent = <Review
      key={`${review.id}_review`}
      author={review.user.name}
      rating={review.rating}
      comment={review.comment}
      date={review.date}
    />;

    if (index % 2 === 0) {
      columns.firstColumn.push(ReviewComponent);
    } else {
      columns.secondColumn.push(ReviewComponent);
    }

    return columns;
  }, {
    firstColumn: [],
    secondColumn: []
  });

  return (
    <div className="movie-card__reviews movie-card__row">
      {(filmReviews.length === 0) ?
        <div className="review">
          There is no reviews still
        </div>
        :
        <Fragment>
          <div className="movie-card__reviews-col">
            {reviews.firstColumn}
          </div>
          <div className="movie-card__reviews-col">
            {reviews.secondColumn}
          </div>
        </Fragment>
      }
    </div>
  );
};

MoviePageReviews.propTypes = {
  filmReviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired
    }),
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.number.isRequired
  })).isRequired
};


export default MoviePageReviews;
