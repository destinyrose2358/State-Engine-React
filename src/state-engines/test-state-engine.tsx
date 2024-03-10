import { StateEngineEngine, createStateEngineGenerator } from "../state-engine/state-engine";

export type TestState = {
    name: string;
    age: number;
}

export type TestEngine = {
    incrementAge: () => TestState;
    setAge: (newAge: number) => TestState;
    mixer: () => TestState;
}

export const TestStateEngine = createStateEngineGenerator(
    (state: TestState, engine: () => StateEngineEngine<TestEngine, TestState>) => ({
        incrementAge: () => ({ ...state, age: state.age + 1 }),
        setAge: (newAge: number) => ({ ...state, age: newAge }),
        // Accesses the engine methods
        mixer: () => (engine().incrementAge().back().state)
    })
)
