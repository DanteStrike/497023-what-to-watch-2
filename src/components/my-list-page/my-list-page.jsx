import React from "react";

import PageHeader from "../page-header/page-header.jsx";
import PageTitle from "../page-title/page-title.jsx";
import UserBlock from "../user-block/user-block.jsx";
import PageFooter from "../page-footer/page-footer.jsx";
import CatalogMyList from "../catalog-my-list/catalog-my-list.jsx";


const MyListPage = () => {
  return (
    <div className="user-page">
      <PageHeader
        mixinClass="user-page__head"
        rightPart={[
          <PageTitle key="middle" title="My list"/>,
          <UserBlock key="right"/>
        ]}
      />
      <CatalogMyList/>
      <PageFooter/>
    </div>
  );
};

export default MyListPage;
