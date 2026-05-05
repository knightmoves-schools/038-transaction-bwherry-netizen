const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

function runScript(db, script) {
  const sql = fs.readFileSync(script, 'utf8');
  return new Promise((resolve, reject) => {
    db.exec(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const getFromStores = (db) => {
  const sql = `SELECT * FROM STORES WHERE ID = 1`;
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const getFromEmployee = (db) => {
  const sql = `SELECT * FROM Employee WHERE ID = 1050`;
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const getFromContactInfo = (db) => {
  const sql = `SELECT * FROM Contact_Info WHERE ID = 1050`;
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

const getFromGrocery = (db) => {
  const sql = `SELECT * FROM Grocery WHERE ID IN (8, 14, 17)`;
  return new Promise((resolve, reject) => {
    db.all(sql, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

describe('the SQL in the `exercise.sql` file', () => {
  let db;
  let sql;
  let cleanup;
  let sqlContent;
  const beginRegex = /BEGIN *(TRANSACTION)*;/gi;
  const commitRegex = /COMMIT *(TRANSACTION)*;/gi;

  beforeAll(async () => {
    const filePath = path.join(__dirname, '/../exercise.sql');
    sqlContent = fs.readFileSync(filePath, {encoding: 'utf-8'}, function(data){
      return data;
    });

    const dbPath = path.resolve(__dirname, '..', 'lesson38.db');
    db = new sqlite3.Database(dbPath);
    sql = path.resolve(__dirname, '..', 'exercise.sql');
    cleanup = path.resolve(__dirname, './cleanup.sql');

    await runScript(db, cleanup);
    await runScript(db, sql);
  });

  afterAll(async () => {
    await runScript(db, cleanup);
    db.close();
  });

  it('Should begin and commit a transaction within exercise.sql', async () => {
    console.log(sqlContent);
    hasBegin = sqlContent.match(beginRegex);
    hasCommit = sqlContent.match(commitRegex);
    console.log(hasBegin);
    expect(hasBegin).toBeTruthy();
    expect(hasCommit).toBeTruthy();
  });

  it('Should make insert into stores with ID 1', async () => {
    const store = await getFromStores(db);
    const areNoNulls = Object.values(store[0]).every(x => x !== null);
    
    expect(store).toBeTruthy();
    expect(areNoNulls).toBe(true);
  });

  it('Should make insert into Employee with ID 1050', async () => {
    const employee = await getFromEmployee(db);
    const areNoNulls = Object.values(employee[0]).every(x => x !== null);
    
    expect(employee).toBeTruthy();
    expect(areNoNulls).toBe(true);
  });

  it('Should make insert into contact_info with ID 1050', async () => {
    const contactInfo = await getFromContactInfo(db);
    const areNoNulls = Object.values(contactInfo[0]).every(x => x !== null);
    
    expect(contactInfo).toBeTruthy();
    expect(areNoNulls).toBe(true);
  });

  it('Should update grocery as described in readme', async () => {
    const groceries = await getFromGrocery(db);
    groceries.forEach((grocery) => {
      expect(grocery.NEXT_EXPIRE_DATE).toBe(new Date().toJSON().slice(0, 10))
    })
  });
});
