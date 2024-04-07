import { BundledStateEngineGettersParams, bundleGetters } from "../../state-engine/bundle-getters";
import { BundledStateEngineMutatorsArgs, bundleMutators } from "../../state-engine/bundle-mutators";
import { createStateEngine } from "../../state-engine/create-state-engine";
import { ColorsKey, ColorsState, ColorsMutatorsArgs, ColorsGettersParams, ColorsKeyConst, initialColors, bundledColorsMutators, bundledColorsGetters } from "./colors/colors-params";
import { PersonalInfoKey, PersonalInfoState, PersonalInfoMutatorsArgs, PersonalInfoGettersParams, PersonalInfoKeyConst, initialPersonalInfo, bundledPersonalInfoMutators, bundledPersonalInfoGetters } from "./personal-info/personal-info-params";

export type DemoState = {
    [p in PersonalInfoKey]: PersonalInfoState;
} & {
    [p in ColorsKey]: ColorsState;
}
export type DemoMutatorsArgs = BundledStateEngineMutatorsArgs<
    PersonalInfoMutatorsArgs,
    PersonalInfoKey
> & BundledStateEngineMutatorsArgs<
    ColorsMutatorsArgs,
    ColorsKey
>;
export type DemoGettersParams = BundledStateEngineGettersParams<
    PersonalInfoGettersParams,
    PersonalInfoKey
> & BundledStateEngineGettersParams<
    ColorsGettersParams,
    ColorsKey
>;

export const DemoStateEngine = createStateEngine<
    DemoState,
    DemoMutatorsArgs,
    DemoGettersParams
>(
    {
        [PersonalInfoKeyConst]: initialPersonalInfo,
        [ColorsKeyConst]: initialColors
    },
    {
        ...bundledPersonalInfoMutators,
        ...bundledColorsMutators
    },
    {
        ...bundledPersonalInfoGetters,
        ...bundledColorsGetters
    }
);
