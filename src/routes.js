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
  {
    method: 'PUT',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;
      const { title, description } = req.body;
      
      if (!title || !description) {
        return res.writeHead(400).end(JSON.stringify({ 
          error: 'Title or desccription is required'
         }));
      };

      const task = database.select('tasks', id);

      if (id != task.id) {
        return res.writeHead(404).end(JSON.stringify({ 
          error: 'Id not found'
         }));
      };

      const updatedTask = database.update('tasks', id, {
        title,
        description,
        updated_at: new Date()
      });
      
      return res.end(JSON.stringify(updatedTask));
    },
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/tasks/:id'),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.select('tasks', id);

      if (id != task.id) {
        return res.writeHead(404).end(JSON.stringify({ 
          error: 'Id not found'
         }));
      };

      database.delete('tasks', id);

      return res.writeHead(204).end();
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;
      const { completed_at } = req.body;

      const task = database.select('tasks', id);

      if (id != task.id) {
        return res.writeHead(404).end(JSON.stringify({ 
          error: 'Id not found'
         }));
      };

      const updatedTask = database.update('tasks', id, {
        completed_at,
        updated_at: new Date()
      });
      
      return res.end(JSON.stringify(updatedTask));
    },
  },
]