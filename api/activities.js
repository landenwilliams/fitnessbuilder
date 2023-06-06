const express = require('express');
const router = express.Router();
const { getAllActivities, createActivity, getActivityByName, updateActivity, getActivityById } = require('../db/activities');


// GET /api/activities/:activityId/routines
router.get('/:activityId/routines', async (req, res, next) => {
    //no clue how to write this one
    try {
        // console.log('id:', req.params);
        const activityId = await req.params;
    } catch(error) {
        next();
    }
})
// GET /api/activities
router.get('/', async (req, res, next) => {
    try {
        const activities = await getAllActivities();
        res.send(activities);
    } catch (error) {
        console.log(error);
        next(error);
    }
})
// POST /api/activities
router.post('/', async (req, res, next) => {
    const _activity = await getActivityByName(req.body.name);

    if (_activity) {
        res.send({ error: 'error', message: 'An activity with name Push Ups already exists', name: 'ActivityPostFailed' });
    } else {
        try {
            const activity = await createActivity(req.body);
            res.send(activity);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
})
// PATCH /api/activities/:activityId
router.patch('/:activityId', async (req, res, next) => {

    const _activity = await getActivityById(req.params.activityId);
    const _activityName = await getActivityByName(req.body.name);

    if (!_activity) {
        res.send({error: 'error', message: `Activity ${req.params.activityId} not found`, name: 'ActivityNotFound'});
        next();
    } else if (_activityName){
        res.send({error: 'error', message: `An activity with name ${req.body.name} already exists`, name: 'ActivityNotFound'});
        next();
    } else {
        try {
            const id = await req.params;
            id['id'] = id['activityId'];
            delete id['activityId'];
            const fields = await req.body;
            const descriptionObj = await { ...id, ...fields };
            delete descriptionObj['name'];
            const nameObj = await { ...id, ...fields };
            delete nameObj['description'];
            const updateActName = await updateActivity(nameObj);
            const updateActDesc = await updateActivity(descriptionObj);
            const newActivity = await getActivityById(id.id);
            res.send(newActivity);
            next();

        } catch (error) {
            console.log(error);
            next(error);
        }
    }
})
module.exports = router;
