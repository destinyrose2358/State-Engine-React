# State Engine

The State Engine is a class with a state, set and get methods, as well as a store method that triggers a React State update.

Please refer to [the Demo State Engine](src/state-engines/demo-state-engine/demo-state-engine.ts) for an example of usage.

## Helper Methods

### createStateEngine

This method is responsible for setting up the generator that is used by the useStateEngine method.

### useStateEngine

This method is responsible for setting up the React Hooks for state and a State Engine from that state.

### bundleMutators

This method is responsible for prepending a parent key to the Mutators provided.

### bundleGetters

This method is responsible for prepending a parent key to the Getters provided.

## StateEngineProvider

The State Engine Provider is responsible for taking a State Engine Creator and providing an instance of that State Engine to any child components.
