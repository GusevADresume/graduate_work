import React from "react";

function Tooltip({ x, y, value, visible }) {
  const style = { marginTop: y, marginLeft: x-110 };
  return (
    <div
      className={visible == true ? "Tooltip Active" : "Tooltip"}
      style={style}
    >
      {value}
    </div>
  );
}

export { Tooltip };
