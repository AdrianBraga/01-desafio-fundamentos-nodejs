import fs from 'node:fs'
import { parse } from 'csv-parse';

const fileTaskCsv = 'streams/tasks.csv';

async function run() {
  const readTask = fs.createReadStream(fileTaskCsv)
  .pipe(parse({
    delimiter: ',',
    skip_empty_lines: true,
    fromLine: 2
  }));

  for await (const task of readTask) {
    const [title, desccription] = task

    fetch('http://localhost:3333/tasks', {
      method: 'POST',
      body: JSON.stringify({
        title,
        desccription
      }),
    })

    // await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

run()