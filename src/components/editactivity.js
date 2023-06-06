import React from "react";

const EditActivity = (props) => {
    return (<>
            <input class="form-control" defaultValue={props.activityToEdit.name} style={{ marginBottom: '2%' }} />
            <input class="form-control" defaultValue={props.activityToEdit.description} style={{ marginBottom: '2%' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                <button class="btn btn-dark" onClick={() => props.setRenderEditActivity(false)}>Cancel</button>
                <button class="btn btn-dark">Save Activity</button>
            </div >
    </>
    )
}

export default EditActivity;