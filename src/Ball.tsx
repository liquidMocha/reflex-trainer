import React from "react";
import "./Ball.css";
import {Spin} from "./Spin";

interface BallProps {
    spin: Spin
}

function Ball({spin}: BallProps) {
    return (
        <div className="scene">
            <div className="light">
                <div className="clip">
                    <div className={`container ${spin}`}>

                        <div className="circle border"/>
                        <div className="circle border"/>
                        <div className="circle border"/>
                        <div className="circle border"/>
                        <div className="circle border"/>

                        <div className="circle border"/>
                        <div className="circle border"/>
                        <div className="circle border"/>
                        <div className="circle border"/>
                        <div className="circle border"/>

                        <div className="circle"/>
                        <div className="circle"/>
                        <div className="circle"/>
                        <div className="circle"/>
                        <div className="circle"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ball;
