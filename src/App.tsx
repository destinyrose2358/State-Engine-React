import './App.css';
import { DemoStateEngine } from './state-engines/demo-state-engine';
import { useStateEngine } from './state-engine/state-engine';

function App() {
  const TestEngine = useStateEngine(DemoStateEngine);

  return (
    <div className="App">
      <p>{TestEngine.get("personalInfo", "getFullName")}</p>
      <p>{TestEngine.state.personalInfo.age}</p>
      <p>{TestEngine.state.ids.id}</p>
      <div
      style={{
        width: "20px",
        height: "20px",
        background: "black"
      }}
        onClick={() => {
          TestEngine
            .set("ids", "incrementId", 1)
            .set("personalInfo", "mixer")
            .render();
        }}
      />
    </div>
  );
}

export default App;
