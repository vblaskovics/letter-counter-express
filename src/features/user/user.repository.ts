import { createTable as createTableFn } from "../../core/database";
import { inject } from "../../core/di";

const createTable = inject(createTableFn)

function createUserTable() {
  createTable
}