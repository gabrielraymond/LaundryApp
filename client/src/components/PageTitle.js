import React from "react";

const PageTitle = (props) => {
  return (
    <div className="my-3 p-3 bg-dark text-light rounded shadow-sm">
      <h3 className="panel-title">{props.title}</h3>
    </div>
  );
};

export default PageTitle;
