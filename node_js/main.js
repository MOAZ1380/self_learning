import inquirer from 'inquirer';
import fs from 'fs';
import { Command } from 'commander';

const program = new Command();

const questions = [
          {
              type: 'input',
              name: 'title',
              message: 'Enter the course title'
          },
          {
              type: 'number',
              name: 'price',
              message: 'Enter the course price'
          }
  ]

const writefunction = (file_name, content) => {
  fs.writeFile(file_name, JSON.stringify(content, null, 4), 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Course has been added');
  });
};

program
  .name('add_courses')
  .description('CLI to add courses')
  .version('2.8.0');

program.command('add')
  .alias('a')
  .description('Add a course')
  .action(() => {
    inquirer.prompt(questions).then((answers) => {
      if (fs.existsSync('courses.json')) {
        fs.readFile('courses.json', 'utf8', (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          const filecontent = JSON.parse(data);
          filecontent.push(answers);
          writefunction('courses.json', filecontent);
        });
      } else {
        writefunction('courses.json', [answers]);
      }
    });
  });

program.command('list')
  .alias('l')
  .description('List of courses')
  .action(() => {
    fs.readFile('courses.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      console.table(JSON.parse(data));
    });
  });

program.parse();
