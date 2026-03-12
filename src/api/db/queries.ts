import { database } from './database';

export const insertFileQuery = `
INSERT INTO files (
  fieldname,
  originalname, 
  encoding, 
  mimetype, 
  destination, 
  filename,
  path, 
  size,
  file)
VALUES (
  @fieldname,
  @originalname, 
  @encoding, 
  @mimetype, 
  @destination, 
  @filename,
  @path, 
  @size,
  @file)
`;

export const insertUserQuery = `
INSERT INTO users (
  firstName, 
  lastName, 
  email, 
  country, 
  city,
  shippingAddress, 
  fileId,
  cardNumber, 
  cardholderName,
  cvv)
VALUES (
  @firstName, 
  @lastName, 
  @email, 
  @country, 
  @city,
  @shippingAddress,
  @fileId,
  @cardNumber, 
  @cardholderName,
  @cvv)
`;

const createFileStmt = database.prepare(insertFileQuery);

const createUserStmt = database.prepare(insertUserQuery);

const getUserByIdStmt = database.prepare(`SELECT * FROM users WHERE id = :id`);
const getUsers = database.prepare(`SELECT * FROM users`);
const getFiles = database.prepare(`SELECT * FROM files`);
const getFileByIdStmt = database.prepare(`SELECT * FROM files WHERE id = :id`);

export {
  createFileStmt,
  createUserStmt,
  getUserByIdStmt,
  getFileByIdStmt,
  getUsers,
  getFiles
};
