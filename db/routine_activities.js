const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const { rows: [ routineActivity ] } = await client.query(`
    INSERT INTO routine_activities("routineId", "activityId", count, duration)
    VALUES($1, $2, $3, $4) RETURNING *;
  `, [routineId, activityId, count, duration]);

  return routineActivity;

  } catch (error) {
    console.error('Failed to add activity to routine');
    throw error;
  }
}

async function getRoutineActivityById(id) {
  try {
    if(!id){
      return null;
    }
    const { rows: [routineActivity] } = await client.query(`
      SELECT routine_activities.* FROM routine_activities WHERE routine_activities.id = $1;
      `, [id]);

      return routineActivity;

  } catch(error){
    console.error('get routine activity by id error');
    throw error;
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
    try {
      if (!id) {
        return null;
      }
      const { rows: routineActivity } = await client.query(`
        SELECT routine_activities.* FROM routine_activities
        WHERE routine_activities."routineId"=$1;
        `, [id]);

        return routineActivity;

    } catch(error) {
      console.error ('get routineactivity by routine');
      throw error;
    }
}

async function updateRoutineActivity({ id, ...fields }) {
  try{
    const { rows: [activity] } = await client.query(`
      UPDATE routine_activities SET count = $2, duration = $3
      WHERE routine_activities."activityId" = $1 RETURNING *;
    `, [id, fields.count, fields.duration]);

    return activity;

  } catch(error){
    console.error('update routine activity error');
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    const {rows: [deletedActivity]} = await client.query (`
      DELETE FROM routine_activities WHERE id = ${id} RETURNING *;
    `);

    return deletedActivity;

  } catch (error) {
      console.error('destroy routine activity error');
      throw error;
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
    try{
      const {rows: [routineActivityEdit]} = await client.query(`
        SELECT routine_activities.*, routines."creatorId" FROM routine_activities
        JOIN routines ON routine_activities."routineId" = routines.id
        WHERE routine_activities."activityId" = ${routineActivityId} AND routines."creatorId" = ${userId};
      `)

      return routineActivityEdit;
      
    } catch(error){
        console.error('can edit routine activity error');
        throw error;
    }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity
};
