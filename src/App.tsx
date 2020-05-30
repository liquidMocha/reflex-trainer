import React, {useEffect, useState} from 'react';
import './App.css';
import ControlPanel from "./ControlPanel";
import Ball from "./Ball";
import {Spin} from "./Spin";
import {MoveDirection} from "./MoveDirection";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronCircleLeft, faChevronCircleRight} from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";

const distributions = require('distributions');

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getMovingDirection(leftPercentage: number): boolean {
    let randomInt = getRandomInt(100);
    return randomInt >= leftPercentage;
}

function getSpinDirection(): Spin {
    if (getRandomInt(2) === 0) {
        return Spin.TOP;
    } else {
        return Spin.BACK;
    }
}

function getRandomTravelTimeAround(center: number): number {
    const normal = distributions.Normal(center, center * 0.2);
    let newTravelTime = normal.inv(Math.random());
    console.log('new travel time: ', newTravelTime);
    return newTravelTime;
}

function App() {
    const [goLeft, setGoLeft] = useState(false);
    const [showControl, setShowControl] = useState(true);
    const [userSetTravelTime, setUserSetTravelTime] = useState(1000);
    const [actualTravelTime, setActualTravelTime] = useState(userSetTravelTime);
    const [timeoutId, setTimeoutId] = useState();
    const [leftPercentage, setLeftPercentage] = useState(50);
    const [spinType, setSpinType] = useState(Spin.TOP);
    const [showEarlyIndicator, setShowEarlyIndicator] = useState(true);

    useEffect(() => {
        if(timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTravelTime = getRandomTravelTimeAround(userSetTravelTime);
        const newTimeout = setTimeout(() => {
            setGoLeft(getMovingDirection(leftPercentage));
            setSpinType(getSpinDirection());
            setActualTravelTime(newTravelTime);
        }, actualTravelTime);

        setTimeoutId(newTimeout);
    }, [userSetTravelTime, leftPercentage, actualTravelTime]);

    const IndicatorIcon = styled(FontAwesomeIcon)`
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(0,0,0,1);
      transform: scale(1);
      animation: pulse ${actualTravelTime}ms infinite;
      font-size: 3rem;
    `;

    return (
        <div className="App">
            {showControl ?
                <ControlPanel
                    leftPercentage={leftPercentage}
                    setLeftPercentage={setLeftPercentage}
                    setSwitchFrequency={setUserSetTravelTime}
                    switchFrequency={userSetTravelTime}
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
                      roundTripTime={actualTravelTime}/>
            </section>
        </div>
    );
}

export default App;
