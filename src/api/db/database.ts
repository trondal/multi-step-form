import Database from 'better-sqlite3';

const database = new Database('./.sqlite'); //, { verbose: console.log });
database.exec('PRAGMA foreign_keys = ON;');

const initDatabase = `
CREATE TABLE IF NOT EXISTS files ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    fieldname TEXT NOT NULL, 
    originalname TEXT NOT NULL, 
    encoding TEXT NOT NULL, 
    mimetype TEXT NOT NULL, 
    destination TEXT NOT NULL, 
    filename TEXT NOT NULL, 
    path TEXT NOT NULL, 
    size INTEGER NOT NULL, 
    file BLOB NOT NULL
);

CREATE TABLE IF NOT EXISTS users ( 
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL,
    country TEXT NOT NULL,
    city TEXT NOT NULL,
    shippingAddress TEXT NOT NULL,
    fileId INTEGER NOT NULL REFERENCES files(id),
    cardNumber INTEGER NOT NULL,
    cardholderName TEXT NOT NULL,
    cvv INTEGER NOT NULL
);
`;

database.exec(initDatabase);

export { database };
