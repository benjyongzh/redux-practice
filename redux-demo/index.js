// import redux from 'redux'; ES^ style
const redux = require("redux");
const createStore = redux.createStore;

const BUY_CAKE = "BUY_CAKE";

//action creator. it only returns an action
function buyCake() {
  // an action is simply an object with a type property
  return {
    type: BUY_CAKE, // this type property is a constant string which describes the action
    info: "First redux action", // other properties of the action object are optional
  };
}

// reducer = (previousState, action) => newState
const initialState = {
  numOfCakes: 10,
};

// standard form of a reducer
const reducer = (state = initialState, action) => {
  switch (
    action.type // switch to see what kind of action is being input
  ) {
    case BUY_CAKE:
      //always return aa completely new object
      return {
        ...state, // use spread to make a copy of the oldState, then only edit the numOfCakes
        numOfCakes: state.numOfCakes - 1,
      };
    // always have a default action for unaccounted for actions
    default:
      return state;
  }
};

const store = createStore(reducer); //standard syntax for creating a store. 1 reducer as an arg
console.log("Initial State: ", store.getState()); // store has a getState() to get the current state of the store

// subscribe takes a function as an arg. this function is run whenever the state is changed
const unsubscribe = store.subscribe(() => {
  console.log("Update State: ", store.getState());
}); //capture the subscribed function to be able to unsubscribe later on

//dispatch takes an action as an arg
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake()); //multiple dispatches for testing/example sake

unsubscribe();
