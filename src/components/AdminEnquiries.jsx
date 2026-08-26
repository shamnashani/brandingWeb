import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import api from "./Api"

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeEnquiry, setActiveEnquiry] = useState(null) // full-message modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/enquiry/all")
        setEnquiries(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/enquiry/status/${id}`, { status })
      setEnquiries((prev) =>
        prev.map((e) => (e._id === id ? { ...e, status } : e))
      )
    } catch (err) {
      console.error(err)
    }
  }

  const deleteEnquiry = async (id) => {
    try {
      await api.delete(`/enquiry/delete/${id}`)
      setEnquiries((prev) => prev.filter((e) => e._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const statusStyle = (status) => {
    const map = {
      new: "bg-green-500/10 text-green-400",
      contacted: "bg-[#d4af37]/10 text-[#d4af37]",
      closed: "bg-white/5 text-gray-400",
    }
    return map[status] || "bg-white/5 text-gray-300"
  }

  const initials = (name) =>
    name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?"

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div
        className={`p-4 pt-16 md:pt-6 md:p-6 transition-all duration-300 ${
          collapsed ? "md:ml-[72px]" : "md:ml-[220px]"
        }`}
      >
        <h1 className="text-xl font-semibold mb-1">Enquiries</h1>
        <p className="text-sm text-gray-400 mb-6">
          All messages from your website
        </p>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-14 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : enquiries.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            No enquiries yet
          </div>
        ) : (
          <>
            {/* Table — desktop / tablet */}
            <div className="hidden sm:block bg-[#111111] border border-white/10 rounded-xl overflow-x-auto">
              <table className="w-full text-sm min-w-[720px]">
                <thead>
                  <tr className="text-[11px] text-gray-400 uppercase tracking-wider border-b border-white/10">
                    <th className="text-left p-4 font-normal">Name</th>
                    <th className="text-left p-4 font-normal">Email</th>
                    <th className="text-left p-4 font-normal">Phone</th>
                    <th className="text-left p-4 font-normal">Message</th>
                    <th className="text-left p-4 font-normal">Date</th>
                    <th className="text-left p-4 font-normal">Status</th>
                    <th className="text-left p-4 font-normal">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {enquiries.map((enq) => (
                    <tr key={enq._id} className="border-t border-white/5 hover:bg-white/5 transition">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-gray-200 shrink-0">
                            {initials(enq.name)}
                          </div>
                          <span className="text-gray-200">{enq.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-gray-400 text-xs">{enq.email}</td>
                      <td className="p-4 text-gray-400 text-xs">{enq.phone || "—"}</td>
                      <td className="p-4 max-w-[220px]">
                        <button
                          onClick={() => setActiveEnquiry(enq)}
                          className="text-gray-300 text-xs text-left truncate block w-full hover:text-[#d4af37] transition"
                          title="Click to read full message"
                        >
                          {enq.message}
                        </button>
                      </td>
                      <td className="p-4 text-gray-400 text-xs">
                        {new Date(enq.createdAt).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        <select
                          value={enq.status}
                          onChange={(e) => updateStatus(enq._id, e.target.value)}
                          className={`text-[11px] px-2 py-1 rounded-full outline-none cursor-pointer ${statusStyle(enq.status)}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => deleteEnquiry(enq._id)}
                          className="text-[11px] bg-red-500/10 text-red-400 px-2 py-1 rounded hover:bg-red-500/20 transition"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cards — mobile */}
            <div className="sm:hidden flex flex-col gap-3">
              {enquiries.map((enq) => (
                <div
                  key={enq._id}
                  className="bg-[#111111] border border-white/10 rounded-xl p-4"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-gray-200 shrink-0">
                      {initials(enq.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-100 truncate">{enq.name}</p>
                      <p className="text-[11px] text-gray-400 truncate">{enq.email}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400 mb-3">
                    <p><span className="text-gray-500">Phone:</span> {enq.phone || "—"}</p>
                  </div>

                  <button
                    onClick={() => setActiveEnquiry(enq)}
                    className="text-xs text-gray-300 mb-3 text-left line-clamp-2 hover:text-[#d4af37] transition"
                  >
                    {enq.message}
                  </button>

                  <p className="text-[11px] text-gray-500 mb-3">
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </p>

                  <div className="flex items-center justify-between gap-2">
                    <select
                      value={enq.status}
                      onChange={(e) => updateStatus(enq._id, e.target.value)}
                      className={`text-[11px] px-2 py-1 rounded-full outline-none cursor-pointer ${statusStyle(enq.status)}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>

                    <button
                      onClick={() => deleteEnquiry(enq._id)}
                      className="text-[11px] bg-red-500/10 text-red-400 px-3 py-1 rounded hover:bg-red-500/20 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Full message modal */}
      {activeEnquiry && (
        <div
          onClick={() => setActiveEnquiry(null)}
          className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111111] border border-white/10 rounded-xl p-5 sm:p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs text-gray-200 shrink-0">
                  {initials(activeEnquiry.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-gray-100 truncate">{activeEnquiry.name}</p>
                  <p className="text-[11px] text-gray-400 truncate">{activeEnquiry.email}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveEnquiry(null)}
                className="text-gray-400 hover:text-white text-sm shrink-0"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs text-gray-400 mb-4">
              <p><span className="text-gray-500">Phone:</span> {activeEnquiry.phone || "—"}</p>
              <p><span className="text-gray-500">Date:</span> {new Date(activeEnquiry.createdAt).toLocaleDateString()}</p>
            </div>

            <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-2">Message</p>
            <p className="text-sm text-gray-200 leading-6 whitespace-pre-wrap break-words">
              {activeEnquiry.message}
            </p>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <select
                value={activeEnquiry.status}
                onChange={(e) => {
                  updateStatus(activeEnquiry._id, e.target.value)
                  setActiveEnquiry({ ...activeEnquiry, status: e.target.value })
                }}
                className={`text-[11px] px-3 py-1.5 rounded-full outline-none cursor-pointer ${statusStyle(activeEnquiry.status)}`}
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>

              <button
                onClick={() => {
                  deleteEnquiry(activeEnquiry._id)
                  setActiveEnquiry(null)
                }}
                className="text-[11px] bg-red-500/10 text-red-400 px-3 py-1.5 rounded hover:bg-red-500/20 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminEnquiries