import React, { useState, useEffect } from "react";
import AddRoutine from "./addroutine";
import EditRoutine from "./editroutine";
import axios from 'axios';
import AddRoutineActivity from "./addroutineactivity";
import EditRoutineActivity from "./editroutineactivity";
import ViewRoutine from "./viewroutine";

const MyRoutines = (props) => {
    const [myRoutines, setMyRoutines] = useState();
    const [routinesLoaded, setRoutinesLoaded] = useState(false);
    const token = window.localStorage.getItem('token');
    const [username, setUserName] = useState();
    const [addRoutine, setAddRoutine] = useState(false);
    const [editRoutine, setEditRoutine] = useState(false);
    const [viewRoutine, setViewRoutine] = useState(false);
    const [routineToEdit, setRoutineToEdit] = useState();
    const [routineIndex, setRoutineIndex] = useState();

    useEffect(() => {
        const fetchUserRoutines = async () => {
            try {
                const user = await axios.get('/api/users/me', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                setUserName(user.data.username);
                const routines = await axios.get(`/api/users/${user.data.username}/routines`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });
                setMyRoutines(routines.data);
                setRoutinesLoaded(true);
            } catch (err) {
                console.log(err);
            }
        }
        fetchUserRoutines();

    }, []);

  

    const editRoutineFunction = (routine, index) => {
        setEditRoutine(true);
        setRoutineIndex(index);
        setRoutineToEdit(routine);
    }

    const viewRoutineFunction = (routine, index) => {
        setViewRoutine(true);
        setRoutineIndex(index);
        setRoutineToEdit(routine);
    }

    return (<>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%', padding: '0%', margin: '0', paddingTop: '5%' }}>
            <div className="card text-bg-dark mb-3 text-center" style={{ opacity: '80%', width: '100%', height: '100%', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>

                {routinesLoaded ? <>

                    <div className="card-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <h5>{username}'s Routines</h5>
                        <a onClick={setAddRoutine}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-circle" viewBox="0 0 16 16">
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                            </svg>
                        </a>
                    </div>

                    {addRoutine ? <><AddRoutine setAddRoutine={setAddRoutine} /></> : <>
                        {editRoutine ? <React.Fragment><EditRoutine routineToEdit={routineToEdit} routineIndex={routineIndex} setEditRoutine={setEditRoutine} /></React.Fragment> : <React.Fragment>
                            {viewRoutine ? <React.Fragment><ViewRoutine routineToEdit={routineToEdit} routineIndex={routineIndex} setViewRoutine={setViewRoutine} /></React.Fragment> : <>
                                
                                        {
                                            myRoutines.map((routine, index) => {

                                                return (<React.Fragment key={index}>
                                                    <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center', width: '100%' }}>
                                                        {routine.name}
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
                                                            <a onClick={() => viewRoutineFunction(routine, index)}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '5px' }} width="20px" height="20px" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                                                </svg>
                                                            </a>
                                                            <a onClick={() => editRoutineFunction(routine, index)}>
                                                                <svg fill="white" height="18px" width="18px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                                                            </a>

                                                        </div>
                                                    </div>
                                                  
                                                </React.Fragment>)
                                            })
                                        }
                                    </>}
                               
                        </React.Fragment>}
                    </>}

                </> : <h1>routines loading..</h1>}

            </div>
        </div>

    </>)
}

export default MyRoutines;