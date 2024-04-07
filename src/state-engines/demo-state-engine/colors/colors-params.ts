import { bundleGetters } from "../../../state-engine/bundle-getters";
import { BundledStateEngineMutatorsArgs, bundleMutators } from "../../../state-engine/bundle-mutators";
import { DemoState, DemoGettersParams, DemoMutatorsArgs } from "../demo-state-engine";
import { ColorsBackgroundGettersParams, ColorsBackgroundKey, ColorsBackgroundKeyConst, ColorsBackgroundMutatorsArgs, ColorsBackgroundState, bundledColorsBackgroundMutators, colorsBackgroundGetters, initialColorsBackground } from "./colors-background-params";

// Key

export const ColorsKeyConst = "colors";
export type ColorsKey = typeof ColorsKeyConst;

// State

export type ColorsState = {
    [p in ColorsBackgroundKey]: ColorsBackgroundState;
}

export const initialColors: ColorsState = {
    [ColorsBackgroundKeyConst]: initialColorsBackground,
}

// Mutators

export type ColorsMutatorsArgs = BundledStateEngineMutatorsArgs<
    ColorsBackgroundMutatorsArgs,
    ColorsBackgroundKey
>

export const bundledColorsMutators = bundleMutators<
    ColorsKey,
    DemoState,
    ColorsMutatorsArgs,
    DemoGettersParams,
    DemoMutatorsArgs
>(
    ColorsKeyConst, {
        ...bundledColorsBackgroundMutators 
    }
);

// Getters

export type ColorsGettersParams = {
    
} & ColorsBackgroundGettersParams;

export const bundledColorsGetters = bundleGetters<
    ColorsKey,
    DemoState,
    DemoMutatorsArgs,
    ColorsGettersParams,
    DemoGettersParams
>(
    ColorsKeyConst, {
        ...colorsBackgroundGetters
    }
);
