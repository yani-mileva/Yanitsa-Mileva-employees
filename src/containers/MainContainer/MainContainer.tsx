import React from "react";
import { CustomDataGrid, Upload } from "@components";
import "./MainContainer.css";

const MainContainer = () => {

  return (
    <div className="main-content">
      <Upload />
      <CustomDataGrid />
    </div>
  );
};

export default MainContainer;
