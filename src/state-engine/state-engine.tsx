import { Dispatch, SetStateAction, useMemo, useState } from "react";

// types

export type StateEngineState = {
    [p: string | number]: string | number | boolean;
}

export type StateEngineEngineProps<S extends StateEngineState = {}> = Omit<{
    [p: string]: (...args: any) => S;
}, "back">

export type StateEngineEngine<E extends StateEngineEngineProps<S> = {}, S extends StateEngineState = {}> = {
    [p in keyof E]: (...args: Parameters<E[p]>) => StateEngine<E, S>["engine"];
} & {
    back: () => StateEngine<E, S>;
}

export type StateEngineEnginePropsGenerator<E extends StateEngineEngineProps<S> = {}, S extends StateEngineState = {}> = (state: S) => E;

export type StateEngineStateSetter<S extends StateEngineState = {}> = Dispatch<SetStateAction<S>>;

export type StateEngine<E extends StateEngineEngineProps<S> = {}, S extends StateEngineState = {}> = {
    state: S;
    engine: StateEngineEngine<E, S>;
    set: () => ReturnType<StateEngineStateSetter<S>>;
}

export type StateEngineGenerator<E extends StateEngineEngineProps<S> = {}, S extends StateEngineState = {}> = (state: S, setter: StateEngineStateSetter<S>) => StateEngine<E, S>;

// functions

export function createStateEngineGenerator<E extends StateEngineEngineProps<S> = {}, S extends StateEngineState = {}>(engineGenerator: StateEngineEnginePropsGenerator<E, S>): StateEngineGenerator<E, S> {
    const stateEngineGenerator = (state: S, setter: StateEngineStateSetter<S>): StateEngine<E, S> => {
        const action: SetStateAction<S> = {
            ...state
        }
        const finalStateEngine: StateEngine<E, S> = {
            state,
            engine: Object.fromEntries([...Object.entries(engineGenerator(state)).map(([key, callback]) => [key, (...args: Parameters<typeof callback>) => stateEngineGenerator(callback(...args), setter).engine]), ["back", () => finalStateEngine]]) as StateEngineEngine<E, S>,
            set: () => setter(action)
        }

        return finalStateEngine;
    }

    return stateEngineGenerator;
}

export function useStateEngine<E extends StateEngineEngineProps<S> = {}, S extends StateEngineState = {}>(stateEngineGenerator: StateEngineGenerator<E, S>, defaultState: S): StateEngine<E, S> {
    const [state, setState] = useState(defaultState);

    const StateEngine = useMemo(() => {
        return stateEngineGenerator(state, setState);
    }, [
        state
    ]);

    return StateEngine
}