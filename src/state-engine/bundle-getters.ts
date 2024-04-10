import { StateEngineGetters, StateEngineGettersParams, StateEngineMutatorsArgs, StateEngineState } from "./state-engine";

export type BundledStateEngineGettersParams<
    GETPARAMS extends StateEngineGettersParams,
    P extends string
> = {
    [p in (string & keyof GETPARAMS) as `${P}.${p}`]: GETPARAMS[p];
}

export function bundleGetters<
    P extends string,
    STATE extends StateEngineState,
    MUTARGS extends StateEngineMutatorsArgs,
    GETPARAMS extends StateEngineGettersParams,
    ROOTGETPARAMS extends StateEngineGettersParams
>(
    path: P,
    getters: StateEngineGetters<
        STATE,
        MUTARGS,
        GETPARAMS,
        ROOTGETPARAMS
    >
): StateEngineGetters<
    STATE,
    MUTARGS,
    BundledStateEngineGettersParams<
        GETPARAMS,
        P
    >,
    ROOTGETPARAMS
> {
    return Object.fromEntries(
        Object
            .entries(getters)
            .map(
                ([key, getter]) => [path + "." + key, getter]
            )
    ) as StateEngineGetters<
        STATE,
        MUTARGS,
        BundledStateEngineGettersParams<
            GETPARAMS,
            P
        >,
        ROOTGETPARAMS
    >;
}
