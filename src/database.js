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

  select(table) {
    const data = this.#database[table] ?? []

    return data
  }
}

// export class Database extends BaseDatabase {
//   select(table) {
//     const data = this.#database[table] ?? []
//   }
// }