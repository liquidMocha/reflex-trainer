import React, {useEffect, useState} from 'react';
import './App.css';
import ControlPanel from "./ControlPanel";
import Ball from "./Ball";

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

function App() {
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [showControl, setShowControl] = useState(true);
    const [switchFrequency, setSwitchFrequency] = useState(2000);
    const [intervalId, setIntervalId] = useState();
    const [leftPercentage, setLeftPercentage] = useState(50);

    function showLeftOrRight() {
        let randomInt = getRandomInt(100);
        if (randomInt >= leftPercentage) {
            setShowLeft(true);
            setShowRight(false);
        } else {
            setShowLeft(false);
            setShowRight(true);
        }

        setTimeout(() => {
            setShowLeft(false);
            setShowRight(false);
        }, switchFrequency * 0.7);
    }

    useEffect(() => {
        clearInterval(intervalId);
        setIntervalId(setInterval(() => {
            showLeftOrRight();
        }, switchFrequency));
    }, [switchFrequency, leftPercentage]);

    return (
        <div className="App">
            {showControl ?
                <ControlPanel
                    leftPercentage={leftPercentage}
                    setLeftPercentage={setLeftPercentage}
                    setSwitchFrequency={setSwitchFrequency}
                    switchFrequency={switchFrequency}
                />
                : null}
            <section>
                <label htmlFor="hide-control">Hide control</label>
                <input id="hide-control" type='checkbox' onChange={() => {
                    setShowControl(!showControl)
                }}/>
            </section>
            <section id="display-area" className={showLeft? "left":"right"}>
                {(showLeft||showRight)? <Ball/>:null}
            </section>
        </div>
    );
}

export default App;
