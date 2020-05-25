import React from "react";
import "./Ball.css";
import {Spin} from "./Spin";
import {MoveDirection} from "./MoveDirection";

interface BallProps {
    spin: Spin,
    moveDirection: MoveDirection
}

function Ball({spin, moveDirection}: BallProps) {
    return (
        <div className={`scene`}>
            <div>
                <div className="clip">
                    <div className={`container ${spin}__${moveDirection}`}>

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
