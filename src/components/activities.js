import React, { useState, useEffect } from "react";
import axios from 'axios';
import AddActivity from "./addactivity";
import EditActivity from "./editactivity";


const Activities = () => {
    const [activities, setActivities] = useState([]);
    const [renderAddActivity, setRenderAddActivity] = useState(false);
    const [renderEditActivity, setRenderEditActivity] = useState(false);
    const [activityToEdit, setActivityToEdit] = useState();
    const [displayActivities, setDisplayActivities] = useState(false);

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

    const renderEdit = (activity, index) => {
        setRenderEditActivity(true);
        setActivityToEdit(activity);
    }

    return (
        <>

            <div className="container " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%', padding: '0%', margin: '0', paddingTop: '5%' }}>
                <div className="card text-bg-dark mb-3 text-center" style={{ opacity: '80%', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                    <div className="card-header" style={{ marginTop: '20%' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width='70px' height='70px' fill='white' class="bi bi-activity" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 2a.5.5 0 0 1 .47.33L10 12.036l1.53-4.208A.5.5 0 0 1 12 7.5h3.5a.5.5 0 0 1 0 1h-3.15l-1.88 5.17a.5.5 0 0 1-.94 0L6 3.964 4.47 8.171A.5.5 0 0 1 4 8.5H.5a.5.5 0 0 1 0-1h3.15l1.88-5.17A.5.5 0 0 1 6 2Z" />
                        </svg>
                    </div>
                    <div className="card-body">
                        <h1>Activities</h1>
                        {renderAddActivity ? <><AddActivity setRenderAddActivity={setRenderAddActivity} /></> : <>
                            <div className="card-body" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                                <a onClick={setRenderAddActivity}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                    </svg>
                                </a><br />
                                {displayActivities ? null : <>
                                    <a onClick={() => { setDisplayActivities(true) }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z" />
                                        </svg>
                                    </a>
                                </>}
                            </div>

                        </>}

                    </div>

                    {displayActivities ? <>
                        <div className=" card-body overflow-scroll" style={{ padding: '0', marginTop: '-5%' }}>
                            {renderEditActivity ? <><EditActivity activityToEdit={activityToEdit} setRenderEditActivity={setRenderEditActivity} /></> : <>
                                {
                                    activities.map((activity, index) => {
                                        return (
                                            <div key={index} className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', flexDirection: 'column', padding: '0', margin: '0' }}>

                                                <div className="card-body" style={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
                                                    <a onClick={() => renderEdit(activity, index)} >
                                                        <svg fill="white" height="16px" width="16px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                                                    </a>
                                                </div>
                                                <div className="card-body">

                                                    Activity: {activity.name}

                                                </div>
                                                <div className="card-body" style={{ padding: '0' }}>
                                                    <p>Description: {activity.description}</p>


                                                </div>


                                            </div>



                                        )
                                    })
                                }
                            </>}

                        </div>
                        <div className="card-footer">
                            <a onClick={() => { setDisplayActivities(false) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-up-circle" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z" />
                                </svg>
                            </a>
                        </div>
                    </> : null}

                </div>

            </div >
        </>

    )
}

export default Activities;