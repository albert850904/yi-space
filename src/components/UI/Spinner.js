import React from "react";
import "./Spinner.css";

const LoadingIndicator = (props) => {
  if (!props.show) return <></>;
  return (
    <div className="backdrop">
      <div className="lds-ring">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default LoadingIndicator;
