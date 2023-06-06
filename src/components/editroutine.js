import React from "react";

const EditRoutine = (props) => {
    return (
        <>
            <div className="card-body">
                <input className="form-control" defaultValue={props.routineToEdit.name} name="routineName" ></input><br />
                <input className="form-control" defaultValue={props.routineToEdit.goal} name="goal" ></input><br /><br />
                <input type="checkbox" id="privateStatus" name="privateStatus" />
                <label htmlFor="privateStatus"> Public</label>
                <button class="btn btn-dark" onClick={() => props.setEditRoutine(false)}>Cancel</button>
                <button class="btn btn-dark">Save Routine</button>
                
            </div>
        </>
    )
}

export default EditRoutine;