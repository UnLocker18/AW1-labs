"use strict";

const express = require("express");
const morgan = require("morgan");
const dao = require("./dao");
const { body, validationResult, check, param } = require("express-validator");

const app = express();
const port = 3001;

app.use(morgan("dev"));
app.use(express.json());

/******** API ********/

// GET /api/tasks
app.get(
  "/api/tasks",
  async (req, res) => {


    //TOGLIERE setTimeout


    setTimeout( async () => {
      try {
        const tasks = await dao.listTasks();
        res
          .status(200)
          .json({ status: "success", details: "api GET /tasks", content: tasks });
      } catch {
        res
          .status(500)
          .json({ status: "failure", details: `Database Error ${err}` });
      }
    }, 2000);    
  }
);

// GET /api/tasks/:id
app.get(
  "/api/tasks/:id(\\d+)",
  [param("id").isInt({ min: 0, max: 100 })],
  async (req, res) => {
    const id = req.params.id;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array() });
    }

    try {
      const task = await dao.listTaskById(id);
      res.status(200).json({
        status: "success",
        details: "api GET /tasks/:id",
        content: task,
      });
    } catch {
      res
        .status(500)
        .json({ status: "failure", details: `Database Error ${err}` });
    }
  }
);

// GET /api/tasks:filter
app.get(
  "/api/tasks/:filter",
  param("filter").isLength({ min: 3, max: 100 }),
  async (req, res) => {
    const filter = req.params.filter;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array() });
    }

    try {
      const tasks = await dao.listFilteredTasks(filter);
      res.status(200).json({
        status: "success",
        details: `api GET /tasks/${filter}`,
        content: tasks,
      });
    } catch {
      res
        .status(500)
        .json({ status: "failure", details: `Database Error ${err}` });
    }
  }
);

//POST /api/tasks
app.post(
  "/api/tasks",
  [
    body("important").isBoolean(),
    body("private").isBoolean(),
    body("description").isLength({ min: 3, max: 100 }),
    body("deadline")
      .optional({ nullable: false, checkFalsy: true })
      .isISO8601(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ err: errors.array() });
    }

    const task = {
      description: req.body.description,
      important: req.body.important,
      private: req.body.private,
      deadline: req.body.deadline,
    };

    dao
      .newTask(task)
      .then((id) =>
        res.status(200).json({
          status: "success",
          details: `api POST /tasks with id: ${id}`,
        })
      )
      .catch((err) =>
        res
          .status(500)
          .json({ status: "failure", details: `Database Error ${err}` })
      );
  }
);

// PUT /api/tasks/:id
app.put(
  "/api/tasks/:id(\\d+)",
  [
    check("id")
      .isInt({ min: 0, max: 100 })
      .custom((value, { req }) => {
        if (value != req.params.id) return false;
        else return true;
      }),
    check("description").isLength({ min: 3, max: 100 }),
    check("deadline")
      .optional({ nullable: false, checkFalsy: true })
      .isISO8601(),
    check("important").isBoolean(),
    check("private").isBoolean(),
    check("completed").isBoolean(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const task = req.body;
    dao
      .updateTask(task)
      .then((updatedTasks) => {
        if (updatedTasks != 0)
          return res
            .status(200)
            .json({ status: "success", details: `Updated task` });
        else
          return res
            .status(404)
            .json({ status: "failure", details: "Task not found" });
      })
      .catch((err) =>
        res
          .status(503)
          .json({ status: "failure", details: `Database Error ${err}` })
      );
  }
);

// DELETE /api/tasks/:id
app.delete(
  "/api/tasks/:id(\\d+)",
  [param("id").isInt({ min: 0, max: 100 })],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array() });
    }

    dao
      .deleteTask(req.params.id)
      .then((nDeletedTasks) => {
        if (nDeletedTasks != 0)
          return res.status(200).json({
            status: "success",
            details: `Deleted ${nDeletedTasks} tasks`,
          });
        else
          return res
            .status(404)
            .json({ status: "failure", details: "Task not found" });
      })
      .catch((err) =>
        res
          .status(500)
          .json({ status: "failure", details: `Database Error ${err}` })
      );
  }
);

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
