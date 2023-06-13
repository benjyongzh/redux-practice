const configureStore = require("@reduxjs/toolkit").configureStore;

//reducers
const cakeReducer = require("../features/cake/cakeSlice");
const icecreamReducer = require("../features/icecream/icecreamSlice");

//configureStore takes an object as an arg
//this object
const store = configureStore({
  //the reducer key is similar to the combineReducer of the original redux
  reducer: {
    cake: cakeReducer,
    icecream: icecreamReducer,
  },
});

module.exports = store;
