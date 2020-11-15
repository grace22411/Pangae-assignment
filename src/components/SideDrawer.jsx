import React from "react";
import "../App.css";
import Cart from "./Cart";
import Currencies from "./Currencies";

const SideDrawer = ({ isOpen, close }) => {
  return (
    <div className={`side-drawer--wrapper ${isOpen ? "open" : ""}`}>
      <div className="side-drawer">
        <div className="side-drawer--container">
          <button className="close-drawer" onClick={close}>
            &times;
          </button>

          <Cart />
        </div>
      </div>
    </div>
  );
};

export default SideDrawer;
