import React, { useEffect, useState } from "react";
import { Edit, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "./Api";
import Sidebar from "./Sidebar";

function AdminPolicies() {
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const fetchPolicies = async () => {
    try {
      const response = await api.get("/policies");
      setPolicies(response.data);
    } catch (error) {
      console.error("Failed to fetch policies", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const deletePolicy = async (id) => {
    if (!window.confirm("Are you sure you want to delete this policy?")) return;
    try {
      await api.delete(`/policies/${id}`);
      fetchPolicies();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const publishPolicy = async (id) => {
    try {
      await api.put(`/policies/${id}/publish`);
      fetchPolicies();
    } catch (error) {
      console.error("Publish failed", error);
    }
  };

  const statusStyle = (status) =>
    status === "published"
      ? "bg-green-500/10 text-green-400"
      : "bg-yellow-500/10 text-yellow-400";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`p-6 pt-20 md:pt-6 transition-all duration-300 ${
          collapsed ? "md:ml-[72px]" : "md:ml-[220px]"
        }`}
      >

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold">Policies</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your website policies</p>
          </div>
          <button
            onClick={() => navigate("/admin/policies/new")}
            className="flex items-center gap-2 bg-[#d4af37] text-black text-sm font-semibold px-4 py-2 rounded-lg hover:brightness-110 transition"
          >
            <Plus size={16} />
            New Policy
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : policies.length === 0 ? (
          <div className="text-center py-20 text-gray-600">No policies yet</div>
        ) : (
          <div className="bg-[#111111] border border-white/10 rounded-xl overflow-hidden">
            {policies.map((policy) => (
              <div
                key={policy._id}
                className="flex items-center justify-between p-5 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition"
              >
                <div>
                  <h2 className="text-sm font-medium text-white">{policy.title}</h2>
                  <p className="text-xs text-gray-600 mt-1">Version {policy.version}</p>
                  <span className={`inline-block mt-2 px-2.5 py-1 rounded-full text-[11px] ${statusStyle(policy.status)}`}>
                    {policy.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/admin/policies/edit/${policy._id}`)}
                    className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>


                  {policy.status !== "published" && (
                    <button
                      onClick={() => publishPolicy(policy._id)}
                      className="text-[11px] bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg hover:bg-green-500/20 transition"
                    >
                      Publish
                    </button>
                  )}

                  <button
                    onClick={() => deletePolicy(policy._id)}
                    className="p-2 text-red-400/80 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminPolicies;
