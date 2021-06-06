"use strict";

const express = require("express");
const morgan = require("morgan");
const dao = require("./dao");
const { body, validationResult, check, param } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

passport.use(
  new LocalStrategy(function (username, password, done) {
    dao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: "Wrong username and/or password" });
      return done(null, user);
    });
  })
);

// sessioni personalizzate  utente <---> id
passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  dao
    .getUserById(id)
    .then((user) => done(null, user))
    .catch((err) => done(err, null));
});

const app = express();
const port = 3001;

app.use(morgan("dev"));
app.use(express.json());

app.use(
  session({
    secret:
      "a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie",
    resolve: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

const isLogged = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  return res.status(400).json({ message: "User is not logged" });
};

/******** API ********/

// GET /api/tasks
app.get("/api/tasks", isLogged, async (req, res) => {
  try {
    const tasks = await dao.listTasks(req.user.id);
    res
      .status(200)
      .json({ status: "success", details: "api GET /tasks", content: tasks });
  } catch {
    res
      .status(500)
      .json({ status: "failure", details: `Database Error ${err}` });
  }
});

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
  isLogged,
  param("filter").isLength({ min: 3, max: 100 }),
  async (req, res) => {
    const filter = req.params.filter;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array() });
    }

    try {
      const tasks = await dao.listFilteredTasks(filter, req.user.id);
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
  isLogged,
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
      user: req.user.id,
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
  isLogged,
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

    const task = { ...req.body, user: req.user.id };
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
  isLogged,
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

// POST /api/login
app.post("/api/login", function (req, res, next) {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json(info);
    }
    req.login(user, (err) => {
      if (err) return next(err);

      return res.status(200).json(req.user);
    });
  })(req, res, next);
});

// DELETE /api/login/current
app.delete("/api/login/current", (req, res) => {
  console.log(req);
  req.logout();
  res.end();
});

// GET /api//login/current
app.get("/api/login/current", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  } else res.status(401).json({ error: "Authentication required" });
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
