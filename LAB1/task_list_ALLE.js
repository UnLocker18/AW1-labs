"use strict";
const dayjs = require('dayjs');
const sqlite = require('sqlite3');

function Task(id, desc, urgent = false, priv = true, deadline) {
    this.id = id;
    this.desc = desc;
    this.urgent = urgent;
    this.private = priv;
    this.deadline = ((!deadline) ? undefined : dayjs(deadline).format("YYYY-MM-DD"));

    this.toString = () => {
        return `
        ID: ${this.id}, Description: ${this.desc}, Urgent: ${this.urgent}, Private: ${this.private}${this.deadline ? ', Deadline: ' + dayjs(this.deadline).format("MMMM DD, YYYY HH:mm") : ""}` 
    };
}

function TaskList() {
    const db = new sqlite.Database('tasks.db', (err) => {if (err) throw err; });

    this.loadList = (newTask) => {
        return new Promise( (resolve, reject) => {
            const sql = "SELECT * FROM tasks"
            db.all(sql, [], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const list = rows.map( tsk => new Task(tsk.id, tsk.description, ((tsk.urgent) ? true : false), ((tsk.priv) ? true : false), tsk.deadline) );
                    resolve(list);
                }
            });
        } );
    }

    this.listaAfter = date => {
        return new Promise ( (resolve, reject) => {
            const sql = "SELECT * FROM tasks WHERE tasks.deadline > ?";
            db.all(sql, [date], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const afterList = rows.map( tsk => new Task(tsk.id, tsk.description, ((tsk.urgent) ? true : false), ((tsk.priv) ? true : false), tsk.deadline) );
                    resolve(afterList);
                }
            });
        } );
    }

    this.listSimilar = keyword => {
        return new Promise( (resolve, reject) => {
            const sql = "SELECT * FROM tasks WHERE tasks.description LIKE ?"
            const kw = "%" + keyword + "%";
            db.all(sql, [kw], (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    const similarList = rows.map( tsk => new Task(tsk.id, tsk.description, ((tsk.urgent) ? true : false), ((tsk.priv) ? true : false), tsk.deadline) );
                    resolve(similarList);
                }
            });
        } );
    }

    this.sortAndPrint = async () => {
        try {
            const tmpList = await this.loadList();
        } catch (err) {
            console.err(err);
            return;
        }

        /* Debug
        console.log(`${tmpList}`);
        console.log(typeof(tmpList[0].deadline));
        console.log(typeof(tmpList[1].deadline)); */

        tmpList.sort( (a, b) => { 
            if ((a.deadline) && (b.deadline)) {
                return dayjs(a.deadline).diff(b.deadline);
            } else if (!a.deadline) {
                return 1;
            } else {
                return -1;
            }
        } );

        tmpList.forEach(tsk => console.log(`${tsk}`));
    };

    this.filterAndPrint = async () => {
        try {
            const tmpList = await this.loadList();
        } catch (err) {
            console.error(err);
            return;
        }
        
        const filteredList = tmpList.filter( (tsk) => tsk.urgent == true );

        filteredList.forEach(tsk => console.log(`${tsk}`));
    };
}

const main = async () => {
    const taskList = new TaskList();

    try {
        const myTasks = await taskList.loadList();
        console.log(`${myTasks}`);
        console.log("Let's sort them")
        taskList.sortAndPrint();
    } catch (err) {
        console.error(err);
    }

    try {
        const tasksAfter = await taskList.listaAfter("2022-03-10");
        console.log(`${tasksAfter}`);
    } catch (err) {
        console.error(err);
    }

    try {
        const taskSimilar = await taskList.listSimilar("lab");
        console.log(`${taskSimilar}`);
    } catch (err) {
        console.error(err);
    }

    try {
        console.log("Urgent tasks:");
        taskList.filterAndPrint();
    } catch (err) {
        console.error(err);
    }
}

main();
