'use-strict'

const express = require("express")
const morgan = require("morgan")
const dao = require("./db")
const { body, validationResult, check} = require("express-validator")

const PORT = 3001
const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.post("/api/tasks", [
    body("important").isBoolean(),
    body("private").isBoolean(),
    //body("description").isLength({min: 0, max: 15})
    body("description").isAlphanumeric(),
    body("deadline").isDate({ format: "YYYY-MM-DD", strictMode: true })
    //is iso 8601 per la data
],
    (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ err: errors.array() });
        }

        const task = {
            description: req.body.description,
            important: req.body.important,
            private: req.body.private,
            deadline: req.body.deadline
        }

        dao.newTask(task)
            .then((id) => res.status(200).json({ msg: id }))
            .catch(err => res.status(500).json({ err: err }))

    })

app.get('/api/tasks/:id', (req, res) => {
    dao
        .getTask(req.params.id)
        .then(result => res.status(200).json(result))
        .catch(() => res.status(500).json({ error: 'DB error' }));
});

// PUT /api/tasks/:id
app.put('/api/tasks/:id', (req, res) => {
    /* const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    } */

    console.log('test');
    const task = req.body;
    console.log(task);
    dao
        .updateTask(req.params.code, task)
        .then(tskID =>
            res
                .status(200)
                .json({ status: 'success', details: `Updated task ${tskID}` })
        )
        .catch(err =>
            res
                .status(503)
                .json({ status: 'error', details: `Database Error ${err}` })
        );
});

app.delete("/api/tasks/:id",[
    check("id").isInt({min: 0, max: 100})
]
,(req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ err: errors.array() });
    }

    dao.deleteTask(req.params.id)
    .then(msg => res.status(200).json({status: "success", details:`Delete tasks ${msg}`}))
    .catch(err => res.status(500).json({err: err}))
})

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
})