const express = require('express');
const { getRoutineById, getUserById } = require('../db');
const router = express.Router();
const { updateRoutineActivity, destroyRoutineActivity, getRoutineActivityById } = require('../db/routine_activities');
const { requireUser } = require('./util.js');

// PATCH /api/routine_activities/:routineActivityId
router.patch('/:routineActivityId', async (req, res, next) => {
    try{
        const routineActivityId = req.params;
        const fields = req.body;
        routineActivityId['id'] = routineActivityId['routineActivityId'];
        delete routineActivityId['routineActivityId'];
        const newObject = { ...routineActivityId, ...fields};
        const routineActivity = await updateRoutineActivity(newObject);
        res.send(routineActivity);
    } catch(error){
        next();
    }
})
// DELETE /api/routine_activities/:routineActivityId
router.delete('/:routineActivityId', async(req, res, next) => {
    //not passing kindda obvious lol
        try{
            const {routineActivityId} = req.params;
            const _routineActivity = await getRoutineActivityById(routineActivityId);
            const { routineId } = _routineActivity;
            const _routine = await getRoutineById(routineId);
            const { creatorId } = _routine; 
            const _user = await getUserById(creatorId);
            const { username } = _user;
            if(username != req.user.username){
                res.status(403);
                res.send({error: 'error', message: `User ${req.user.username} is not allowed to delete In the afternoon`, name: 'LoggedInUserIsNotOwner'});
                next();
            } else {
                const routine = await destroyRoutineActivity(routineActivityId);
                res.send(routine);
            }
    } catch(error){
        next();
    }
})
module.exports = router;
