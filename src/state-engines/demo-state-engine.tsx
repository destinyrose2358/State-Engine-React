import { produce } from "immer";
import { createStateEngineGenerator } from "../state-engine/state-engine";

export type DemoState = {
    personalInfo: {
        firstName: string;
        lastName: string;
        age: number;
    };
    ids: {
        id: number;
    }
}

export type DemoSetters = {
    personalInfo: {
        incrementAge: [];
        setAge: [newAge: number];
        mixer: [];
    };
    ids: {
        incrementId: [stepSize: number];
    };
}

export type DemoGetters = {
    personalInfo: {
        getFullName: () => string;
    };
    ids: {};
}

export const DemoStateEngine = createStateEngineGenerator<
    DemoSetters,
    DemoGetters,
    DemoState
>(
    {
        personalInfo: {
            firstName: "Destiny",
            lastName: "Rose",
            age: 28
        },
        ids: {
            id: 0
        }
    },
    {
        personalInfo: {
            incrementAge: (state, stateEngine) => produce(state, (draft) => {
                draft.personalInfo.age += 1
            }),
            setAge: (state, stateEngine, newAge: number) => produce(state, (draft) => {
                draft.personalInfo.age = newAge
            }),
            mixer: (state, stateEngine) => {
                return stateEngine().set("personalInfo", "setAge", 34).state
            }
        },
        ids: {
            incrementId: (state, stateEngine, stepSize) => produce(state, draft => {
                draft.ids.id += stepSize;
            })
        }
    },
    {
        personalInfo: {
            getFullName: (state, stateEngine) => {
                return `${state.personalInfo.firstName} ${state.personalInfo.lastName}`
            },
        },
        ids: {

        }
    }
)
