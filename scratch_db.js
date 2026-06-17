const { Client } = require('pg');
require('dotenv').config();

const client = new Client({ connectionString: process.env.DATABASE_URL });

client.connect()
  .then(() => client.query('CREATE TABLE IF NOT EXISTS "Category" ( id SERIAL PRIMARY KEY, name TEXT UNIQUE NOT NULL, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP )'))
  .then(() => { 
    console.log('Table created'); 
    process.exit(0); 
  })
  .catch(e => { 
    console.error(e); 
    process.exit(1); 
  });
