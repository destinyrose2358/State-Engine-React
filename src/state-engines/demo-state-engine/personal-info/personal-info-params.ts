import { BundledStateEngineGettersParams, bundleGetters } from "../../../state-engine/bundle-getters";
import { BundledStateEngineMutatorsArgs, bundleMutators } from "../../../state-engine/bundle-mutators";
import { DemoState, DemoGettersParams, DemoMutatorsArgs } from "../demo-state-engine";
import { PersonalInfoNameKey, PersonalInfoNameState, PersonalInfoNameKeyConst, initialPersonalInfoName, PersonalInfoNameMutatorsArgs, bundledPersonalInfoNameMutators, bundledPersonalInfoNameGetters, PersonalInfoNameGettersParams } from "./personal-info-name-params";

// Key

export const PersonalInfoKeyConst = "personalInfo";
export type PersonalInfoKey = typeof PersonalInfoKeyConst;

// State

export type PersonalInfoState = {
    [p in PersonalInfoNameKey]: PersonalInfoNameState;
}

export const initialPersonalInfo: PersonalInfoState = {
    [PersonalInfoNameKeyConst]: initialPersonalInfoName
}

// Mutators

export type PersonalInfoMutatorsArgs = BundledStateEngineMutatorsArgs<
    PersonalInfoNameMutatorsArgs,
    PersonalInfoNameKey
>

export const bundledPersonalInfoMutators = bundleMutators<
    PersonalInfoKey,
    DemoState,
    PersonalInfoMutatorsArgs,
    DemoGettersParams,
    DemoMutatorsArgs
>(PersonalInfoKeyConst, {
    ...bundledPersonalInfoNameMutators
});

// Getters

export type PersonalInfoGettersParams = {
    
} & BundledStateEngineGettersParams<
    PersonalInfoNameGettersParams,
    PersonalInfoNameKey
>;

export const bundledPersonalInfoGetters = bundleGetters<
    PersonalInfoKey,
    DemoState,
    DemoMutatorsArgs,
    PersonalInfoGettersParams,
    DemoGettersParams
>(PersonalInfoKeyConst, {
    ...bundledPersonalInfoNameGetters
});
