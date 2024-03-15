# State Engine

The State Engine is an Object with a state, set and get methods, and a render method that triggers a react state update.

## Helper Methods

### createStateEngineGenerator(state, setters, getters)

This method is responsible for setting up the generator that is used by the useStateEngine method. Please refer to [the Demo State Engine](src/state-engines/demo-state-engine.tsx) for an example of usage.

### useStateEngineGenerator(props: {stateEngineGenerator, defaultState})

This method is responsible for setting up the React Hooks necessary to hold a state and create a State Engine from that state, setState callback, and the State Engine Generator.
