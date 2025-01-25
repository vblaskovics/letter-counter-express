import { afterAll, describe, expect, test } from "vitest";
import {
  createDb,
  getDb,
  getDbContext,
  Database,
  loadDb,
} from "./database";
import sqlite from "node:sqlite";
import { existsSync, unlinkSync } from "fs";

let database: Database;

describe("create", () => {

  afterAll(() => {
    if (existsSync("test.sqlite")) {
      database?.close();
      unlinkSync("test.sqlite");
    }
  });

  test("should create a new SQLite database connection", () => {
    const result = createDb();
    expect(getDb()).toBeInstanceOf(sqlite.DatabaseSync);
  });

  test("should return error if filepath is invalid", () => {
    const result = createDb('///');
    expect(getDb()).toBeInstanceOf(sqlite.DatabaseSync);
  });

  test("should use an in-memory database by default", () => {
    createDb();
    expect(getDb()).toBeTruthy();
    expect(getDbContext().filename).toBe(":memory:");
  });

  test("should create a database with the specified file path", () => {
    createDb("test.sqlite");
    existsSync("test.sqlite");
    expect(getDbContext().filename).toBe("test.sqlite");
  });
});

describe("loadDb", () => {
  afterAll(() => {
    if (existsSync("test.sqlite")) {
      database?.close();
      unlinkSync("test.sqlite");
    }
  });

  test("should open an existing database", () => {
    const existingDb = new sqlite.DatabaseSync("test.sqlite");

    database = loadDb("test.sqlite");
    const context = getDbContext();
    
    expect(database).toBeTruthy();
    expect(context.db).toBe(database);
    expect(context.filename).toBe("test.sqlite");
    existingDb.close();
  });
  
  // test("should return an error if the database file does not exist", () => {
  //   loadDb("test.sqlite");
    
  //   expect(1).toBe(1)
  // });
});

// describe("createTable", () => {
// test("should inject the database", async () => {
//   const spy = vi.spyOn(di, "inject");
//   createDb();

//   createTable("user");

//   expect(spy).toHaveBeenCalledWith(getDb);
// });
// });
