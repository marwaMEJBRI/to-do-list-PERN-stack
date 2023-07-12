import React, { useState } from "react";
import axios from "axios";

const Inputtodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitFunction = async (e) => {
    e.preventDefault();
    try {
        const body = {description};
        const response = await axios.post("http://localhost:5000/todo", body);
        console.log(response);
        window.location.reload();
    } catch (error) {
        console.log(error.message);
    }
  };

  return (
    <div className="input-to-di-list">
      <h1 className="text-center mt-5">Todo List</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitFunction}>
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-primary">Add</button>
      </form>
    </div>
  );
};

export default Inputtodo;
