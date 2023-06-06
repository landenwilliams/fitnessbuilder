import React, { useState, useEffect } from "react";
import axios from 'axios';

const AddRoutineActivity = (props) => {
    const durationArr = [...Array(100).keys()];
    const countArr = [...Array(100).keys()];
    const [activities, setActivities] = useState([]);
    const [newActivity, setNewActivity] = useState({});
    const token = window.localStorage.getItem('token');

    const onChangeActivities = (event, activity) => {
        if (event.target.name === activity) {
            setNewActivity({ ...newActivity, activityId: event.target.value });
        } else if (event.target.name === "Count") {
            setNewActivity({ ...newActivity, count: event.target.value });
        } else if (event.target.name === "Duration") {
            setNewActivity({ ...newActivity, duration: event.target.value });
        }
       
    }

    const getActivities = async () => {

        try {
            const response = await axios.get('/api/activities');

            setActivities(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
        getActivities();
    }, [])

    const addActivity = async () => {
        let routineId = props.routineActivityToAdd.id;
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }};
        let data = {...newActivity, routineId: routineId};
        try {
            const response = await axios.post(`/api/routines/${routineId}/activities`, data, axiosConfig);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    return (<>
   
        <label htmlFor="activity">Activity: </label>
        <select name="Activity" id="activity" onChange={(event) => onChangeActivities(event, activity.name)}>
            {activities.map((activity, index) => {
                return (<React.Fragment key={index}>
                    <option value={activity.id}>{activity.name}</option>
                </React.Fragment>
                )
            })}
        </select><br />
        <label htmlFor="count">Count:</label>
        <select name="Count" id="count" onChange={(event) => onChangeActivities(event, activity.name)}>
            {countArr.map((count) => {
                return (<React.Fragment key={count}>
                    <option value={count} >{count}</option>
                </React.Fragment>
                )
            })}
        </select><br />
        <label htmlFor="duration">Duration:</label>
        <select name="Duration" id="duration" onChange={(event) => onChangeActivities(event, activity.name)}>
            {durationArr.map((duration) => {
                return (<React.Fragment key={duration}>
                    <option value={duration}>{duration}</option>
                </React.Fragment>
                )
            })}
        </select><br />
        <button class="btn btn-dark" onClick={() => addActivity()}>Add Activity</button>
        <button class="btn btn-dark" onClick={()=>props.setRenderAddActivity(false)}>Cancel</button><br/>
    </>
    )
}

export default AddRoutineActivity;