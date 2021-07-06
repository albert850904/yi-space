import React from "react";
import Transition from "react-transition-group/Transition";
import CssTransition from "react-transition-group/CSSTransition";
import "./Modal.css";
const classNames = require("classnames");

const animationTiming = {
  enter: 400,
  exit: 1000,
};

const modal = (props) => {
  const { show, closed, info } = props;

  return (
    <div className={classNames(show ? "backdrop" : "backdrop-hide")}>
      <CssTransition
        in={show}
        timeout={animationTiming}
        mountOnEnter
        unmountOnExit
        classNames={{
          enter: "",
          enterActive: "modalOpen",
          exit: "",
          exitActive: "modalClose",
        }}
      >
        <div className="Modal">
          <img src={info.flag} alt={info.name} />
          <h1>{info.name}</h1>
          <div>
            <div>
              <b>2位國家代碼</b>: {info.alpha2Code}
            </div>
            <div>
              <b>3位國家代碼</b>: {info.alpha3Code}
            </div>
          </div>
          <div>
            <div>
              <b>首都</b>: {info.capital}
            </div>
            <div>
              <b>區域</b>: {info.region}
            </div>
          </div>
          <div>
            <div>
              <b>子區域</b>: {info.subregion}
            </div>
            <div>
              <b>人口數</b>: {info.population}
            </div>
          </div>
          <div>
            <div>
              <b>經緯度</b>: {info.latlng}
            </div>
            <div>
              <b>人種</b>: {info.nativeName}
            </div>
          </div>
          <div>
            <div>
              <b>貨幣</b>: {info?.currencies[0]?.name}
            </div>
            <div>
              <b>語言</b>: {info?.languages[0]?.name}
            </div>
          </div>
          <button className="Button" onClick={closed}>
            關閉
          </button>
        </div>
      </CssTransition>
    </div>
  );
};

export default modal;
