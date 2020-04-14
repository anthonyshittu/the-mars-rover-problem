import React, { useState } from 'react';
import Proptypes from 'prop-types';
import { useForm } from 'react-hook-form';
import './styles.scss';

const RoverForm = ({ moveRover }) => {
    const { handleSubmit, register } = useForm();
    const [selected, setMoves] = useState({ moves: '' });
    const addMove = (m) => {
        const newMove = `${selected.moves}${m}`;
        setMoves({ moves: newMove });
    };
    const clearMove = () => {
        setMoves({ moves: '' });
    };
    const undoMove = () => {
        const { moves } = selected;
        setMoves({ moves: moves.substring(0, moves.length - 1) });
    };
    return (
        <div>
            <form onSubmit={handleSubmit(moveRover)}>
                <label>Grid:</label>
                <input
                    ref={register}
                    type="number"
                    name="xGrid"
                    defaultValue="5"
                    min="1"
                    max="100"
                />
                <input
                    ref={register}
                    type="number"
                    name="yGrid"
                    defaultValue="5"
                    min="1"
                    max="100"
                />
                <br />
                <label>Starting point:</label>
                <input
                    ref={register}
                    type="number"
                    name="xAxis"
                    defaultValue="0"
                    min="0"
                    max="100"
                />
                <input
                    ref={register}
                    type="number"
                    name="yAxis"
                    defaultValue="0"
                    min="0"
                    max="100"
                />
                <input
                    type="text"
                    ref={register}
                    name="direction"
                    defaultValue="N"
                    minLength="1"
                    maxLength="1"
                    size="1"
                    pattern="(N|S|E|W)"
                />
                <br />
                <label>Moves:</label>
                <input type="button" value="Move" onClick={() => addMove('M')} />
                <input type="button" value="Left" onClick={() => addMove('L')} />
                <input type="button" value="Right" onClick={() => addMove('R')} />
                <input
                    type="text"
                    ref={register({
                        validate: (value) => value.length > 0
                    })}
                    name="moves"
                    minLength="1"
                    value={selected.moves}
                    readOnly
                />
                <input type="button" value="Undo" onClick={undoMove} />
                <input type="button" value="Clear All" onClick={clearMove} />
                <br />
                <br />
                <input type="submit" value="Move" />
            </form>
        </div>
    );
};

export default RoverForm;

RoverForm.propTypes = {
    moveRover: Proptypes.func.isRequired
};
