import React from "react";
import PropTypes from "prop-types";

import {formatDateForReview} from "../../utils/time/time";


const Review = (props) => {
  const {author, rating, comment, date} = props;

  const formattedDate = formatDateForReview(date);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{author}</cite>
          <time className="review__date" dateTime={`${formattedDate.dateTime}`}>{formattedDate.view}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

Review.propTypes = {
  author: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired
};

export default Review;
