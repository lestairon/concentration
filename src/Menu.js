import React from "react";

const Menu = ({ cleanState }) => {
  const clickHandler = () => {
    cleanState();
  };

  return (
    <div>
      <button onClick={clickHandler}>Restart</button>
    </div>
  );
};
export default Menu;
