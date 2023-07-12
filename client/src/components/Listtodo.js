import React, { useEffect, useState } from "react";
import axios from "axios";
// components
import Edittodo from "./Edittodo";

const Listtodo = () => {
  const [todo, setTodo] = useState([]);

  // function get list to do
  const getTodo = async (e) => {
    await axios
      .get("http://localhost:5000/getAllTodo")
      .then((res) => {
        setTodo(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  // function delete task to do
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/deleteTodo/${id}`)
      .then((res) => {
        setTodo(todo.filter(todo => todo.todo_id !== id));
        console.log(res);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="container mt-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todo.map((todoList) => {
            return (
              <tr key={todoList.todo_id}>
                <td>{todoList.description}</td>
                <td>
                  <button className="btn btn-danger" type="button" onClick={(e)=>{
                    deleteTodo(todoList.todo_id);
                  }}>
                    Delete
                  </button>
                </td>
                <td>
                  <Edittodo todoList={todoList}/>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Listtodo;
