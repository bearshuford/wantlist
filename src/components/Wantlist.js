import React from "react";
import { Want } from "./";

function Wantlist({ list }) {
  return (
    <>
      {list.map((item) => (
        <Want {...item}  />
      ))}
    </>
  );
}

export default Wantlist;
