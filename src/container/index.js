import React, { useState } from 'react';
import Rover from '../Rover';
import RoverForm from '../RoverForm';

const App = () => {
    const [formData, setFormData] = useState({});
    const [replay, setReplay] = useState({ replayCounter: 0 });
    const onRoverFormSubmit = (values) => {
        setFormData(values);
        setReplay({ replayCounter: replay.replayCounter + 1 });
    };
    return (
        <div>
            <RoverForm moveRover={onRoverFormSubmit} />
            <Rover {...formData} replay={replay.replayCounter} />
        </div>
    );
};

export default App;
