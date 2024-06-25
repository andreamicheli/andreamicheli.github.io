import React from "react";

function Container({ vh, children }) {
  return (
    <div className={"p-10"} style={{ height: vh }}>
      {children}
    </div>
  );
}

export default Container;
