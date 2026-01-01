import { useEffect } from 'react';
import { useState } from 'react';

const dummyUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', isLoggedIn: true },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', isLoggedIn: true },
  { id: 3, name: 'Mark Taylor', email: 'mark@example.com', isLoggedIn: false },
];

export default function UsersPage() {
  const [users, setUsers] = useState(dummyUsers);

  const fetchAllUsers=async ()=>{
    const res=await fetch('http://127.0.0.1:4000/auth/allusers')
    const data=await res.json()
    console.log(res)
  }

  useEffect(()=>{
    fetchAllUsers()
  },[])

  const logoutUser = (userId) => {
    alert(`Logging out user with ID: ${userId}`);
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, isLoggedIn: false } : user
      )
    );
  };

  return (
    <div className="max-w-4xl mx-auto my-10">
      <h1 className="text-3xl font-bold mb-5">All Users</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">Name</th>
            <th className="border border-gray-300 p-3 text-left">Email</th>
            <th className="border border-gray-300 p-3 text-left">Status</th>
            <th className="border border-gray-300 p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border border-gray-300 p-3">{user.name}</td>
              <td className="border border-gray-300 p-3">{user.email}</td>
              <td className="border border-gray-300 p-3">
                {user.isLoggedIn ? 'Logged In' : 'Logged Out'}
              </td>
              <td className="border border-gray-300 p-3">
                <button
                  className={`px-4 py-2 text-sm rounded transition-colors ${
                    user.isLoggedIn
                      ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  onClick={() => logoutUser(user.id)}
                  disabled={!user.isLoggedIn}
                >
                  Logout
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}