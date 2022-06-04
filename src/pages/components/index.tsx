import React from "react";
import Dropdown from "./Dropdown";

const ComponentHome = () => {
  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Dropdown
        items={[
          {
            id: 1,
            name: "감자",
            value: "potato",
          },
          {
            id: 2,
            name: "강아지",
            value: "dog",
          },
          {
            id: 3,
            name: "물",
            value: "water",
          },
        ]}
      />
    </div>
  );
};

export default ComponentHome;
