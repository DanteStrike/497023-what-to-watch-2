import React from "react";
import {Switch, Route} from "react-router-dom";
import MainPage from "../main-page/main-page.jsx";
import SignInPage from "../sign-in-page/sign-in-page.jsx";
import MyListPage from "../my-list-page/my-list-page.jsx";
import MoviePage from "../movie-page/movie-page.jsx";
import PageNotFound from "../page-not-found/page-not-found.jsx";

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={MainPage}/>
      <Route exact path="/login" component={SignInPage}/>
      <Route exact path="/mylist" component={MyListPage}/>
      <Route exact path="/films/:id" component={MoviePage}/>
      <Route component={PageNotFound}/>
    </Switch>
  );
};

export default App;
