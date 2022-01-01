import React from "react";
import load from "./spinner.gif";

const Load = () => {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-center">
        <img src={load} alt="loading" style={{ width: "20%" }}></img>
      </div>
    </main>
  );
};

export default Load;
