import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment , incrementByAmount } from "./feature/CounterSlice";
import "./App.css";
import { useState } from 'react'
const [number, setnumber] = useState(3)

const App = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <main className="app-shell">
      <section className="counter-card" aria-labelledby="counter-title">
        <p className="eyebrow">Redux Toolkit Counter</p>
        <h1 id="counter-title">Minimal black glass theme</h1>
        <p className="description">
        </p>

        <div className="counter-display" aria-live="polite">
          <span className="counter-label">Current count</span>
          <strong className="counter-value">{count}</strong>
        </div>

        <div className="counter-actions">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => dispatch(decrement())}
          >
            Decrement
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => dispatch(increment())}
          >
            Increment
          </button>
          <input type="number" 
          value={number} 
          onChange={(e) => setnumber(Number(e.target.value))}/>
          <button
            type="button"
            className="btn btn-third"
            
            onClick={() => dispatch(incrementByAmount(number))}
          >
            Increment by {number}
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;
