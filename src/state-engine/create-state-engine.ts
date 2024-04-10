import { Context, Dispatch, SetStateAction, createContext } from "react";
import { StateEngine, StateEngineGetters, StateEngineGettersParams, StateEngineMutators, StateEngineMutatorsArgs, StateEngineState } from "./state-engine";

export type StateEngineCreatorProps<
    STATE extends StateEngineState
> = {
    state: STATE;
    setter: Dispatch<SetStateAction<STATE>>;
}

export type StateEngineCreator<
    STATE extends StateEngineState,
    MUTARGS extends StateEngineMutatorsArgs,
    GETPARAMS extends StateEngineGettersParams
> = {
    initialState: STATE;
    context: Context<StateEngine<STATE, MUTARGS, GETPARAMS>>;
    creator: (props: StateEngineCreatorProps<STATE>) => StateEngine<
        STATE,
        MUTARGS,
        GETPARAMS
    >
}

export function createStateEngine<
    STATE extends StateEngineState,
    MUTARGS extends StateEngineMutatorsArgs,
    GETPARAMS extends StateEngineGettersParams
>(
    initialState: STATE,
    mutators: StateEngineMutators<
        STATE,
        MUTARGS,
        GETPARAMS
    >,
    getters: StateEngineGetters<
        STATE,
        MUTARGS,
        GETPARAMS
    >
): StateEngineCreator<
    STATE,
    MUTARGS,
    GETPARAMS
> {
    const context = createContext(
        new StateEngine(
            initialState,
            mutators,
            getters,
            () => {}
        )
    );
    return {
        initialState,
        context,
        creator: (props) => {
            return new StateEngine(
                props.state,
                mutators,
                getters,
                props.setter
            )
        }
    }
}
