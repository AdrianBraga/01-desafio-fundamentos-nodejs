import { randomUUID } from "node:crypto";

import { Database } from './database.js';
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      
      const tasks = database.select('tasks', id);
      
      return res.end(JSON.stringify(tasks))
    },
  },
  {
    method: 'GET',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const tasks = database.select('tasks');

      return res.end(JSON.stringify(tasks))
    },
  },
  {
    method: 'POST',
    path: buildRoutePath('/tasks'),
    handler: (req, res) => {
      const {
        title,
        description
      } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    }
  },
]