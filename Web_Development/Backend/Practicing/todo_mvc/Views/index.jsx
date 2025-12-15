import React from "react";
import Layout from "./Layout.jsx";

export default function index({ todoList }) {
  return (
    <Layout>
      <form
        action="/todo/"
        method="post"
        encType="application/x-www-form-urlencoded"
      >
        Add Task : <input type="text" name="task" />{" "}
        <input type="submit" value="Submit" />
      </form>
      <div>List of Todos</div>
      <ul>
        {todoList.reverse().map(({ task, completed, _id }) => (
          <li key={_id.toString()}>{task}</li>
        ))}
      </ul>
    </Layout>
  );
}
