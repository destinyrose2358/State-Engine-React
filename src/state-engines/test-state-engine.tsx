import { createStateEngineGenerator } from "../state-engine/state-engine";

export type TestState = {
    name: string;
    age: number;
}

export const TestStateEngine = createStateEngineGenerator(
    (state: TestState) => ({
        incrementAge: () => ({ ...state, age: state.age + 1 }),
        setAge: (newAge: number) => ({ ...state, age: newAge })
    })
)
