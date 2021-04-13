"use strict"

const dayjs = require('dayjs');
const sqlite = require('sqlite3');

function Tasks(id, description, urgent, priv, deadline)
{
    this.id=id;
    this.descrpition=description;
    this.urgent=urgent;
    this.priv=priv;
    this.deadline=dayjs(deadline);
}

function Methods()
{
    this.taskList=[];
    const db=new sqlite.Database('tasks.db', (err) => { if(err) throw err; } );

    this.load=() =>
    {
        return new Promise( (resolve, reject) =>
        {
            const sql='SELECT * FROM tasks';
            db.all(sql, (err, rows) =>
            {
                if(err) reject(err);
                else 
                {
                    this.taskList=[...rows].map( (row => new Tasks(row.id, row.description, row.urgent, row.private, row.deadline)) ) ;
                    resolve(this.taskList);
                }
            });
        });
    }

    this.loadAndPrintAfterData=(date) =>
    {
        return new Promise( (resolve, reject) =>
        {
            const sql='SELECT * FROM tasks WHERE tasks.deadline>?';
            db.all(sql,[date], (err, rows) =>
            {
                if(err) reject(err);
                else
                {
                    this.taskList=[...rows].map( (row => new Tasks(row.id, row.description, row.urgent, row.private, row.deadline)) ) ;
                    resolve(this.taskList);
                }
            });
        });
    }

    this.loadAndPrintTask=(description) =>
    {
        return new Promise( (resolve, reject) =>
        {
            const sql='SELECT * FROM tasks WHERE tasks.description LIKE ?';
            db.all(sql,[description], (err, rows) =>
            {
                if(err) reject(err);
                else
                {
                    this.taskList=[...rows].map( (row => new Tasks(row.id, row.description, row.urgent, row.private, row.deadline)) ) ;
                    resolve(this.taskList);
                }
            });
        });
    }

    this.sortAndPrint=() =>
    {
        const newList=[...this.taskList];
        newList.sort( (x,y ) =>
        {
            if(x.deadline.isAfter(y.deadline)) return 1;
            else return -1;
        } );
        console.log(newList);
    }

    this.filterAndPrint=() =>
    {
        return [...this.taskList].filter( e => e.urgent);
    }
    
}

const loadData=async () =>
{
    try{
        const tasks=await methods.load(); 
        methods.sortAndPrint();
        //methods.filterAndPrint();
    }catch(err){
        console.log(err);
    }
}

const loadAfterData=async (data) =>
{
    try{
        const tasks=await methods.loadAndPrintAfterData(data); 
        methods.sortAndPrint();
        //methods.filterAndPrint();
    }catch(err){
        console.log(err);
    }
}

const loadTask=async (task) =>
{
    try{
        const tasks=await methods.loadAndPrintTask(task); 
        methods.sortAndPrint();
        //methods.filterAndPrint();
    }catch(err){
        console.log(err);
    }
}

const methods=new Methods();

loadData();
//loadAfterData("2021-03-19");
loadAfterData("2021-03-10");
loadTask("laundry");
//loadTask("phone call");

debugger;