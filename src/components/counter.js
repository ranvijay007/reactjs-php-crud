import React, { useState, useReducer } from "react";

const Counter = () => {
  const initialstate = 0;
  const reducer = (state, action) => {
    switch (action.type) {
      case "increment":
        return state + action.value;
      case "decrement":
        return state - action.value;
      case "increment5":
        return state + action.value;
      case "decrement5":
        return state - action.value;
      case "reset":
        return (state = action.value);
      default:
        return state;
    }
  };

  const [counter, dispatch] = useReducer(reducer, initialstate);

  return (
    <div>
      <div>
        <h1>Counter</h1>
        <h3>{counter}</h3>
      </div>
      <div>
        <button
          onClick={() => {
            dispatch({ type: "increment", value: 1 });
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            dispatch({ type: "decrement", value: 1 });
          }}
        >
          -
        </button>
        <button
          onClick={() => {
            dispatch({ type: "increment5", value: 5 });
          }}
        >
          +5
        </button>
        <button
          onClick={() => {
            dispatch({ type: "decrement5", value: 5 });
          }}
        >
          -5
        </button>
        <button
          onClick={() => {
            dispatch({ type: "reset", value: 0 });
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
