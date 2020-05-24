import React, {useEffect, useState} from 'react';
import './App.css';

function getRandomInt(max: number) {
    return Math.floor(Math.random() * Math.floor(max));
}

function App() {
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [showControl, setShowControl] = useState(true);
    const [switchFrequency, setSwitchFrequency] = useState(1000);
    const [intervalId, setIntervalId] = useState();
    const [leftPercentage, setLeftPercentage] = useState(50);

    function showLeftOrRight() {
        let randomInt = getRandomInt(100);
        if (randomInt < leftPercentage) {
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

    function changeSwitchFrequency(event: React.ChangeEvent<HTMLInputElement>) {
        setSwitchFrequency(Number(event.target.value));
    }

    return (
        <div className="App">
            {showControl?
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
                        min="1"
                        max="100"
                        value={leftPercentage.toString()}
                        onChange={(event) => {
                            setLeftPercentage(Number(event.target.value));
                        }}
                    />
                </div>
            </section>: null}
            <section>
                <label htmlFor="hide-control">Hide control</label>
                <input id="hide-control" type='checkbox' onChange={() =>{setShowControl(!showControl)}} />
            </section>
            <section id="display-area">
                <section>
                    {showLeft ? <span className="circle"/> : null}
                </section>
                <section>
                    {showRight ? <span className="circle"/> : null}
                </section>
            </section>
        </div>
    );
}

export default App;
