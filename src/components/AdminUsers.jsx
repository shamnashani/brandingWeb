import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import api from "./Api"

const AdminUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

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

  // Shared action buttons — used in both the mobile card layout and
  // the desktop table layout, so behavior always stays identical.
  const ActionButtons = ({ user }) => (
    <div className="flex gap-2">
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
  )

  const RoleBadge = ({ role }) => (
    <span
      className={`text-[11px] px-2 py-1 rounded-full ${
        role === "admin" ? "bg-[#d4af37]/10 text-[#d4af37]" : "bg-white/5 text-gray-400"
      }`}
    >
      {role}
    </span>
  )

  const StatusBadge = ({ status }) => (
    <span
      className={`text-[11px] px-2 py-1 rounded-full ${
        status === "inactive" ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"
      }`}
    >
      {status === "inactive" ? "Blocked" : "Active"}
    </span>
  )

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`p-4 sm:p-6 pt-20 md:pt-6 transition-all duration-300 ${
          collapsed ? "md:ml-[72px]" : "md:ml-[220px]"
        }`}
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-lg sm:text-xl font-semibold">Users</h1>
            <p className="text-sm text-gray-500 mt-1">
              {users.length} registered users
            </p>
          </div>
        </div>

        {/* Filter tabs — horizontally scrollable on phone instead of wrapping/overflowing */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {["all", "active", "inactive", "admin"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`text-xs px-4 py-2 rounded-full capitalize transition shrink-0 ${
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
          <>
            {/* ===== MOBILE: stacked cards, shown below sm breakpoint ===== */}
            <div className="flex flex-col gap-3 sm:hidden">
              {filtered.map((user) => (
                <div
                  key={user._id}
                  className="bg-[#111111] border border-white/10 rounded-xl p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[11px] text-gray-300 shrink-0">
                        {initials(user.name)}
                      </div>
                      <div className="min-w-0">
                        <p className="text-gray-200 font-medium text-sm truncate">{user.name}</p>
                        <p className="text-gray-600 text-[11px] truncate">{user.email}</p>
                      </div>
                    </div>
                    <RoleBadge role={user.role} />
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[11px] text-gray-600">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                    <StatusBadge status={user.status} />
                  </div>

                  <ActionButtons user={user} />
                </div>
              ))}
            </div>

            {/* ===== DESKTOP/TABLET: table, hidden below sm breakpoint ===== */}
            <div className="hidden sm:block bg-[#111111] border border-white/10 rounded-xl overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] text-gray-600 uppercase tracking-wider border-b border-white/10">
                    <th className="text-left p-4 font-normal">User</th>
                    <th className="text-left p-4 font-normal">Email</th>
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
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[11px] text-gray-300 shrink-0">
                            {initials(user.name)}
                          </div>
                          <span className="text-gray-300 font-medium">{user.name}</span>
                        </div>
                      </td>

                      <td className="p-4 text-gray-500 text-xs">{user.email}</td>

                      <td className="p-4"><RoleBadge role={user.role} /></td>

                      <td className="p-4 text-gray-600 text-xs">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </td>

                      <td className="p-4"><StatusBadge status={user.status} /></td>

                      <td className="p-4"><ActionButtons user={user} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AdminUsers