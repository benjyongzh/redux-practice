// import redux from 'redux'; ES^ style
const redux = require("redux");
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

//immer
const produce = require("immer").produce;

//redux-logger. this logs each action. so there is no need to subscribe to a console.log for each action
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const RESTOCK_CAKE = "RESTOCK_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";
const RESTOCK_ICECREAM = "RESTOCK_ICECREAM";

//action creator. it only returns an action
function buyCake() {
  // an action is simply an object with a type property
  return {
    type: BUY_CAKE, // this type property is a constant string which describes the action
    info: "First redux action", // other properties of the action object are optional
    payload: 1, // often, additional info/properties in the action is named as payload
  };
}

function restockCake(qty = 1) {
  // an action is simply an object with a type property
  return {
    type: RESTOCK_CAKE, // this type property is a constant string which describes the action
    info: "second redux action", // other properties of the action object are optional
    payload: qty,
  };
}

function buyIceCream() {
  return {
    type: BUY_ICECREAM,
    payload: 1,
  };
}

function restockIceCream(qty = 1) {
  return {
    type: RESTOCK_ICECREAM,
    payload: qty,
  };
}

// reducer = (previousState, action) => newState
// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20, // multiple objects in a state is possible
// };

const initialCakeState = {
  numOfCakes: 10,
};

const initialIceCreamState = {
  numOfIceCreams: 20,
};

// standard form of a reducer
const cakeReducer = (state = initialCakeState, action) => {
  switch (
    action.type // switch to see what kind of action is being input
  ) {
    case BUY_CAKE:
      //always return aa completely new object
      // return {
      //   ...state, // use spread to make a copy of the oldState, then only edit the numOfCakes
      //   numOfCakes: state.numOfCakes - 1,
      // };

      // learning about immer to prevent use of spread state
      // syntax: produce(currentState, <function that takes a draft copy of that state, to be edited in the function>)
      return produce(state, (draft) => {
        draft.numOfCakes = state.numOfCakes - 1;
      });

    case RESTOCK_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload, // use action.payload to refer to the action's payload, which can be an argument of the dispatched action
      };
    // always have a default action for unaccounted for actions
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    case RESTOCK_ICECREAM:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    case BUY_CAKE: //can still respond to actions not concerning this reducer, although it can only affect its own objects. This is an issue solved by redux-toolkit
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

//standard syntax for creating a store. 1 reducer as an arg
// const store = createStore(reducer);

//syntax for combine reducers
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
// can add middleware into createStore
const store = createStore(rootReducer /* applyMiddleware(logger) */);

console.log("Initial State: ", store.getState()); // store has a getState() to get the current state of the store

// subscribe takes a function as an arg. this function is run whenever the state is changed
const unsubscribe = store.subscribe(() => {
  //this subscription is taken care of by the reduxlogger
  console.log("Update State: ", store.getState());
}); //capture the subscribed function to be able to unsubscribe later on

//dispatch takes an action as an arg
// store.dispatch(buyCake());
// store.dispatch(buyCake()); //multiple dispatches for testing/example sake
// store.dispatch(buyCake());
// store.dispatch(restockCake(3)); //using an input to determine the action's payload

// bindActionCreators allows you to dispatch the action directly from an object
const actions = bindActionCreators(
  { buyCake, restockCake, buyIceCream, restockIceCream },
  store.dispatch
);
actions.buyCake();
actions.buyCake();
actions.buyCake();
actions.restockCake(3);
actions.buyIceCream();
actions.buyIceCream();
actions.restockIceCream(2);
unsubscribe();
