import { useContext } from "react";
import { DemoStateEngine } from "../state-engines/demo-state-engine/demo-state-engine";

export function DemoStateDisplay() {
    const TestEngine = useContext(DemoStateEngine.context);

    return <div>
        <p>{TestEngine.get("personalInfo.name.full")}</p>
        <p>{TestEngine.get("colors.background")}</p>
    </div>
}
