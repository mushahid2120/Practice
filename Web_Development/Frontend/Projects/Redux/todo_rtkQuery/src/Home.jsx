import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import TaskItem from "./TaskItem";
import { useAddDataMutation, useDeleteDataMutation, useGetDataQuery, useUpdateDataMutation} from "./apiSlice";

export default function Home() {
  const [newTask, setNewTask] = useState("");
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);
  // const [error, setError] = useState("");
  // const [data, setData] = useState([]);

  const {data,isError,isLoading}=useGetDataQuery()
  const [addTask]=useAddDataMutation()
  const [updateData]=useUpdateDataMutation()
  const [deleteData]=useDeleteDataMutation()
 
  const BASE_URL = "http://localhost:3000";

  return (
    <div className="flex h-screen flex-grow items-start justify-center bg-gray-900 p-4">
      <div className="task-app w-full max-w-md rounded-lg bg-gray-800 px-6 pb-2 pt-6 text-gray-200 shadow-lg">
        <div className="mb-6 flex items-center">
          <svg
            className="h-8 w-8 stroke-current text-indigo-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
          <h4 className="ml-3 text-lg font-semibold">My Tasks</h4>
        </div>
        <form
          className="my-2 flex h-8 w-full items-center rounded border-2 border-solid border-gray-700 px-2 text-sm font-medium"
          onSubmit={(e) => {
            e.preventDefault();
            addTask({
              value: newTask,
              completed: false,
              id: crypto.randomUUID(),
            });
            setNewTask('')
          }}
        >
          <svg
            className="h-5 w-5 fill-current text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <input
            className="ml-4 h-8 w-full flex-grow bg-transparent font-medium focus:outline-none"
            type="text"
            placeholder="Add a new task"
            required
            value={newTask}
            onChange={(e) => {
              setNewTask(e.target.value);
            }}
          />
          <button className="text-indigo-400">Add</button>
        </form>
        <div className="tasks-container overflow-auto">
          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : isError ? (
            <p className="text-center"> "Something went wrong"</p>
          ) : (
            data.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                updateData={updateData}
                deleteData={deleteData}
              />
            ))
          )}
        </div>
      </div>
      <Link to="contact" className="text-gray-800 hover:text-gray-400 absolute">
        Contact
      </Link>
    </div>
  );
}
