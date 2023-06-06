const client = require('./client');

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    const { rows: [activity] } = await client.query(`
      INSERT INTO activities(name, description)
      VALUES($1, $2) 
      RETURNING *; 
      `, [name, description]);

    return activity;
  } catch (error) {
    console.error("Failed to create activity!");
    throw error;
  }
}

async function getAllActivities() {
  // select and return an array of all activities
  try {
    const { rows: activities } = await client.query(`
        SELECT * FROM activities;
    `);
    return activities;
  } catch (error) {
    console.error('getAllActivities error');
    throw error;
  }
}

async function getActivityById(id) {

  try {
    if (!id) {
      return null;
    };
    const { rows: [activityById] } = await client.query(`    
          SELECT * FROM activities WHERE id = $1;
          `, [id]);

    return activityById;

  } catch (error) {
    console.error('get activity by id error');
    throw error;
  }
}

async function getActivityByName(name) {

  try {
    if (!name) {
      return null;
    }
    const { rows: [activityByName] } = await client.query(`
      SELECT activities.* FROM activities WHERE activities.name = $1
      `, [name]);

    return activityByName;

  } catch (error) {
    console.error('get activity by name error');
    throw error;
  }
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {
  const routinesToReturn = [...routines];
  const binds = routines.map((_, index) => `$${index + 1}`).join(', ');
  const routineIds = routines.map(routine => routine.id);
  if (!routineIds?.length) return [];

  try {
    // get the activities, JOIN with routine_activities (so we can get a routineId), and only those that have those routine ids on the routine_activities join
    const { rows: activities } = await client.query(`
      SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities.id AS "routineActivityId", routine_activities."routineId"
      FROM activities 
      JOIN routine_activities ON routine_activities."activityId" = activities.id
      WHERE routine_activities."routineId" IN (${binds});
    `, routineIds);
    // loop over the routines
    for (const routine of routinesToReturn) {
      // filter the activities to only include those that have this routineId
      const activitiesToAdd = activities.filter(activity => activity.routineId === routine.id);
      // attach the activities to each single routine
      routine.activities = activitiesToAdd;
    }
    return routinesToReturn;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
  // do update the name and description
  // return the updated activity
  try {
    // console.log({id, ...fields});
    if (!fields.description) {
      const { rows: [updatedActivity] } = await client.query(`
        UPDATE activities SET name = $2 WHERE id = $1 RETURNING *;
      `, [id, fields.name])
      return updatedActivity;

    } else if (!fields.name) {
      const { rows: [updatedActivity] } = await client.query(`
        UPDATE activities SET description = $2 WHERE id = $1 RETURNING *;
    `, [id, fields.description])
      return updatedActivity;
    } 
 


  
  } catch (error) {
  console.error('update routine error');
  throw error;
}
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
