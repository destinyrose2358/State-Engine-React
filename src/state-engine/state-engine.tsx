import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

// types

export type StateEngineSubState = {
    [p: string]: any;
}

export type StateEngineState = {
    [p: string]: StateEngineSubState;
}

export type StateEngineSettersProps<SA extends StateEngineSettersPropsArgs<S>, S extends StateEngineState> = {
    [p in keyof SA]: {
        [l in keyof SA[p]]: (...args: SA[p][l]) => S;
    };
}

export type StateEngineSettersPropsArgs<S extends StateEngineState> = {
    [p in keyof S]: {
        [l: string]: any[];
    }
}

export type StateEngineSetters<E extends StateEngineSettersPropsArgs<S>, G extends StateEngineGettersProps<S>, S extends StateEngineState> = {
    [p in keyof E]: {
        [l in keyof E[p]]: (...args: E[p][l]) => StateEngine<E, G, S>;
    }
}

export type StateEngineSettersPropsGenerators<E extends StateEngineSettersPropsArgs<S>, G extends StateEngineGettersProps<S>, S extends StateEngineState> = {
    [p in keyof E]: {
        [l in keyof E[p]]: (state: S, stateEngineGetter: () => StateEngine<E, G, S>, ...args: E[p][l]) => S;
    }
}

export type StateEngineGettersProps<S extends StateEngineState> = {
    [p in keyof S]: {
        [l: string]: (...args: any) => any;
    }
}

export type StateEngineGetters<G extends StateEngineGettersProps<S>, S extends StateEngineState> = {
    [p in keyof G]: {
        [l in keyof G[p]]: (...args: Parameters<G[p][l]>) => ReturnType<G[p][l]>;
    }
}

export type StateEngineGettersPropsGenerators<E extends StateEngineSettersPropsArgs<S>, G extends StateEngineGettersProps<S>, S extends StateEngineState> = {
    [p in keyof G]: {
        [l in keyof G[p]]: (state: S, stateEngineGetter: () => StateEngine<E, G, S>, ...args: Parameters<G[p][l]>) => ReturnType<G[p][l]>;
    }
}

export type StateEngineStateSetter<S extends StateEngineState> = Dispatch<SetStateAction<S>>;

export type StateEngine<
    E extends StateEngineSettersPropsArgs<S>,
    G extends StateEngineGettersProps<S>,
    S extends StateEngineState
> = {
    state: S;
    set: <P extends keyof E, M extends keyof E[P]>(path: P, methodName: M, ...args: E[P][M]) => StateEngine<E, G, S>;
    get: <P extends keyof G, M extends keyof G[P]>(path: P, methodName: M, ...args: Parameters<G[P][M]>) => ReturnType<G[P][M]>;
    render: () => ReturnType<StateEngineStateSetter<S>>;
}

export type StateEngineGenerator<
    E extends StateEngineSettersPropsArgs<S>,
    G extends StateEngineGettersProps<S>,
    S extends StateEngineState
> = (state: S, setter: StateEngineStateSetter<S>) => StateEngine<E, G, S>;

// functions

export function createStateEngineGenerator<
    E extends StateEngineSettersPropsArgs<S>,
    G extends StateEngineGettersProps<S>,
    S extends StateEngineState
>(
    defaultState: S,
    settersGenerators: StateEngineSettersPropsGenerators<E, G, S>,
    gettersGenerators: StateEngineGettersPropsGenerators<E, G, S>
): { stateEngineGenerator: StateEngineGenerator<E, G, S>; defaultState: S; } {
    const stateEngineGenerator = (state: S, setter: StateEngineStateSetter<S>) => {
        const action: SetStateAction<S> = {
            ...state
        }

        const finalStateEngine: StateEngine<E, G, S> = (() => {
            const getStateEngine = () => finalStateEngine;
            return {
                state,
                set: (path, methodName, ...args) => {
                    return stateEngineGenerator(settersGenerators[path][methodName](state, getStateEngine, ...args), setter)
                },
                get: (path, methodName, ...args) => {
                    return gettersGenerators[path][methodName](state, getStateEngine, ...args);
                },
                render: () => setter(action)
            }
        })()

        return finalStateEngine;
    }

    return {stateEngineGenerator, defaultState};
}

export function useStateEngine<
    E extends StateEngineSettersPropsArgs<S>,
    G extends StateEngineGettersProps<S>,
    S extends StateEngineState
>(props: {stateEngineGenerator: StateEngineGenerator<E, G, S>, defaultState: S}): StateEngine<E, G, S> {
    const { stateEngineGenerator, defaultState } = props;
    const [state, setState] = useState(defaultState);

    useEffect(() => {
        setState(defaultState);
    }, [
        defaultState
    ])

    const StateEngine = useMemo(() => {
        return stateEngineGenerator(state, setState);
    }, [
        state
    ]);

    return StateEngine
}