import { createSlice } from "@reduxjs/toolkit";

//for extraReducer
import { ordered as cakeOrdered } from "../cake/cakeSlice";

const initialState = {
  numOfIcecreams: 20,
};

// create slice takes an object with name, initialState and reducers
const icecreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    //each action as a function which takes state and action
    //createSlice automatically creates action creators according to the names of each of the reducer's inputs
    //syntax: actionName: (state,action => {})
    //can directly mutate the state argument, because createSlice uses immer library
    ordered: (state) => {
      state.numOfIcecreams--;
    },
    restocked: (state, action) => {
      state.numOfIcecreams += action.payload;
    },
  },
  //use extraReducers for actions which affect other reducers as well (eg, buy 1 cake, get a free icecream)
  //it is a function taking builder. need to import cakeActions
  extraReducers: (builder) => {
    builder.addCase(cakeOrdered, (state, action) => {
      state.numOfIcecreams--;
    });
  },
});

export default icecreamSlice.reducer;
export const { ordered, restocked } = icecreamSlice.actions;
