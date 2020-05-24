import React, {useEffect, useState} from 'react';
import './App.css';

function App() {
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

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
        }, 700);
    }

    useEffect(() => {
        setInterval(() => {
            showLeftOrRight();
        }, 1000);
    }, []);

    return (
        <div className="App">
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
