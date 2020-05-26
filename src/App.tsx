import React, {useEffect, useState} from 'react';
import './App.css';
import ControlPanel from "./ControlPanel";
import Ball from "./Ball";
import {Spin} from "./Spin";
import {MoveDirection} from "./MoveDirection";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleLeft, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";

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
    const [showEarlyIndicator, setShowEarlyIndicator] = useState(true);

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

    const IndicatorIcon = styled(FontAwesomeIcon)`
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(0,0,0,1);
      transform: scale(1);
      animation: pulse ${switchFrequency}ms infinite;
    `;

    return (
        <div className="App">
            {showControl ?
                <ControlPanel
                    leftPercentage={leftPercentage}
                    setLeftPercentage={setLeftPercentage}
                    setSwitchFrequency={setSwitchFrequency}
                    switchFrequency={switchFrequency}
                    showEarlyIndicator={showEarlyIndicator}
                    setShowEarlyIndicator={setShowEarlyIndicator}
                />
                : null}
            <section>
                <label htmlFor="hide-control">Hide control</label>
                <input id="hide-control" type='checkbox' onChange={() => {
                    setShowControl(!showControl)
                }}/>
            </section>
            <section id="display__early-indicator">
                {
                    showEarlyIndicator ?
                        goLeft ?
                            <IndicatorIcon icon={faChevronCircleLeft}/> :
                            <IndicatorIcon icon={faChevronCircleRight}/> :
                        null
                }
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
