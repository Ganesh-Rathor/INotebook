import React, { useContext } from "react";
import Note from "./Note";

const Home = (props) => {
  const {alert} = props;
  return (
    <>
      <Note alert={alert} />
    </>
  );
};

export default Home;
