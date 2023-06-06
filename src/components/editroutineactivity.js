import React, { useState, useEffect } from "react";
import axios from 'axios';

const EditRoutineActivity = (props) => {

    const durationArr = [...Array(100).keys()];
    const countArr = [...Array(100).keys()];
    const [activities, setActivities] = useState([]);

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

    return (
        <>

            <label htmlFor="activity">Activity: </label>
            <select value={props.activityToEdit.name} name="Activity" id="activity">
                {activities.map((activity, index) => {
                    return (<React.Fragment key={index}>
                        <option value={activity.name}>{activity.name}</option>
                    </React.Fragment>
                    )
                })}
            </select><br />
            <label htmlFor="count">Count:</label>
            <select value={props.activityToEdit.count} name="Count" id="count" >
                {countArr.map((count) => {
                    return (<React.Fragment key={count}>
                        <option value={count} >{count}</option>
                    </React.Fragment>
                    )
                })}
            </select><br />
            <label htmlFor="duration">Duration:</label>
            <select value={props.activityToEdit.duration} name="Duration" id="duration">
                {durationArr.map((duration) => {
                    return (<React.Fragment key={duration}>
                        <option value={duration}>{duration}</option>
                    </React.Fragment>
                    )
                })}
            </select><br />
            <button class="btn btn-dark">Save Activity</button>
            <button class="btn btn-dark" onClick={() => props.setRenderEditActivity()}>Cancel</button>
        </>
        
    )
}

export default EditRoutineActivity;