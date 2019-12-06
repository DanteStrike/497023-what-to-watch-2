import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";

import AddReviewForm from "../add-review-form/add-review-form.jsx";
import MovieBackground from "../movie-background/movie-background.jsx";
import Breadcrumbs from "../breadcrumbs/breadcrumbs.jsx";
import MoviePoster from "../movie-poster/movie-poster.jsx";
import PageHeader from "../page-header/page-header.jsx";
import UserBlock from "../user-block/user-block.jsx";

import {filmsSelectors} from "../../reducers/films";


class AddReviewPage extends React.PureComponent {
  render() {
    const {curFilmID, film} = this.props;

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
        <AddReviewForm/>
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
  }).isRequired
};

const mapStateToProps = (store, props) => ({
  film: filmsSelectors.getFilmByCurID(store, props)
});

export {AddReviewPage};
export default connect(mapStateToProps)(AddReviewPage);
