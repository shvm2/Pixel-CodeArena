import Docker from 'dockerode';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const docker = new Docker();

export const output = (req, res) => {
  const {code} = req.body;

  if (!code) {
    return res.status(400).send('No code provided');
  }

  const fileName = 'demo.cpp';
  const execName = 'demo';

  // Write the code to a new file
  fs.writeFile(fileName, code, (err) => {
    if (err) {
      console.error(`Error writing file: ${err.message}`);
      return res.status(500).send(`Error writing file: ${err.message}`);
    }

    const dockerCommand = `docker run --rm -v "${process.cwd()}":/usr/src/myapp -w /usr/src/myapp gcc:latest g++ -o ${execName} ${fileName}`;

    exec(dockerCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).send(`Error: ${error.message}`);
      }

      const execDockerCommand = `docker run --rm -v "${process.cwd()}":/usr/src/myapp -w /usr/src/myapp gcc:latest ./${execName}`;

      exec(execdockerCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`);
          return res.status(500).send(`Error: ${error.message}`);
        }
        if (stderr) {
          console.error(`Stderr: ${stderr}`);
          return res.status(500).send(`Stderr: ${stderr}`);
        }
        return res.send(`Output: ${stdout}`);
      });
    });
  });
};
