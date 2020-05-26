import React from "react";

interface ControlPanelProps {
    switchFrequency: number,
    setSwitchFrequency: Function,
    leftPercentage: number,
    setLeftPercentage: Function,
    showEarlyIndicator: boolean,
    setShowEarlyIndicator: Function
}

function ControlPanel(
    {
        leftPercentage,
        setLeftPercentage,
        setSwitchFrequency,
        switchFrequency,
        showEarlyIndicator,
        setShowEarlyIndicator
    }: ControlPanelProps) {

    function changeSwitchFrequency(event: React.ChangeEvent<HTMLInputElement>) {
        setSwitchFrequency(Number(event.target.value));
    }

    function toggleEarlyIndicator() {
        setShowEarlyIndicator(!showEarlyIndicator);
    }

    return (
        <section>
        <div>
            <label>Milliseconds each change: </label>
            <input
                value={switchFrequency}
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
                value={leftPercentage.toString()}
                onChange={(event) => {
                    setLeftPercentage(Number(event.target.value));
                }}
            />
        </div>
            <div>
                <label htmlFor="control-panel__early-indicator">show early indicator</label>
                <input
                    id="control-panel__early-indicator"
                    type="checkbox"
                    value={String(showEarlyIndicator)}
                    onChange={toggleEarlyIndicator}
                />
            </div>
    </section>
    );
}

export default ControlPanel;
