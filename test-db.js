const Database = require('better-sqlite3');
const path = require('path');

function checkDb(filePath) {
  console.log(`Checking database at: ${filePath}`);
  try {
    const db = new Database(filePath);
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log('Tables found:', tables.map(t => t.name));
    if (tables.some(t => t.name === 'Product')) {
      const count = db.prepare("SELECT COUNT(*) as count FROM Product").get();
      console.log('Product count:', count.count);
    }
    db.close();
  } catch (err) {
    console.error('Error opening database:', err.message);
  }
}

checkDb(path.resolve(__dirname, 'dev.db'));
checkDb(path.resolve(__dirname, 'prisma/dev.db'));
