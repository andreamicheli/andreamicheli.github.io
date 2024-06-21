import React from "react";

function Container({ vh, children }) {
  return (
    <div className={"w-screen p-10"} style={{ height: vh }}>
      {children}
    </div>
  );
}

export default Container;
