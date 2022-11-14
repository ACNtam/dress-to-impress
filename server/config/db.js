import pgPromise from 'pg-promise';
 
// Create Database Connection
const pgp = pgPromise({});
 
const db = pgp('postgres://localhost:5432/fashion');
 
 
export default db;


//pg_dump -d fashion --column-inserts > db.sql 
// `npm install --save db-migrate`
// npm install --save db-migrate-pg
