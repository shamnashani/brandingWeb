import { useEffect, useState } from "react"
import api from "./Api"

function RecentEnquiries() {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)
  console.log("Token:", localStorage.getItem("token"));

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get("/enquiry/all")
        setEnquiries(res.data.slice(0,5))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const statusStyle = (status) => {
    const map = {
      new: "bg-green-500/10 text-green-400",
      contacted: "bg-[#d4af37]/10 text-[#d4af37]",
      closed: "bg-white/5 text-gray-500",
      pending: "bg-blue-500/10 text-blue-400",
    }
    return map[status] || "bg-white/5 text-gray-400"
  }

  const initials = (name) =>
    name?.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?"

  return (
    <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-white">Recent enquiries</h3>

      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col gap-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-10 bg-white/5 rounded animate-pulse" />
          ))}
        </div>
      )}

      {/* Empty */}
      {!loading && enquiries.length === 0 && (
        <p className="text-sm text-gray-600 text-center py-6">
          No enquiries yet
        </p>
      )}

      {/* Table */}
      {!loading && enquiries.length > 0 && (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-[11px] text-gray-600 uppercase tracking-wider">
              <th className="text-left pb-3 font-normal">Name</th>
              <th className="text-left pb-3 font-normal">Date</th>
              <th className="text-left pb-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enq) => (
              <tr key={enq._id} className="border-t border-white/5">

                {/* Name with initials avatar */}
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-gray-300 shrink-0">
                      {initials(enq.name)}
                    </div>
                    <span className="text-gray-300">{enq.name}</span>
                  </div>
                </td>


                {/* Date */}
                <td className="py-3 text-gray-600 text-xs">
                  {new Date(enq.createdAt).toLocaleDateString()}
                </td>

                {/* Status badge */}
                <td className="py-3">
                  <span className={`text-[11px] px-2 py-1 rounded-full ${statusStyle(enq.status)}`}>
                    {enq.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default RecentEnquiries