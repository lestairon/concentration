import React from "react";
import PropTypes from "prop-types";

const Menu = ({ cleanState }) => {
  const clickHandler = () => {
    cleanState();
  };

  return <button onClick={clickHandler}>Restart</button>;
};

Menu.propTypes = {
  cleanState: PropTypes.func.isRequired
};

export default Menu;
