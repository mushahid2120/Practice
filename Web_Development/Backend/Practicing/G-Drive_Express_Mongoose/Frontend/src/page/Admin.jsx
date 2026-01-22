import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BaseUrl } from "../App";
import Header from "../Component/Header";

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


  const logoutUser = async (userId) => {
    try {
      const res = await fetch(
        `${BaseUrl}/auth/logout-user/${userId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      if (res.status === 202) fetchAllUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSoftDelete = async () => {
    const res = await fetch(
      `${BaseUrl}/auth/soft-delete-user/${selectedUserId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.status === 204) fetchAllUsers();
    setPopup(false);
  };

  const handleHardDelete = async () => {
    const res = await fetch(
      `${BaseUrl}/auth/hard-delete-user/${selectedUserId}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (res.status === 204) fetchAllUsers();
    setPopup(false);
  };

return (
  <>
  <Header showProfileIcon={false}/>
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50 p-6">
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-gray-600 mt-1">Manage all users and their access</p>
          </div>
        </div>

        {/* Current User Badge */}
        <div className="inline-flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-5 py-3 shadow-md">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Logged in as</p>
            <p className="font-bold text-gray-800">{currentUser.name}</p>
          </div>
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase">
            {currentUser.role}
          </span>
        </div>
      </div>

      {/* Users Table Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              All Users
              <span className="text-sm text-gray-500 font-normal">({users.length})</span>
            </h2>
            {currentUser.role === "Admin" && (
              <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-200 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add User
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold shadow-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{user.name}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-gray-600">{user.email}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${
                      user.isLoggedIn 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        user.isLoggedIn ? 'bg-green-500' : 'bg-gray-400'
                      }`}></span>
                      {user.isLoggedIn ? "Logged In" : "Logged Out"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => logoutUser(user.id)}
                        disabled={!user.isLoggedIn}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                          user.isLoggedIn
                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Logout
                      </button>
                      {currentUser.role === "Admin" && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setPopup(true);
                            setSelectedUserId(user.id);
                          }}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium text-sm hover:bg-red-200 transition-all duration-200 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {popup && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setPopup(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Confirm Deletion</h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4">
              <p className="text-gray-700 text-base">
                Are you sure you want to delete this user? This action cannot be easily undone.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={handleHardDelete}
                  className="w-full px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Hard Delete (Permanent)
                </button>
                
                <button
                  onClick={handleSoftDelete}
                  className="w-full px-5 py-3 bg-orange-100 text-orange-700 font-semibold rounded-xl hover:bg-orange-200 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                  Soft Delete (Recoverable)
                </button>

                <button
                  onClick={() => setPopup(false)}
                  className="w-full px-5 py-3 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 border-2 border-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  </>
);
}

