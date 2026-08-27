import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import api from "./Api"

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const res = await api.get("/user/all")
      setUsers(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"
    try {
      await api.put(`/user/status/${id}`, { status: newStatus })
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, status: newStatus } : u))
      )
    } catch (err) {
      console.error(err)
    }
  }

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return
    try {
      await api.delete(`/user/delete/${id}`)
      setUsers((prev) => prev.filter((u) => u._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const initials = (name) =>
    name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?"

  const filtered = users.filter((u) => {
    if (filter === "active") return u.status !== "inactive"
    if (filter === "inactive") return u.status === "inactive"
    if (filter === "admin") return u.role === "admin"
    return true
  })

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar />
      <div className="ml-[220px] p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold">Users</h1>
            <p className="text-sm text-gray-500 mt-1">
              {users.length} registered users
            </p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6">
          {["all", "active", "inactive", "admin"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`text-xs px-4 py-2 rounded-full capitalize transition ${
                filter === tab
                  ? "bg-[#d4af37] text-black font-semibold"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>

        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            No users found
          </div>

        ) : (
          <div className="bg-[#111111] border border-white/10 rounded-xl overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[11px] text-gray-600 uppercase tracking-wider border-b border-white/10">
                  <th className="text-left p-4 font-normal">User</th>
                  <th className="text-left p-4 font-normal">Email</th>
                  <th className="text-left p-4 font-normal">Phone</th>
                  <th className="text-left p-4 font-normal">Role</th>
                  <th className="text-left p-4 font-normal">Joined</th>
                  <th className="text-left p-4 font-normal">Status</th>
                  <th className="text-left p-4 font-normal">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr
                    key={user._id}
                    className="border-t border-white/5 hover:bg-white/5 transition"
                  >
                    {/* Name */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[11px] text-gray-300 shrink-0">
                          {initials(user.name)}
                        </div>
                        <span className="text-gray-300 font-medium">
                          {user.name}
                        </span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="p-4 text-gray-500 text-xs">
                      {user.email}
                    </td>

                    {/* Phone */}
                    <td className="p-4 text-gray-500 text-xs">
                      {user.phone || "—"}
                    </td>

                    {/* Role */}
                    <td className="p-4">
                      <span className={`text-[11px] px-2 py-1 rounded-full ${
                        user.role === "admin"
                          ? "bg-[#d4af37]/10 text-[#d4af37]"
                          : "bg-white/5 text-gray-400"
                      }`}>
                        {user.role}
                      </span>
                    </td>

                    {/* Joined */}
                    <td className="p-4 text-gray-600 text-xs">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>

                    {/* Status */}
                    <td className="p-4">
                      <span className={`text-[11px] px-2 py-1 rounded-full ${
                        user.status === "inactive"
                          ? "bg-red-500/10 text-red-400"
                          : "bg-green-500/10 text-green-400"
                      }`}>
                        {user.status === "inactive" ? "Blocked" : "Active"}
                      </span>
                    </td>

{/* Actions */}
<td className="p-4">
  <div className="flex gap-2">

    {/* Toggle status */}
    <button
      onClick={() => toggleStatus(user._id, user.status)}
      disabled={user.role === "admin"}
      className={`text-[11px] px-3 py-1 rounded transition ${
        user.role === "admin"
          ? "opacity-30 cursor-not-allowed bg-white/5 text-gray-500"
          : user.status === "inactive"
          ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
          : "bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
      }`}
    >
      {user.status === "inactive" ? "Unblock" : "Block"}
    </button>

    {/* Delete */}
    <button
      onClick={() => deleteUser(user._id)}
      disabled={user.role === "admin"}
      className={`text-[11px] px-3 py-1 rounded transition ${
        user.role === "admin"
          ? "opacity-30 cursor-not-allowed bg-white/5 text-gray-500"
          : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
      }`}
    >
      Delete
    </button>
  </div>
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminUsers