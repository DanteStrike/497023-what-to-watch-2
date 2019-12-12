import React from "react";
import PropTypes from "prop-types";

import {Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "recompose";

import MainPage from "../main-page/main-page.jsx";
import MyListPage from "../my-list-page/my-list-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import Player from "../player/player.jsx";
import MoviePageOverview from "../movie-page-overview/movie-page-overview.jsx";
import MoviePageDetails from "../movie-page-details/movie-page-details.jsx";
import MoviePageReviews from "../movie-page-reviews/movie-page-reviews.jsx";
import SignInPage from "../sign-in-page/sign-in-page.jsx";
import AddReviewPage from "../add-review-page/add-review-page.jsx";
import PageNotFound from "../page-not-found/page-not-found.jsx";
import PrivateRoute from "../private-route/private-route.jsx";
import SetupAppPage from "../setup-app-page/setup-app-page.jsx";

import withPlayControls from "../../hocs/with-play-controls/with-play-controls.jsx";
import withFullScreen from "../../hocs/with-full-screen/with-full-screen.jsx";
import withProgressBar from "../../hocs/with-progress-bar/with-progress-bar.jsx";
import withTabs from "../../hocs/with-tabs/with-tabs.jsx";
import withVolume from "../../hocs/with-volume/with-volume.jsx";

import {appOperations, appSelectors} from "../../reducers/app/app";
import configs from "../../configs";


const PlayerWrapped = compose(withProgressBar, withFullScreen, withPlayControls, withVolume(configs.videoPlayerConfig.volume))(Player);
const MoviePageWrapped = withTabs([
  {name: `Overview`, requiredPropName: `filmOverview`, Output: MoviePageOverview},
  {name: `Details`, requiredPropName: `filmDetails`, Output: MoviePageDetails},
  {name: `Reviews`, requiredPropName: `filmReviews`, Output: MoviePageReviews}
])(MoviePage);

const App = (props) => {
  const {isAppReady, videoPlayerID} = props;

  if (!isAppReady) {
    return <SetupAppPage/>;
  }

  if (~videoPlayerID) {
    return (<PlayerWrapped/>);
  }

  return (
    <Switch>
      <Route exact path="/" component={MainPage}/>
      <Route exact path="/login" component={SignInPage}/>
      <PrivateRoute exact path="/mylist" component={MyListPage}/>
      <Route exact path="/films/:id" component={({match: {params: {id}}}) => {
        return (<MoviePageWrapped curFilmID={Number(id)}/>);
      }}/>
      <PrivateRoute exact path="/films/:id/review" component={({match: {params: {id}}, history}) => {
        return (<AddReviewPage curFilmID={Number(id)} history={history}/>);
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

const mapDispatchToProps = (dispatch) => ({
  onRepeatSetupClick: () => dispatch(appOperations.setupApp())
});
export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
