import React from "react";

import PageHeader from "../page-header/page-header.jsx";
import PageTitle from "../page-title/page-title.jsx";
import UserBlock from "../user-block/user-block.jsx";
import PageFooter from "../page-footer/page-footer.jsx";


const MyListPage = () => {
  return (
    <div className="user-page">
      <PageHeader
        mixinClass={`user-page__head`}
        rightPart={[
          <PageTitle key="middle" title={`My list`}/>,
          <UserBlock key="right"/>
        ]}
      />

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__movies-list">
          <article className="small-movie-card catalog__movies-card">
            <div className="small-movie-card__image">
              <img src="img/fantastic-beasts-the-crimes-of-grindelwald.jpg"
                alt="Fantastic Beasts: The Crimes of Grindelwald" width="280" height="175"/>
            </div>
            <h3 className="small-movie-card__title">
              <a className="small-movie-card__link" href="movie-page.html">Fantastic Beasts: The Crimes of
                Grindelwald</a>
            </h3>
          </article>
        </div>
      </section>

      <PageFooter/>
    </div>
  );
};

export default MyListPage;
