import { useMemo, useState } from 'react';
import './App.css';
import { TestState, TestStateEngine } from './state-engines/test-state-engine';
import { useStateEngine } from './state-engine/state-engine';

function App() {
  const TestEngine = useStateEngine(TestStateEngine, {
    name: "HI",
    age: 0
  });

  return (
    <div className="App">
      <p>{TestEngine.state.age}</p>
      <div
      style={{
        width: "20px",
        height: "20px",
        background: "black"
      }}
        onClick={() => {
          TestEngine.engine.mixer().back().set()

          // Demonstrates the usage of the back method to allow for transfer of state
          // const modifiedTestEngine = TestEngine.engine.incrementAge().incrementAge().back();
          // TestEngine.engine.setAge(modifiedTestEngine.state.age).incrementAge().back().set();
        }}
      />
    </div>
  );
}

export default App;
