import { StateEngineGettersParams, StateEngineMutators, StateEngineMutatorsArgs, StateEngineState } from "./state-engine";

export type BundledStateEngineMutatorsArgs<
    MUTARGS extends StateEngineMutatorsArgs,
    P extends string
> = {
    [p in (string & keyof MUTARGS) as `${P}.${p}`]: MUTARGS[p]
}

export function bundleMutators<
    P extends string,
    STATE extends StateEngineState,
    MUTARGS extends StateEngineMutatorsArgs,
    GETPARAMS extends StateEngineGettersParams,
    ROOTMUTARGS extends StateEngineMutatorsArgs,
>(
    path: P,
    mutators: StateEngineMutators<
        STATE,
        MUTARGS,
        GETPARAMS,
        ROOTMUTARGS
    >
): StateEngineMutators<
    STATE,
    BundledStateEngineMutatorsArgs<
        MUTARGS,
        P
    >,
    GETPARAMS,
    ROOTMUTARGS
> {
    return Object.fromEntries(
        Object
            .entries(mutators)
            .map(
                ([key, mutator]) => [path + "." + key, mutator]
            )
    ) as StateEngineMutators<
        STATE,
        BundledStateEngineMutatorsArgs<
            MUTARGS,
            P
        >,
        GETPARAMS,
        ROOTMUTARGS
    >;
}
