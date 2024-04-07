import { PropsWithChildren } from "react"
import { StateEngineCreator } from "./create-state-engine"
import { StateEngineState, StateEngineMutatorsArgs, StateEngineGettersParams } from "./state-engine"
import { useStateEngine } from "./use-state-engine"

export type StateEngineProviderProps<
    STATE extends StateEngineState,
    MUTARGS extends StateEngineMutatorsArgs,
    GETPARAMS extends StateEngineGettersParams
> = {
    stateEngineCreator: StateEngineCreator<
        STATE,
        MUTARGS,
        GETPARAMS
    >
}

export function StateEngineProvider<
    STATE extends StateEngineState,
    MUTARGS extends StateEngineMutatorsArgs,
    GETPARAMS extends StateEngineGettersParams
>(
    props: PropsWithChildren<StateEngineProviderProps<STATE, MUTARGS, GETPARAMS>>
) {
    const { children, stateEngineCreator } = props;
    const StateEngineInst = useStateEngine(stateEngineCreator);

    return <stateEngineCreator.context.Provider value={StateEngineInst}>
        {
            children
        }
    </stateEngineCreator.context.Provider>
}
