import React from "react";
import { useSelector } from "react-redux";

export const IcecreamView = () => {
  const numOfIcecreams = useSelector((state) => state.icecream.numOfIcecreams);
  return (
    <div>
      <h2>Number of icecreams - {numOfIcecreams}</h2>
      <button>Order icecream</button>
      <button>Restock icecream</button>
    </div>
  );
};
