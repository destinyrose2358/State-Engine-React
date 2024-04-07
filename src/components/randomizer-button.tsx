import { useContext } from "react";
import { DemoStateEngine } from "../state-engines/demo-state-engine/demo-state-engine";

export function RandomizerButton() {
    const TestEngine = useContext(DemoStateEngine.context);

    return <div
        style={{
            width: "20px",
            height: "20px",
            background: "black"
        }}
        onClick={() => {
            TestEngine
                .set("personalInfo.name.randomize")
                .set("colors.background.randomize")
                .store()
        }}
    />
}
