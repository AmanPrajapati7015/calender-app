require('dotenv').config();
const { Pool } = require('pg');


const pool = new Pool({
  connectionString: process.env.DB_CONNECTION_STRING
});


async function addUser(email) {
  const result = await pool.query('SELECT * FROM users_email where email=$1', [email]);
  if (result.rows.length == 0) {
    await pool.query('Insert into users_email Values ($1)', [email]);
    console.log('email added to table');
  }
  else {
    console.log('email already existed');
  }
}

async function getEvents(email) {
  const { rows } = await pool.query('SELECT * FROM events where owner_email=$1 order by start_datetime', [email]);
  return rows;
}

async function addEvent(email, evtData) {
  await pool.query('Insert into events (title, start_datetime, end_datetime, description, meeting_link, owner_email) Values ($1,$2,$3,$4,$5,$6)',
    [evtData.title, evtData.startDatetime, evtData.endDatetime, evtData.description, evtData.meetingLink, email]);
  console.log('event added');
}

async function removeEvent(email, id) {
  const { rows } = await pool.query('SELECT * FROM events where id=$1 AND owner_email =$2 ', [id, email]);
  if (rows.length!=0){
    await pool.query('DELETE FROM events where id=$1',[id]);
    console.log('event deleted');
    return true;
  }
  else{
    console.log('unauthorized access');
    return false;
  }
}

async function updateEvent(evtData, id, email) {
  const { rows } = await pool.query('SELECT * FROM events where id=$1 AND owner_email = $2 ', [id, email]);
  if (rows.length!=0){
    await pool.query('UPDATE events SET title = $1, start_datetime = $2, end_datetime=$3, description=$4, meeting_link=$5 WHERE id=$6',
      [evtData.title, evtData.startDatetime, evtData.endDatetime, evtData.description, evtData.meetingLink, id]);
    console.log('event updated');
    console.log(evtData);
    
    return true;
  }
  else{
    console.log('unauthorized access');
    return false;
  }
}



module.exports = { addUser, getEvents, addEvent, removeEvent,updateEvent  };