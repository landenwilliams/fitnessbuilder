import React, { useState, useEffect } from "react";
import axios from 'axios';
import AddRoutineActivity from "./addroutineactivity";

const AddRoutine = (props) => {

    const [routineName, setRoutineName] = useState('');
    const [routineGoal, setRoutineGoal] = useState('');
    const [isPublic, setIsPublic] = useState(false);
    const [newActivity, setNewActivity] = useState({});
    const token = window.localStorage.getItem('token');

    const onChange = (event) => {

        if (event.target.name === 'routineName') {
            setRoutineName(event.target.value);
        } else if (event.target.name === 'goal') {
            setRoutineGoal(event.target.value);
        } else if (event.target.name === 'privateStatus' && isPublic === false) {
            setIsPublic(true);
        } else if (event.target.name === 'privateStatus' && isPublic === true) {
            setIsPublic(false);
        } else if (event.target.name === activity.name) {
            console.log(activity.name);
            console.log(event.target.value);
        }
    }

    const onChangeActivities = (event, activity) => {
        if (event.target.name === activity) {
            setNewActivity({ ...newActivity, activityId: event.target.value });
        } else if (event.target.name === "Count") {
            setNewActivity({ ...newActivity, count: event.target.value });
        } else if (event.target.name === "Duration") {
            setNewActivity({ ...newActivity, duration: event.target.value });
        }
    }

    const addRoutine = async () => {
        let name = routineName;
        let goal = routineGoal;
        let data = { 'isPublic': isPublic, "name": name, "goal": goal };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };

        try {

            const response = await axios.post('/api/routines', data, axiosConfig);
            console.log(response);
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <React.Fragment>
            <div className="card-body">
                <input className="form-control" placeholder="Routine Name" name="routineName" onChange={onChange}></input><br />
                <input className="form-control" placeholder="Goal" name="goal" onChange={onChange}></input><br /><br />
                <input type="checkbox" id="privateStatus" name="privateStatus" onChange={onChange} />
                <label htmlFor="privateStatus"> Public</label>
                <button class="btn btn-dark" onClick={() => props.setAddRoutine(false)}>Cancel</button>
                <button class="btn btn-dark" onClick={() => addRoutine()}>Add Routine</button>
                
            </div>
        </React.Fragment>
    )
}

export default AddRoutine;