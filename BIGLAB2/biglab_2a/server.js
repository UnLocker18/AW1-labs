'use strict'

const express = require('express');
const morgan = require('morgan');
const dao = require('./dao');

const app = express();
const port = 3001;

app.use(morgan('dev'));
app.use(express.json());


app.get("/api/tasks", async (req, res) => {
    try{
        const tasks = await dao.listTasks();
        res.status(200).json(tasks);
    }
    catch{
        res.status(500).json({error: "api GET /tasks "});
    }
})

app.get("/api/tasks/:id(\\d+)", async (req, res) => {
    const id = req.params.id;
    try{
        const task = await dao.listTaskById(id); 
        res.status(200).json(task);
    }
    catch{
        res.status(500).json({error: "api GET /tasks/:id "});
    }
})

app.get("/api/tasks/:filter", async (req, res) => {
    const filter = req.params.filter;
    try{
        const tasks = await dao.listFilteredTasks(filter); 
        res.status(200).json(tasks);
    }
    catch{
        res.status(500).json({error: "api GET /tasks/:filter"});
    }
})

// app.get("/api/tasks/important", async (req, res) => {
//     try{
//         const tasks = await dao.listFilteredTasks("important");
//         res.status(200).json(tasks);
//     }
//     catch{
//         res.status(500).end();
//     }
// })

// app.get("/api/tasks/private", async (req, res) => {
//     try{
//         const tasks = await dao.listFilteredTasks("private");
//         res.status(200).json(tasks);
//     }
//     catch{
//         res.status(500).end();
//     }
// })

// app.get("/api/tasks/today", async (req, res) => {
//     try{
//         const tasks = await dao.listFilteredTasks("today");
//         res.status(200).json(tasks);
//     }
//     catch{
//         res.status(500).end();
//     }
// })

// app.get("/api/tasks/next_7_days", async (req, res) => {
//     try{
//         const tasks = await dao.listFilteredTasks("next_7_days");
//         res.status(200).json(tasks);
//     }
//     catch{
//         res.status(500).end();
//     }
// })

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));