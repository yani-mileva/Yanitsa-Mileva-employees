import React from "react";
import { useSelector } from "react-redux";
import { HeaderContainer, MainContainer } from "@containers";
import { State } from "@interfaces";
import { CustomLoading } from "@components";
import "./App.css";

function App() {
  const isLoading: boolean = useSelector((state: State) => state.isLoading);

  return (
    <div className="App">
      <HeaderContainer />
      <MainContainer />
      {isLoading && <CustomLoading />}
    </div>
  );
}

export default App;
