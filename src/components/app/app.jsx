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


const MoviePageTabs = [
  {
    name: `Overview`,
    output: MoviePageOverview
  }, {
    name: `Details`,
    output: MoviePageDetails
  }, {
    name: `Reviews`,
    output: MoviePageReviews
  }
];

const MoviePageWrapped = withTabs(MoviePageTabs)(MoviePage);

const App = (props) => {
  const {isAppReady} = props;

  if (!isAppReady) {
    return null;
  }

  return (
    <Switch>
      <Route exact path="/" component={MainPage}/>
      <Route exact path="/login" component={SignInPage}/>
      <Route exact path="/mylist" component={MyListPage}/>
      <Route exact path="/films/:id" component={MoviePageWrapped}/>
      <Route component={PageNotFound}/>
    </Switch>
  );
};

App.propTypes = {
  isAppReady: PropTypes.bool.isRequired
};

const mapStateToProps = (store) => ({
  isAppReady: appSelectors.getIsReady(store)
});

export default connect(mapStateToProps)(App);
