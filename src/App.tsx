import './App.css';
import { DemoStateEngine } from './state-engines/demo-state-engine/demo-state-engine';
import { useStateEngine } from './state-engine/use-state-engine';
import { StateEngineProvider } from './state-engine/state-engine-provider';
import { Container } from './components/container';
import { DemoStateDisplay } from './components/demo-state-display';
import { RandomizerButton } from './components/randomizer-button';

function App() {

  return (
    <StateEngineProvider stateEngineCreator={DemoStateEngine}>
      <Container>
        <DemoStateDisplay />
        <RandomizerButton />
      </Container>
    </StateEngineProvider>
  );
}

export default App;
