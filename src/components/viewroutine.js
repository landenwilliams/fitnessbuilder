import React, { useState, useEffect } from "react";
import axios from "axios";
import AddRoutineActivity from "./addroutineactivity";
import EditRoutineActivity from "./editroutineactivity";

const ViewRoutine = (props) => {

    const [renderAddActivity, setRenderAddActivity] = useState(false);
    const [renderEditActivity, setRenderEditActivity] = useState(false);
    const [activityToEdit, setActivityToEdit] = useState();
    const [routineActivityToAdd, setRoutineActivityToAdd] = useState();

    const deleteRoutine = async (routineId) => {
        try {
            const deletedRoutine = await axios.delete(`/api/routines/${routineId}`);
            location.reload();

        } catch (err) {
            console.log(err);
        }
    }

    const editActivityFunction = (activity, routine) => {

        setActivityToEdit(activity);
        setRenderEditActivity(true);
    }

    const addActivityFunction = (routine) => {
        setRoutineActivityToAdd(routine);
        setRenderAddActivity(true);

    }

    console.log(props.routineToEdit)
    return (
        <>
            <div className="card-header text-bg-dark" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                <a onClick={() => props.setViewRoutine(false)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-arrow-left-circle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                    </svg>
                </a>
                <h6>{props.routineToEdit.name}</h6>
                <a style={{ color: 'white' }} onClick={() => deleteRoutine(props.routineToEdit.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-file-earmark-x" viewBox="0 0 16 16">
                        <path d="M6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146z" />
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z" />
                    </svg>
                </a>

            </div>
            <div className="card-body overflow-scroll" style={{width: '100%'}} >
                <ul className="list-group list-group-flush" style={{width: '100%'}}>
                    <li className="list-group-item text-bg-dark" style={{ backgroundColor: 'transparent', textAlign: 'left', width: '100%' }} >Goal: {props.routineToEdit.goal}</li>
                    <div className="card-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <h6>Activities:</h6>
                        <a onClick={() => addActivityFunction(props.routineToEdit)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </a>
                    </div>
                    {renderAddActivity ? <React.Fragment><AddRoutineActivity setRenderAddActivity={setRenderAddActivity} routineActivityToAdd={routineActivityToAdd} /></React.Fragment> : <>
                        {renderEditActivity ? <><EditRoutineActivity setRenderEditActivity={setRenderEditActivity} activityToEdit={activityToEdit} /></> : <>

                            <li className="list-group-item text-bg-dark" >{props.routineToEdit.activities.map((activities, index) => {
                                return <div className="list-group-item text-bg-dark" key={index} >
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                                        <a onClick={() => editActivityFunction(activities)}>
                                            <svg fill="white" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                                        </a>
                                    </div>
                                    <div style={{ textAlign: 'left' }}>
                                        <h6>Name: {activities.name}</h6>
                                        <h6>Count: {activities.count}</h6>
                                        <h6>Duration: {activities.duration}</h6>
                                        <h6>Description: {activities.description}</h6>
                                    </div>

                                </div>

                            })}
                            </li>
                        </>}
                    </>}

                </ul>

            </div>
        </>
    )
}

export default ViewRoutine;