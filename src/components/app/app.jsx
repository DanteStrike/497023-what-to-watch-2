import React from "react";
import {Switch, Route} from "react-router-dom";
import MainPage from "../main-page/main-page.jsx";
import SignInPage from "../sign-in-page/sign-in-page.jsx";
import MyListPage from "../my-list-page/my-list-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import PageNotFound from "../page-not-found/page-not-found.jsx";

import withTabs from "../../hocs/with-tabs/with-tabs.jsx";

const MoviePageTabs = [
  {
    name: `Overview`,
    output: <div className="tab1__Output"></div>
  }, {
    name: `Details`,
    output: <div className="tab2__Output"></div>
  }, {
    name: `Reviews`,
    output: <div className="tab3__Output"></div>
  }
];

const MoviePageWrapped = withTabs(MoviePageTabs)(MoviePage);

const App = () => {
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

export default App;
