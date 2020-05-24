import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [switchFrequency, setSwitchFrequency] = useState(1000);
    const [intervalId, setIntervalId] = useState();

    function showLeftOrRight() {
        if (Math.floor(Math.random() * 2 % 2) === 0) {
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
    }, [switchFrequency]);

    return (
        <div className="App">
            <section>
                <label>Milliseconds before change: </label>
                <input
                    type="number"
                    onChange={(event) => {
                        setSwitchFrequency(Number(event.target.value));
                    }}
                />
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
