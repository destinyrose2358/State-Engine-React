
// Keys

import { bundleGetters } from "../../../state-engine/bundle-getters";
import { bundleMutators } from "../../../state-engine/bundle-mutators";
import { DemoGettersParams, DemoMutatorsArgs, DemoState } from "../demo-state-engine";

export const PersonalInfoNameKeyConst = "name";
export type PersonalInfoNameKey = typeof PersonalInfoNameKeyConst;

// State

export type PersonalInfoNameState = {
    first: string;
    last: string;
}

export const initialPersonalInfoName: PersonalInfoNameState = {
    first: "Destiny",
    last: "Rose"
}

// Mutators

export type PersonalInfoNameMutatorsArgs = {
    first: [newName: string];
    last: [newName: string];
    randomize: [];
}

const FIRST_NAMES: string[] = [
    "Destiny",
    "Douglas",
    "Reggie",
    "Snark",
    "Greg",
    "Susy",
    "Sandra",
    "Caitlyn",
    "Stewart"
];

const LAST_NAMES: string[] = [
    "Rose",
    "Smith",
    "Samson",
    "Jackson"
];

export const bundledPersonalInfoNameMutators = bundleMutators<
    PersonalInfoNameKey,
    DemoState,
    PersonalInfoNameMutatorsArgs,
    DemoGettersParams,
    DemoMutatorsArgs
>(PersonalInfoNameKeyConst, {
    first: (newName) => (state) => {
        state.personalInfo.name.first = newName;
        return state;
    },
    last: (newName) => (state) => {
        state.personalInfo.name.last = newName;
        return state;
    },
    randomize: () => (_, stateEngine) => stateEngine
        .set(
            "personalInfo.name.first",
            FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)]
        )
        .set(
            "personalInfo.name.last",
            LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)]
        ).state
});

// Getters

export type PersonalInfoNameGettersParams = {
    first: {
        args: [],
        return: string;
    };
    last: {
        args: [],
        return: string;
    };
    full: {
        args: [],
        return: string;
    };
}

export const bundledPersonalInfoNameGetters = bundleGetters<
    PersonalInfoNameKey,
    DemoState,
    DemoMutatorsArgs,
    PersonalInfoNameGettersParams,
    DemoGettersParams
>(
    PersonalInfoNameKeyConst, {
        first: () => (state) => state.personalInfo.name.first,
        last: () => (state) => state.personalInfo.name.last,
        full: () => (_, stateEngine) => stateEngine.get("personalInfo.name.first") + " " + stateEngine.get("personalInfo.name.last")
    }
)
