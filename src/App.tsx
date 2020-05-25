import React, {useEffect, useState} from 'react';
import './App.css';
import ControlPanel from "./ControlPanel";
import Ball from "./Ball";
import {Spin} from "./Spin";
import {MoveDirection} from "./MoveDirection";

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

function App() {
    const [goLeft, setGoLeft] = useState(false);
    const [showControl, setShowControl] = useState(true);
    const [switchFrequency, setSwitchFrequency] = useState(2000);
    const [intervalId, setIntervalId] = useState();
    const [leftPercentage, setLeftPercentage] = useState(50);
    const [spinType, setSpinType] = useState(Spin.TOP);

    function showLeftOrRight() {
        let randomInt = getRandomInt(100);
        if (randomInt >= leftPercentage) {
            setGoLeft(true);
        } else {
            setGoLeft(false);
        }

        if (getRandomInt(2) === 0) {
            setSpinType(Spin.TOP);
        } else {
            setSpinType(Spin.BACK);
        }
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
            <section id="display-area">
                <Ball spin={spinType}
                      moveDirection={goLeft ? MoveDirection.LEFT : MoveDirection.RIGHT}
                      roundTripTime={switchFrequency}/>
            </section>
        </div>
    );
}

export default App;
