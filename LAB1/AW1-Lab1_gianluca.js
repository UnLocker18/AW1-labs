'use strict';

const dayjs = require('dayjs');
const sqlite3 = require('sqlite3');

function es0(array){
    array.forEach((string, index) => array[index] = ( (string.length < 2) ? '' : string.slice(0, 2) + string.slice(-2) ));
    console.log(array);
}

function Task(id, description, isUrgent, isPrivate, deadline){
    this.id = id;
    this.description = description;
    this.isUrgent = isUrgent || false;
    this.isPrivate = isPrivate || true;
    this.deadline = (deadline && dayjs(deadline).isValid()) ? dayjs(deadline) : undefined;

    this.toString = () => {
        const dateToPrint = this.deadline ? this.deadline.format('MMMM D, YYYY h:mm A') : '<not defined>';
        return `Id: ${this.id}, Description: ${this.description}, Urgent: ${this.isUrgent}, Private: ${this.isPrivate}, `+
            `Deadline: ${dateToPrint}`;
    };
}

function TaskList(){
    const db = new sqlite3.Database('tasks.db', (err) => { if(err) throw err; });

    this.list = [];
    this.add = (task) => {
        try {
            task.forEach(t => this.list.push(t));
        } catch {
            this.list.push(task);
        }
    };
    this.sortAndPrint = () => {
        const toPrint = this.list.sort( (t1, t2) => {
            if (t1.deadline && t2.deadline) return t1.deadline - t2.deadline;
            else if (t1.deadline) return -1;
            else return 1;
        });

        console.log('\n****** Tasks sorted by deadline (most recent first): ******');
        toPrint.forEach( (task) => console.log(task.toString()) );
        console.log('');
    };
    this.filterAndPrint = () => {
        const toPrint = this.list.filter( (task) => task.isUrgent );

        console.log('\n****** Tasks filtered (only urgent = true): ******');
        toPrint.forEach( (task) => console.log(task.toString()) );
        console.log('');
    };
    this.taskMapper = (rows) => rows.map(row => new Task(row.id, row.description, row.isUrgent, row.isPrivate, row.deadline));
    this.loadAll = () => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM tasks';
            
            db.all(sql, [], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const tasks = this.taskMapper(rows);
                    resolve(this.add(tasks));
                }
            });
        });
    };
    this.loadByDate = (date) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM tasks WHERE deadline > ?';
            
            db.all(sql, [date], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const tasks = this.taskMapper(rows);
                    resolve(this.add(tasks));
                }
            });
        });
    };
    this.loadByDescription = (description) => {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM tasks WHERE description LIKE ?';
            description = `%${description}%`;

            db.all(sql, [description], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    const tasks = this.taskMapper(rows);
                    resolve(this.add(tasks));
                }
            });
        });
    };
}

async function main(){
    const tasks = [new Task(3, 'ciao3', false, true, '04-10-2021'),
        new Task(6, 'ciao6'),
        new Task(1, 'ciao', true, true, '04-04-2021'),
        new Task(5, 'ciao5'),
        new Task(2, 'ciao2', false, true, '04-08-2021'),
        new Task(4, 'ciao4'),
        new Task(7, 'ciao7', true, true, 'eo')
    ];

    const tl = new TaskList();

    //tl.add(new Task(4, 'ciao'));
    //tl.add(tasks);

    await tl.loadAll();
    //await tl.loadByDescription('laundr');
    
    tl.sortAndPrint();
}

//es0(['abcdefg', 'a', 'as', 'asd']);
main();