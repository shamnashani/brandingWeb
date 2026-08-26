import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import api from "./Api"

const AdminReviews = () => {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all") // all | pending | approved
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/rev/all-review")
        setReviews(res.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const approve = async (id) => {
    try {
      await api.put(`/rev/approve/${id}`)
      setReviews((prev) =>
        prev.map((r) => (r._id === id ? { ...r, approved: true } : r))
      )
    } catch (err) {
      console.error(err)
    }
  }

  const remove = async (id) => {
    try {
      await api.delete(`/rev/delete/${id}`)
      setReviews((prev) => prev.filter((r) => r._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const toggleFeatured = async (id) => {
    try {
      const res = await api.put(`/rev/feature/${id}`)
      setReviews((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, featured: res.data.review.featured } : r
        )
      )
    } catch (err) {
      console.error(err)
    }
  }

  const filtered = reviews.filter((r) => {
    if (filter === "pending") return !r.approved
    if (filter === "approved") return r.approved
    return true
  })

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
        <h1 className="text-xl font-semibold mb-1">Reviews</h1>
        <p className="text-sm text-gray-500 mb-6">
          Approve or remove client reviews
        </p>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {["all", "pending", "approved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`text-xs px-4 py-2 rounded-full capitalize transition whitespace-nowrap ${
                filter === tab
                  ? "bg-[#d4af37] text-black font-semibold"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-600">
            No reviews found
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filtered.map((rev) => (
              <div
                key={rev._id}
                className="bg-[#111111] border border-white/10 rounded-xl p-4 sm:p-5"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  {/* Review Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-white">
                        {rev.name}
                      </span>

                      <span className="text-[#d4af37] text-sm">
                        {"★".repeat(rev.rating)}
                        {"☆".repeat(5 - rev.rating)}
                      </span>

                      {rev.service && (
                        <span className="text-[10px] text-[#d4af37] bg-[#d4af37]/10 px-2 py-1 rounded-full">
                          {rev.service}
                        </span>
                      )}

                      <span
                        className={`text-[10px] px-2 py-1 rounded-full ${
                          rev.approved
                            ? "bg-green-500/10 text-green-400"
                            : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {rev.approved ? "Approved" : "Pending"}
                      </span>

                      {rev.featured && (
                        <span className="text-[10px] bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded-full">
                          ★ Featured
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-400 leading-6 break-words">
                      "{rev.message}"
                    </p>

                    <p className="text-[11px] text-gray-600 mt-3">
                      {new Date(rev.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                    {!rev.approved && (
                      <button
                        onClick={() => approve(rev._id)}
                        className="bg-green-500/10 text-green-400 px-4 py-2 rounded-lg text-sm hover:bg-green-500/20 transition w-full sm:w-auto"
                      >
                        Approve
                      </button>
                    )}

                    {rev.approved && (
                      <button
                        onClick={() => toggleFeatured(rev._id)}
                        className={`px-4 py-2 rounded-lg text-sm transition w-full sm:w-auto ${
                          rev.featured
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-white/10 text-gray-300 hover:bg-white/20"
                        }`}
                      >
                        {rev.featured ? "★ Featured" : "☆ Feature"}
                      </button>
                    )}

                    <button
                      onClick={() => remove(rev._id)}
                      className="bg-red-500/10 text-red-400 px-4 py-2 rounded-lg text-sm hover:bg-red-500/20 transition w-full sm:w-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminReviews