const express = require('express');
const { de } = require('faker/lib/locales');
const { getActivityById } = require('../db');
const router = express.Router();
const { getAllPublicRoutines, createRoutine, destroyRoutine, getRoutineById, updateRoutine } = require('../db/routines');
const { addActivityToRoutine, getRoutineActivitiesByRoutine } = require('../db/routine_activities');
const { requireUser } = require('./util.js');
const jwt = require('jsonwebtoken');
// GET /api/routines
router.get('/', async (req, res, next) => {

    try {
        const routines = await getAllPublicRoutines();
        res.send(routines);

    } catch (error) {
        next({ error: error });
    }

});

// POST /api/routines
router.post('/', requireUser, async (req, res, next) => {
    try {
        const routine = await req.body;
        const user = await req.user;
        user['creatorId'] = user['id'];
        const newObject = await { ...user, ...routine };
        const newRoutine = await createRoutine(newObject);
        res.send(newRoutine);

    } catch (error) {
        next({ error: error });
    }
})
// PATCH /api/routines/:routineId
router.patch('/:routineId', requireUser, async (req, res, next) => {
    try {
        const { name, isPublic, goal } = req.body;
        const { routineId } = req.params;
        const routineToUpdate = await getRoutineById(routineId);

        if (!routineToUpdate) {
            next()
        } else if (req.user.id !== routineToUpdate.creatorId) {
            res.status(403);
            res.send({ error: 'error', name: "WrongUserError", message: `User ${req.user.username} is not allowed to update Every day` });
            next();
        } else {
            const updatedRoutine = await updateRoutine({ id: routineId, name, isPublic, goal });
            res.send(updatedRoutine);
            next();
        }
    } catch (error) {
        next({ error: error });
    }

})
// DELETE /api/routines/:routineId
router.delete('/:routineId', async (req, res, next) => {
    const { routineId } = req.params;
    const routine = await getRoutineById(routineId);
    // if (routine.creatorId === req.user.id) {
    try {

        const deletedRoutine = await destroyRoutine(routineId);
        res.send(deletedRoutine);
        next();

    } catch (error) {
        next({ error: error });
    }
    // } else {
    //     res.status(403);
    //     res.send({ error: 'error', message: `User ${req.user.username} is not allowed to delete On even days`, name: "error in destroy Routine" });
    //     next();
    // } //only needed for boiler tests, delete button is only accessed by logged in user on front end
})
// POST /api/routines/:routineId/activities
router.post('/:routineId/activities', async (req, res, next) => {

    const { activityId } = req.body;
    const { routineId } = req.params;
    const _routineActivities = await getRoutineActivitiesByRoutine({ id: routineId });
    const filterRoutines = _routineActivities && _routineActivities.filter(routineActivity => routineActivity.activityId = activityId);
    if (filterRoutines && filterRoutines.length) {
        res.send({ error: 'error', message: `Activity ID ${activityId} already exists in Routine ID ${routineId}`, name: "filter error" });
        next();
    } else {
        const routineActivity = await addActivityToRoutine(req.body);
        if (routineActivity) {
            res.send(routineActivity);
        } else {

            next();
        }

    }
})
module.exports = router;
