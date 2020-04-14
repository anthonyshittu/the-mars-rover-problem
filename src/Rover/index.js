import React, { useState, useEffect, useMemo } from 'react';
import Proptypes from 'prop-types';
import './styles.scss';

const angleToDirection = {
    0: 'N',
    360: 'N',
    270: 'W',
    180: 'S',
    90: 'E'
};

const Rover = ({
    xGrid,
    yGrid,
    xAxis,
    yAxis,
    direction,
    moves = '',
    replay
}) => {
    let newXAxis = Number(xAxis);
    let newYAxis = Number(yAxis);
    const [gridList, setGridList] = useState([]);
    const [onTheMove, setOnTheMove] = useState(false);
    let degrees = 0;
    const moveList = moves.split('');
    const controlRover = (counter, newXAxis, newYAxis) => {
        if (counter < moveList.length) {
            const value = moveList[counter];
            let prevXAxis = newXAxis;
            let prevYAxis = newYAxis;
            setTimeout(() => {
                if (value === 'M') {
                    if (degrees === 270) {
                        newXAxis -= 1;
                    } else if (degrees === 180) {
                        newYAxis -= 1;
                    } else if (degrees === 90) {
                        newXAxis += 1;
                    } else {
                        newYAxis += 1;
                    }
                }
                if (value === 'R') {
                    if (degrees <= 270) {
                        degrees += 90;
                    } else if (degrees === 360) {
                        degrees = 90;
                    }
                }
                if (value === 'L') {
                    if (degrees === 360 || degrees === 0) {
                        degrees = 270;
                    } else if (degrees <= 270 && degrees !== 0) {
                        degrees -= 90;
                    }
                }

                const temp = { ...gridList };
                if (newXAxis === prevXAxis && newYAxis === prevYAxis) {
                    temp[newXAxis][`${newXAxis}-${newYAxis}`].direction =
            angleToDirection[degrees];
                } else {
                    if (newXAxis < 0 || newYAxis < 0 || newXAxis >= Number(xGrid) || newYAxis >= Number(yGrid)) {
                        temp[prevXAxis][`${prevXAxis}-${prevYAxis}`].type = -1;
                        setGridList(temp);
                        setOnTheMove(false);
                        return;
                    }
                    temp[prevXAxis][`${prevXAxis}-${prevYAxis}`].type = 1;
                    temp[newXAxis][`${newXAxis}-${newYAxis}`] = {
                        type: 2,
                        direction: angleToDirection[degrees]
                    };
                }
                setGridList(temp);
                counter++;
                controlRover(counter, newXAxis, newYAxis);
            }, 1000);
        } else {
            setOnTheMove(false);
        }
    };

    const renderBox = () => {
        const list = {};
        for (let i = 0; i < xGrid; i++) {
            list[i] = {};
            for (let j = 0; j < yGrid; j++) {
                list[i][`${i}-${j}`] = { type: 0, direction: null };
            }
        }

        return list;
    };

    const startControl = () => {
        setOnTheMove(true);
        const temp = { ...gridList };
        temp[newXAxis][`${newXAxis}-${newYAxis}`] = {
            type: 2,
            direction
        };
        setGridList(temp);
        controlRover(0, newXAxis, newYAxis);
    };

    useEffect(() => {
        setGridList(renderBox());
        setOnTheMove(false);
    }, [xGrid, yGrid, xAxis, yAxis, direction, moves]);

    useMemo(() => {
        if (
            (Object.keys(gridList).length > 0 && !onTheMove) ||
      (replay > 1 && !onTheMove)
        ) {
            startControl();
        }
    }, [gridList, replay]);

    return (
        <div className="wrapper">
            {Object.keys(gridList).map((v) => {
                return (
                    <div key={v} className="wrapper__col">
                        {Object.keys(gridList[v]).map((w) => {
                            const { type, direction } = gridList[v][w];
                            return (
                                <div
                                    key={`wrapper_box_${v}_${w}`}
                                    className={`
                        wrapper__box
                        ${
                                type === 2 ?
                                    'current' :
                                    `${
                                        type === 1 ?
                                            'prev' :
                                            `${type === -1 ? 'invalid' : 'box'}`
                                    }`
                                }
                      `}
                                >
                                    <span>{w}</span>
                                    {direction !== null && (
                                        <span>
                                            <i className={`wrapper__${direction}`} />
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default Rover;

Rover.propTypes = {
    xGrid: Proptypes.string,
    yGrid: Proptypes.string,
    xAxis: Proptypes.string,
    yAxis: Proptypes.string,
    direction: Proptypes.string,
    moves: Proptypes.string,
    replay: Proptypes.number
};

Rover.defaultTypes = {
    xGrid: '',
    yGrid: '',
    xAxis: '',
    yAxis: '',
    direction: '',
    moves: '',
    replay: 0
};
