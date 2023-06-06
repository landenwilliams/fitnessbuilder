import React from "react";

const AddActivity = (props) => {

    return (<>
        <input class="form-control" placeholder="Name" style={{ marginBottom: '2%' }} />
        <input class="form-control" placeholder="Description" style={{ marginBottom: '2%' }} />
        <div style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row'}}>
            <button class="btn btn-dark" onClick={() => props.setRenderAddActivity(false)}>Cancel</button>
            <button class="btn btn-dark">Add Activity</button>
        </div>
    </>
    )

}

export default AddActivity;