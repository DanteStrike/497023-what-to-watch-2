import React from "react";
import ReactDOM from "react-dom";
import App from "./components/app/app.jsx";

const init = () => {
  const moviesList = [
    {
      title: `Fantastic Beasts: The Crimes of Grindelwald`,
      image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`
    },
    {
      title: `Johnny English`,
      image: `img/johnny-english.jpg`
    },
    {
      title: `Shutter Island`,
      image: `img/shutter-island.jpg`
    }
  ];

  ReactDOM.render(
      <App
        moviesList = {moviesList}
      />,
      document.querySelector(`#root`)
  );
};

init();

