const createSlice = require("@reduxjs/toolkit").createSlice;

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
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
