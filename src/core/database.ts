import sqlite, { DatabaseSync } from "node:sqlite";
import {  Result,  tryit } from "./result";

export const ERROR_CANT_OPEN = 14;

export type SqliteError = Error & {code:number} 

export type Database = sqlite.DatabaseSync | null;

const db: Database = null;

const filename: string | ":memory" = ":memory";

export type DbContext = {
  db: Database;
  filename: string | ":memory";
};

const context: DbContext = {
  db: null,
  filename: "",
};

export function getDbContext(): DbContext {
  return context;
}

export function getDb(): Database {
  return context.db;
}

export function createDb(filename: string = ":memory:"): Result<Database, "invalid-filename"> {
  const result = tryit<DatabaseSync, SqliteError>(() => new sqlite.DatabaseSync(filename));
  if (result.type === "err" && result.error.code === ERROR_CANT_OPEN) {
    return { type: "fail" };
  }

  context.db = result.value || context.db
  return result;
}

export function loadDb(filename: string): Database {
  const database = new sqlite.DatabaseSync(filename);
  context.db = database;
  context.filename = filename;
  return database;
}

export function createTable(tableName: string) {
  getDb()?.exec(`CREATE TABLE ${tableName} (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username TEXT UNIQUE NOT NULL,
    created_at TEXT NOT NULL DEFAULT current_timestamp
  ) STRICT;`);
}
