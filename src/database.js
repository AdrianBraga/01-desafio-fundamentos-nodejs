import fs from 'node:fs/promises';

const dataBasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(dataBasePath, 'utf-8').then(data => {
      this.#database = JSON.parse(data);
    })
    .catch(() => {
      this.#persist();
    });
  }

  #persist() {
    fs.writeFile(dataBasePath, JSON.stringify(this.#database));
  }

  select(table, id) {
    let data = this.#database[table] ?? [];

    const rowIndex = this.#database[table].findIndex(row => row.id == id);

    if (rowIndex > -1) {
      const getTask = this.#database[table][rowIndex]
      return getTask
    }
    
    return data
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }
}

// export class Database extends BaseDatabase {
//   select(table) {
//     const data = this.#database[table] ?? []
//   }
// }