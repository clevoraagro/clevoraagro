import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

async function main() {
  try {
    const res = await pool.query(`UPDATE "Product" SET packaging = $1 WHERE id = $2 RETURNING *`, ['1 Liter', 13]);
    console.log('Product packaging updated successfully:', res.rows[0]);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}

main();
