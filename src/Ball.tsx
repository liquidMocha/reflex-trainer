import React from "react";
import "./Ball.css";
import {Spin} from "./Spin";
import {MoveDirection} from "./MoveDirection";
import styled from 'styled-components';

interface BallProps {
    spin: Spin,
    moveDirection: MoveDirection,
    roundTripTime: number
}

function Ball({spin, moveDirection, roundTripTime}: BallProps) {
    const screenHeight = window.screen.height;
    const BallContainer = styled.div`
    margin-left: auto;
    margin-right: auto;
    position: relative;
    width: 80px;
    height: 80px;
    transform-style: preserve-3d;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    
    offset-path: path('M20,20 L ${moveDirection === MoveDirection.LEFT ? "-200" : "200"} ${0.7* screenHeight}');
    animation: move ${roundTripTime / 2}ms infinite alternate ease-in-out,
    ${spin === Spin.TOP ? "top-spin" : "back-spin"} 1200ms infinite linear;
`;

    return (
        <div className={`scene`}>
            <div>
                <BallContainer>

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
                </BallContainer>
            </div>
        </div>
    )
}

export default Ball;
