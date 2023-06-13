import React from "react";
import { useSelector } from "react-redux";

export const CakeView = () => {
  //useSelector takes a function, which takes the redux's state as an arg. this function then returns a value
  //state here is redux state, which contains multiple reducers (cake, icecream and user)
  //numOfCakes is basically the property of the cake reducer, found in the cake slice
  const numOfCakes = useSelector((state) => state.cake.numOfCakes);
  return (
    <div>
      <h2>Number of cakes - {numOfCakes}</h2>
      <button>Order cake</button>
      <button>Restock cake</button>
    </div>
  );
};
