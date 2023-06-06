const client = require("./client");
const {attachActivitiesToRoutines} = require("./activities.js");


async function createRoutine({ creatorId, isPublic, name, goal }) {

  try {

    const { rows: [routine] } = await client.query(`
      INSERT INTO routines("creatorId", "isPublic", name, goal)
      VALUES($1, $2, $3, $4)
      RETURNING *;
    `, [creatorId, isPublic, name, goal]);

    return routine;

  } catch (error) {

    console.error("Failed to create routine!")
    throw error;

  }
}

async function getRoutineById(id) {

  try {

    const { rows: [routine] } = await client.query(`
      SELECT routines.*
      FROM routines
      WHERE routines.id=$1`, [id]);

    if (!routine) {
      return null
    }
    return routine;
  } catch (error) {

    console.error('failed to find routine by id');
    throw error;

  }
}

async function getRoutinesWithoutActivities() {

  try {

    const { rows } = await client.query(`
      SELECT * FROM routines;
    `);
    return rows;
  } catch (error) {

    console.error('getroutineswithoutactiviers error');
    throw error;

  }
}

async function getAllRoutines() {

  try {
    
    const { rows: allRoutines } = await client.query(`
    
        SELECT  routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId"=users.id
        
    `);
      return attachActivitiesToRoutines(allRoutines);

  

  } catch (error) {

    console.error('getroutineswithoutactiviers error');
    throw error;

  }
}

async function getAllPublicRoutines() {

  try {

    const { rows: publicRoutines } = await client.query(`
        SELECT  routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId"=users.id
        WHERE routines."isPublic"=true;
      `);

      return attachActivitiesToRoutines(publicRoutines);

  } catch (error) {

    console.error('all public routines error');
    throw error;

  }

}
async function getAllRoutinesByUser({ username }) {
  try {

    if(!username){
      return;
    }

    const { rows: routinesByUser } = await client.query(`
        SELECT  routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId"=users.id
        WHERE users.username = $1;
    `, [username]);
    
    // console.log(routinesByUser);
    return attachActivitiesToRoutines(routinesByUser);

  } catch (error) {

    console.error('get routines by user error');
    throw error;

  }

}
async function getPublicRoutinesByUser({ username }) {
  try {

    if(!username){
      return;
    }

    const { rows: publicRoutinesByUser } = await client.query(`
        SELECT  routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId"=users.id
        WHERE users.username = $1 AND routines."isPublic"=true;
    `, [username]);
    
    return attachActivitiesToRoutines(publicRoutinesByUser);

  } catch (error) {

    console.error('get public routines by user error');
    throw error;

  }
 }

async function getPublicRoutinesByActivity({ id }) { 
  
  if(!id){
    return;
  }
  
  try {
    

    const { rows: publicRoutinesByActivity } = await client.query(`
        SELECT  routines.*, users.username AS "creatorName"
        FROM routines
        JOIN users ON routines."creatorId"=users.id
        JOIN routine_activities ON routine_activities."routineId" = routines.id
        WHERE routine_activities."activityId" = $1 AND routines."isPublic"=true;
    `, [id]);
    
    return attachActivitiesToRoutines(publicRoutinesByActivity);

  } catch (error) {

    console.error('get public routines by activity error');
    throw error;

  }
}

async function updateRoutine({ id, ...fields }) {

  try {
    
    const { rows: [ routine ] } = await client.query (`
      UPDATE routines 
      SET "isPublic" = coalesce($2, routines."isPublic"), 
      name = coalesce($3, routines.name), goal = coalesce($4, routines.goal)
      WHERE id = $1 RETURNING *;
    `, [id, fields.isPublic, fields.name, fields.goal])
    
    return routine;
    
  } catch (error) {
    console.error('update routine error');
    throw error;

  }
 }

async function destroyRoutine(id) {

  try {

    const { rows: routineActivities } = await client.query (`
      DELETE FROM routine_activities WHERE routine_activities."routineId" = ${id} RETURNING *;
    `);
    
    const {rows: routine}  = await client.query (`
      DELETE FROM routines WHERE routines.id = ${id} RETURNING *;
    `);

    
    return routine[0];
  
  } catch(error){
    console.error('destory routine error');
    throw error;
  }  
 }

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
