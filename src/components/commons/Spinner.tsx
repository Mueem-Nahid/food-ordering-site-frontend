import React from "react";

const Spinner: React.FC = () => {
  return (
    <>
      <div className="spinner">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1>Processing....</h1>
      </div>
    </>
  );
};

export default Spinner;
