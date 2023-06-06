import React, { useState, useEffect } from "react";
import axios from 'axios';

const Routines = () => {
    const [routines, setRoutines] = useState([]);

    const getRoutines = async () => {
        try {
            const response = await axios.get('/api/routines');
            setRoutines(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getRoutines();
    }, [])

    return (



        <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">

                <div class="carousel-item active">
                    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%', padding: '0%', margin: '0', paddingTop: '5%' }}>
                        <div className="card text-bg-dark mb-3 text-center" style={{ opacity: '80%', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div className="card-header" style={{ marginTop: '20%' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width='70px' height='70px' fill='white' viewBox="0 0 448 512"><path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" /></svg>

                            </div>
                            <div className="card-body" >
                                <h1>Routines</h1><br/><br/><br/>
                            
                                {/* <svg xmlns="http://www.w3.org/2000/svg" style={{marginTop: '35%'}} width="30" height="30" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg> */}
                                <p>Explore Our Public Routines</p>
                            </div>
                        </div>
                    </div>
                </div>

                {
                    routines.map((routine, index) => {
                        return <React.Fragment key={index}>
                            <div class="carousel-item" >
                                <div className="container " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', height: '100%', padding: '0', paddingTop: '5%' }}>
                                    <div className="card text-bg-dark mb-3 overflow-scroll" style={{ opacity: '80%', width: '100%', height: '100%' }}>
                                        <div className="card-header" >
                                            {routine.name}
                                        </div>
                                        <div className='card-body' >
                                            <ul className="list-group list-group-flush" style={{ backgroundColor: 'transparent', color: 'white' }}>
                                                <li className="list-group-item " style={{ backgroundColor: 'transparent', color: 'white' }}>Author: {routine.creatorName}</li>
                                                <li className="list-group-item" style={{ backgroundColor: 'transparent', color: 'white' }}>Goal: {routine.goal}</li>
                                                <div className="card-header" key={index}> Activities </div>
                                                <div className="card-body">
                                                    {routine.activities.map((activities, index) => {
                                                        return <React.Fragment key={index} >
                                                            <li className="list-group-item" style={{ backgroundColor: 'transparent', color: 'white' }} >
                                                                <h6>Name: {activities.name}</h6>
                                                                <h6>Count: {activities.count}</h6>
                                                                <h6>Duration: {activities.duration}</h6>
                                                                <h6>Description: {activities.description}</h6>
                                                            </li>
                                                        </React.Fragment>


                                                    })}

                                                </div>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </React.Fragment>
                    })
                }
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>

    )
}

export default Routines;