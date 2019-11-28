import React from "react";
import PropTypes from "prop-types";

import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";

import MainPage from "../main-page/main-page.jsx";
import SignInPage from "../sign-in-page/sign-in-page.jsx";
import MyListPage from "../my-list-page/my-list-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import MoviePageOverview from "../movie-page-overview/movie-page-overview.jsx";
import MoviePageDetails from "../movie-page-details/movie-page-details.jsx";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews.jsx";
import PageNotFound from "../page-not-found/page-not-found.jsx";

import withTabs from "../../hocs/with-tabs/with-tabs.jsx";
import {appSelectors} from "../../reducers/app";
import Player from "../player/player.jsx";
import withMovie from "../../hocs/with-movie/with-movie.jsx";
import withPlayControls from "../../hocs/with-play-controls/with-play-controls.jsx";
import withFullScreen from "../../hocs/with-full-screen/with-full-screen.jsx";
import withProgressBar from "../../hocs/with-progress-bar/with-progress-bar.jsx";

const PlayerWrapped = withProgressBar(withFullScreen(withPlayControls(withMovie(Player))));

const MoviePageTabs = [
  {
    name: `Overview`,
    requiredPropName: `filmOverview`,
    output: MoviePageOverview
  }, {
    name: `Details`,
    requiredPropName: `filmDetails`,
    output: MoviePageDetails
  }, {
    name: `Reviews`,
    requiredPropName: `filmReviews`,
    output: MoviePageReviews
  }
];
const MoviePageWrapped = withTabs(MoviePageTabs)(MoviePage);

const App = (props) => {
  const {isAppReady, videoPlayerID} = props;

  if (!isAppReady) {
    return null;
  }

  if (videoPlayerID !== -1) {
    return (<PlayerWrapped poster={`img/player-poster.jpg`}/>);
  }

  return (
    <Switch>
      <Route exact path="/" component={MainPage}/>
      <Route exact path="/login" component={SignInPage}/>
      <Route exact path="/mylist" component={MyListPage}/>
      <Route exact path="/films/:id" component={({match: {params: {id}}}) => {
        return (<MoviePageWrapped curFilmID={Number(id)}/>);
      }}/>
      <Route component={PageNotFound}/>
    </Switch>
  );
};

App.propTypes = {
  isAppReady: PropTypes.bool.isRequired,
  videoPlayerID: PropTypes.number.isRequired
};

const mapStateToProps = (store) => ({
  isAppReady: appSelectors.getIsReady(store),
  videoPlayerID: appSelectors.getVideoPlayerFilmID(store)
});

export {App};
export default connect(mapStateToProps)(App);
