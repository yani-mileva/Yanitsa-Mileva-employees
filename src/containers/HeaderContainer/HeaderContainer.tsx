import React from "react";
import PeopleIcon from "@material-ui/icons/People";
import { Header } from "@components";
import "./HeaderContainer.css";

const HeaderContainer = () => {
  return (
    <div className="header-container">
      <PeopleIcon />
      <Header />
    </div>
  );
};

export default HeaderContainer;
