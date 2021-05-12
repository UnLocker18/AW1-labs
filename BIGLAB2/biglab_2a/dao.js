'use strict'

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

var isBetween = require('dayjs/plugin/isBetween')
var isToday = require('dayjs/plugin/isToday')

dayjs.extend(isToday);
dayjs.extend(isBetween);

const db = new sqlite.Database('tasks.db', (err) => { if(err) throw err; });

//get all tasks
exports.listTasks = () => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks';
        db.all(sql, (err, rows) => {
            if (err){ 
                reject(err); 
            }
            else{
                const tasks = rows.map( task => ({
                  id: task.id,
                  description: task.description,
                  important: task.important,
                  private: task.private,
                  deadline: task.deadline,
                  completed: task.completed,
                  user: task.user
                })
              );
                resolve(tasks);                       
            }
        })
    })
}

//get all tasks with a filter
exports.listFilteredTasks = (filterName) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks';
        db.all(sql, [], (err, rows) => {
            if (err){ 
                reject(err); 
            }
            else{
              if(rows === undefined) resolve({ error: 'Tasks not found in database'});
              else{
                const tasks = rows.map( task => (
                  {
                      id: task.id,
                      description: task.description,
                      important: task.important,
                      private: task.private,
                      deadline: task.deadline,
                      completed: task.completed,
                      user: task.user
                  })
              );
              const filteredTasks = applyFilter(filterName, tasks);
              if(filteredTasks === undefined) resolve({ error: 'Filter not valid' });
              else resolve(filteredTasks);      
              }
            }
        })
    })
}

const applyFilter = (selected, list) => {
    switch (selected) {

      case 'all':
        return list;

      case 'important':
        return list.filter(task => task.important);

      case 'today':
        return list.filter(task => {
          if (dayjs(task.deadline).isToday()) return true;
          else return false;
        });
  
      case 'next_7_days':
        return list.filter(task => {
          if (
              dayjs(task.deadline).isBetween(
              dayjs().startOf('d').add(1, 'day').subtract(1, 'minute'),
              dayjs().startOf('d').add(8, 'day')
            )
          )
            return true;
          else return false;
        });

      case 'private':
        return list.filter(task => task.private);

      case 'completed':
          return list.filter(task => task.completed);

      default:
        return undefined;
    }
};

//get a task with a specific id
exports.listTaskById = (taskId) =>{
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM tasks WHERE id = ?';
        db.get(sql, [taskId], (err, row) => {
            if(err){
                reject(err);
            }
            else{
                if(row == undefined){
                    resolve({error: 'Task not found in database'});
                }
                else{
                    const task = {
                        id: row.id,
                        description: row.description,
                        important: row.important,
                        private: row.private,
                        deadline: row.deadline,
                        completed: row.completed,
                        user: row.user
                    }
                    resolve(task);
                }
            }
        })
    })
        
}

//create a task
exports.insertTask = (task) => {
    const tasksId = listTasks().then(tasks => tasks.map(task => task.id));
    
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO tasks(id, description, important, private, deadline, completed, user) VALUES(?, ?, ?, ?, DATE(?), ?, ?)';
        db.run(sql, [Math.max(tasksId)+1, task.description, task.important, task.private, task.deadline, task.completed, task.user], (err) => {
            if(err){
                reject(err);
            }
            else{
                resolve(this.lastId);
            }
        } )
    })
}

//update task 
exports.updateTask = (task) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE tasks SET description = ? , important =? , private = ?, deadline = date(?), completed=  ?, user=? WHERE id = ?';
      db.run(sql, [task.description, task.important, task.private, task.deadline, task.completed, task.user, task.id],  (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  };

  //set a task as completed
  exports.completeTask = (taskId) => {
    return new Promise((resolve, reject) => {
      const sql = 'UPDATE tasks SET completed= ? WHERE id = ?';
      db.run(sql, [task.completed, task.id],  (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      });
    });
  };
  
  // delete an existing exam
  exports.deleteExam = (id) => {
    return new Promise((resolve, reject) => {
      const sql = 'DELETE FROM tasks WHERE id = ?';
      db.run(sql, [id], (err) => {
        if (err) {
          reject(err);
          return;
        } else
          resolve(null);
      });
    });
  }
