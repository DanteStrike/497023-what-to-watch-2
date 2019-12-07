import React, {Fragment} from "react";
import PropTypes from "prop-types";

class AddReviewForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this._stars = new Array(5).fill(``);
    this._handleInputChange = this._handleInputChange.bind(this);
  }

  componentDidMount() {
    const {validateComment} = this.props;
    validateComment();
  }

  _handleInputChange(evt) {
    const {setScore, setComment, validateComment} = this.props;

    const target = evt.target;
    const newValue = target.value;

    if (target.name === `rating`) {
      setScore(Number(newValue));
      return;
    }

    if (target.name === `review-text`) {
      setComment(newValue, validateComment);
    }
  }


  render() {
    const {score, commentValidation} = this.props;

    return (
      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              {this._stars.map((_, index) => (
                <Fragment key={`${index}_star`}>
                  <input className="rating__input" id={`star-${index}`} type="radio" name="rating" value={`${index + 1}`} onChange={this._handleInputChange}/>
                  <label className="rating__label" htmlFor={`star-${index}`}>Rating ${index}</label>
                </Fragment>
              ))}
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" onChange={this._handleInputChange}></textarea>
            <div className="add-review__submit">
              {(score === -1 || !commentValidation.isValid) ? null : <button className="add-review__btn" type="submit">Post</button>}
            </div>

          </div>
        </form>
      </div>
    );
  }
}

AddReviewForm.propTypes = {
  score: PropTypes.number.isRequired,
  setScore: PropTypes.func.isRequired,
  comment: PropTypes.string.isRequired,
  setComment: PropTypes.func.isRequired,
  validateComment: PropTypes.func.isRequired,
  commentValidation: PropTypes.exact({
    isValid: PropTypes.bool.isRequired,
    msg: PropTypes.string.isRequired
  }).isRequired,
  resetValidation: PropTypes.func.isRequired
};

export default AddReviewForm;
