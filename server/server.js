const express = require("express");
const app = express();
const cors = require("cors");

// router database
const pool = require("./database");

// middleware
app.use(express.json());
app.use(cors("http://localhost:3000"));

// create todo
app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;
    const newtodo = await pool.query(
      "INSERT INTO todo (description) values ($1) RETURNING *",
      [description]
    );
    res.json(newtodo.rows[0]);
  } catch (error) {
    console.log(error, "something want wrong");
  }
});

// get all todo
app.get("/getAllTodo", async (req, res) => {
  try {
    const allTodo = await pool.query("select * from todo");
    res.json(allTodo.rows);
  } catch (error) {
    console.log(error, "something want wrong");
  }
});

// get todo
app.get("/getTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("select * from todo where todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error, "something want wrong");
  }
});

// update todo
app.put("/updateTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});

// delete todo
app.delete("/deleteTodo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const deletetodo = await pool.query('DELETE FROM todo where todo_id = $1', [id]);
    res.json(`task's has been deleted`);
  } catch (error) {
    console.log(error, "something want wrong");
  }
});

// running server
PORT = 5000;
app.listen(PORT, (err) => {
  err
    ? console.log(err, "something want wrong, server not running")
    : console.log(`server is running on localhost : ${PORT}`);
});
