
// Key

import { bundleMutators } from "../../../state-engine/bundle-mutators";
import { StateEngineGetters } from "../../../state-engine/state-engine";
import { DemoGettersParams, DemoMutatorsArgs, DemoState } from "../demo-state-engine";

export const ColorsBackgroundKeyConst = "background";
export type ColorsBackgroundKey = typeof ColorsBackgroundKeyConst;

// State

export type ColorsBackgroundState = string;

export const initialColorsBackground: ColorsBackgroundState = "#ffffff";

// Mutators

export type ColorsBackgroundMutatorsArgs = {
    randomize: [];
    set: [newColorsBackground: ColorsBackgroundState];
}

export const bundledColorsBackgroundMutators = bundleMutators<
    ColorsBackgroundKey,
    DemoState,
    ColorsBackgroundMutatorsArgs,
    DemoGettersParams,
    DemoMutatorsArgs
>(
    ColorsBackgroundKeyConst, {
        randomize: () => (state) => {
            state.colors.background = "#000000".replace(/0/g,function(){return (~~(Math.random()*16)).toString(16);});
            return state;
        },
        set: (newColorsBackground) => (state) => {
            state.colors.background = newColorsBackground;
            return state;
        }
    }
);

// Getters

export type ColorsBackgroundGettersParams = {
    background: {
        args: [];
        return: string;
    }
}

export const colorsBackgroundGetters: StateEngineGetters<
    DemoState,
    DemoMutatorsArgs,
    ColorsBackgroundGettersParams,
    DemoGettersParams
> = {
    background: () => (state) => state.colors.background
}
