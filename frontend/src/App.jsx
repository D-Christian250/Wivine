import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [editingId, setEditingId] = useState(null);

  const API = "http://localhost:5000/user";

  // Fetch users
  const fetchUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingId) {
      await axios.put(`${API}/${editingId}`, form);
      setEditingId(null);
    } else {
      await axios.post(API, form);
    }

    setForm({ username: "", email: "", password: "" });
    fetchUsers();
  };

  // Edit
  const handleEdit = (user) => {
    setForm(user);
    setEditingId(user._id);
  };

  // Delete
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchUsers();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold text-center mb-6">
          User Management
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 mb-6">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {editingId ? "Update User" : "Add User"}
          </button>
        </form>

        {/* Users List */}
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Password</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="text-center">
                <td className="p-2 border">{user.username}</td>
                <td className="p-2 border">{user.email}</td>
                <td className="p-2 border">{user.password}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
