import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../App";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    try {
      const res = await fetch(`${BaseUrl}/auth/allusers`, {
        credentials: "include",
      });
      const data = await res.json();
      if (res.status === 200) setUsers(data);
      else navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUser = async () => {
    const res = await fetch(`${BaseUrl}/auth`, {
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (res.status === 200) setCurrentUser(data);
    else navigate("/login");
  };

  useEffect(() => {
    fetchUser();
    fetchAllUsers();
  }, []);

  console.log(users);

  const logoutUser = async (userId) => {
    try {
      const res = await fetch(
        `${BaseUrl}/auth/logout-user/${userId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      console.log(res.status);
      if (res.status === 202) fetchAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const softDelete = async () => {
    const res = await fetch(
      `${BaseUrl}/auth/soft-delete-user/${selectedUserId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.status === 204) fetchAllUsers();
    popup(false);
  };

  const hardDelete = async () => {
    const res = await fetch(
      `${BaseUrl}/auth/hard-delete-user/${selectedUserId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.status === 204) fetchAllUsers();
    popup(false);
  };

  return (
    <div
      className="max-w-4xl mx-auto my-10 "
      onClick={() => {
        setPopup(false);
      }}
    >
      <div className="relative">
        <h1 className="text-3xl font-bold mb-5">All Users</h1>
        {popup && (
          <div className="flex absolute top-0 right-0 items-center gap-2 border-solid border-[1px] border-slate-500 rounded-l-lg py-2 px-1">
            <p className="font-semibold">Are you sure want to Delete?</p>
            <button
              className="bg-red-700 text-white p-1 rounded-lg font-semibold"
              onClick={hardDelete}
            >
              Hard Delete
            </button>
            <button
              className="border-red-700  border-[1px]  text-red-800 p-1 rounded-lg font-semibold"
              onClick={softDelete}
            >
              Soft Delete
            </button>
            <button
              className="border-blue-700  border-[1px]  text-blue-800 p-1 rounded-lg font-semibold"
              onClick={() => {
                setPopup(false);
              }}
            >
              Cancle
            </button>
          </div>
        )}
      </div>
      <p>
        {currentUser.name}: {currentUser.role}
      </p>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Name</th>
            <th className="border border-gray-300 p-3 text-left">Email</th>
            <th className="border border-gray-300 p-3 text-left">Status</th>
            <th className="border border-gray-300 p-3 text-left">Actions</th>
            {currentUser.role === "Admin" && (
              <th className="border border-gray-300 p-3 text-left">Delete</th>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-3">{user.name}</td>
              <td className="border border-gray-300 p-3">{user.email}</td>
              <td className="border border-gray-300 p-3">
                {user.isLoggedIn ? "Logged In" : "Logged Out"}
              </td>
              <td className="border border-gray-300 p-3">
                <button
                  className={`px-4 py-2 text-sm rounded transition-colors ${
                    user.isLoggedIn
                      ? "bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  onClick={() => logoutUser(user.id)}
                  disabled={!user.isLoggedIn}
                >
                  Logout
                </button>
              </td>
              {currentUser.role === "Admin" && (
                <td className="border border-gray-300 p-3">
                  <button
                    className="px-4 py-2 text-sm rounded transition-colors bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPopup(true);
                      setSelectedUserId(user.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
