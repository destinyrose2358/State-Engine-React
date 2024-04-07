import { PropsWithChildren, useContext } from "react";
import { DemoStateEngine } from "../state-engines/demo-state-engine/demo-state-engine";

export function Container(props: PropsWithChildren) {
    const { children } = props;
    const TestEngine = useContext(DemoStateEngine.context);

    return <div
        className="App"
        style={{
        background: TestEngine.state.colors.background
        }}
    >
        {
            children
        }
    </div>
}
