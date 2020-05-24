import React from "react";

interface ControlPanelProps {
    switchFrequency: number,
    setSwitchFrequency: Function,
    leftPercentage: number,
    setLeftPercentage: Function
}

function ControlPanel(props: ControlPanelProps) {
    function changeSwitchFrequency(event: React.ChangeEvent<HTMLInputElement>) {
        props.setSwitchFrequency(Number(event.target.value));
    }

    return (
        <section>
        <div>
            <label>Milliseconds each change: </label>
            <input
                value={props.switchFrequency}
                type="number"
                onChange={changeSwitchFrequency}
            />
        </div>
        <div>
            <label>left vs right ratio: </label>
            <input
                type="range"
                min="0"
                max="100"
                value={props.leftPercentage.toString()}
                onChange={(event) => {
                    props.setLeftPercentage(Number(event.target.value));
                }}
            />
        </div>
    </section>
    );
}

export default ControlPanel;
