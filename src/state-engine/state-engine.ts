
// Mutators

import { Draft, createDraft, finishDraft } from "immer";
import { Dispatch, SetStateAction } from "react";

export type StateEngineState = {
    [p: string]: any;
}

export type StateEngineMutator<
    ROOTSTATE extends StateEngineState,
    ROOTMUTARGS extends StateEngineMutatorsArgs,
    ROOTGETPARAMS extends StateEngineGettersParams
> = (
    state: ROOTSTATE,
    stateEngine: StateEngine<
        ROOTSTATE,
        ROOTMUTARGS,
        ROOTGETPARAMS
    >
) => ROOTSTATE;

export type StateEngineMutatorsArgs = {
    [p: string]: any[];
}

export type StateEngineMutators<
    STATE extends StateEngineState,
    MUTARGS extends StateEngineMutatorsArgs,
    ROOTGETPARAMS extends StateEngineGettersParams,
    ROOTMUTARGS extends StateEngineMutatorsArgs = MUTARGS
> = {
    [p in keyof MUTARGS]: (...args: MUTARGS[p]) => StateEngineMutator<
        STATE,
        ROOTMUTARGS,
        ROOTGETPARAMS
    >;
}

// Getters

export type StateEngineGetter<
    ROOTSTATE extends StateEngineState,
    ROOTMUTARGS extends StateEngineMutatorsArgs,
    ROOTGETPARAMS extends StateEngineGettersParams,
    RETURN
> = (
    state: ROOTSTATE,
    stateEngine: StateEngine<
        ROOTSTATE,
        ROOTMUTARGS,
        ROOTGETPARAMS
    >
) => RETURN;

export type StateEngineGetters<
    STATE extends StateEngineState,
    ROOTMUTARGS extends StateEngineMutatorsArgs,
    GETPARAMS extends StateEngineGettersParams,
    ROOTGETPARAMS extends StateEngineGettersParams = GETPARAMS
> = {
    [p in keyof GETPARAMS]: (...args: GETPARAMS[p]["args"]) => StateEngineGetter<
        STATE,
        ROOTMUTARGS,
        ROOTGETPARAMS,
        GETPARAMS[p]["return"]
    >;
}

export type StateEngineGettersParams = {
    [p: string]: {
        args: any[];
        return: any;
    }
}

// State Engine

export class StateEngine<
    STATE extends StateEngineState,
    MUTARGS extends StateEngineMutatorsArgs,
    GETPARAMS extends StateEngineGettersParams
> {
    state: STATE;
    mutators: StateEngineMutators<
        STATE,
        MUTARGS,
        GETPARAMS
    >;
    getters: StateEngineGetters<
        STATE,
        MUTARGS,
        GETPARAMS
    >;
    setter: Dispatch<SetStateAction<STATE>>;

    constructor(
        state: STATE,
        mutators: StateEngineMutators<
            STATE,
            MUTARGS,
            GETPARAMS
        >,
        getters: StateEngineGetters<
            STATE,
            MUTARGS,
            GETPARAMS
        >,
        setter: Dispatch<SetStateAction<STATE>>
    ) {
        this.state = state;
        this.mutators = mutators;
        this.getters = getters;
        this.setter = setter
    }

    private copy(
        mutator: StateEngineMutator<
            STATE,
            MUTARGS,
            GETPARAMS
        >
    ) {
        return new StateEngine<
            STATE,
            MUTARGS,
            GETPARAMS
        >(
            mutator(JSON.parse(JSON.stringify(this.state)), this),
            this.mutators,
            this.getters,
            this.setter
        )
    }

    // TODO
    // recursive indexing
    set<
        P extends keyof MUTARGS
    >(path: P, ...args: MUTARGS[P]) {
        return this.copy(this.mutators[path](...args));
    }

    get<
        P extends keyof GETPARAMS
    >(path: P, ...args: GETPARAMS[P]["args"]) {
        return this.getters[path](...args)(this.state, this);
    }

    store() {
        this.setter(this.state);
    }
}
