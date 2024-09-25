import React from "react";

function Container({ vh, children, style }) {
  return (
    <div className={"p-10 sm:p-2 " + style} style={{ height: vh }}>
      {children}
    </div>
  );
}

export default Container;
