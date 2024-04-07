import { useMemo, useState } from "react";
import { StateEngineCreator } from "./create-state-engine";
import { StateEngineGettersParams, StateEngineMutatorsArgs, StateEngineState } from "./state-engine";

export function useStateEngine<
    STATE extends StateEngineState,
    MUTARGS extends StateEngineMutatorsArgs,
    GETPARAMS extends StateEngineGettersParams
>(
    stateEngineCreator: StateEngineCreator<
        STATE,
        MUTARGS,
        GETPARAMS
    >
) {
    const { initialState, creator } = stateEngineCreator;
    const [stateEngineState, setStateEngineState] = useState(initialState);

    const stateEngine = useMemo(() => {
        return creator({
            state: stateEngineState,
            setter: setStateEngineState
        })
    }, [
        stateEngineState,
        creator
    ]);

    return stateEngine;
}
