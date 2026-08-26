import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "./Api";
import Sidebar from "./Sidebar";

function EditPolicy() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [effectiveDate, setEffectiveDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    const fetchPolicy = async () => {
      try {
        const response = await api.get(`/policies/${id}`);
        const policy = response.data;
        setTitle(policy.title);
        setContent(policy.content);
        if (policy.effectiveDate) {
          setEffectiveDate(new Date(policy.effectiveDate).toISOString().split("T")[0]);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolicy();
  }, [id]);

  const savePolicy = async () => {
    if (!title.trim()) return alert("Please enter policy title");
    if (!content.trim()) return alert("Please enter policy content");

    try {
      setSaving(true);
      if (id) {
        await api.put(`/policies/${id}`, { title, content, effectiveDate });
      } else {
        await api.post("/policies", {
          title,
          slug: title.toLowerCase().trim().replace(/\s+/g, "-"),
          content,
          effectiveDate,
        });
      }
      navigate("/admin/policies");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to save policy");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Sidebar />
      <div className="ml-[220px] p-6 max-w-3xl">

        <div className="mb-8">
          <h1 className="text-xl font-semibold">
            {id ? "Edit Policy" : "New Policy"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {id ? "Update this policy's content" : "Write and publish a new policy"}
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-14 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5">

            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Privacy Policy"
                className="w-full bg-[#111] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#d4af37]/50 transition"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Effective date</label>
              <input
                type="date"
                value={effectiveDate}
                onChange={(e) => setEffectiveDate(e.target.value)}
                className="bg-[#111] border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#d4af37]/50 transition [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={16}
                placeholder="Write your policy here..."
                className="w-full bg-[#111] border border-white/10 rounded-lg p-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#d4af37]/50 transition resize-y leading-6"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => navigate("/admin/policies")}
                className="text-sm text-gray-400 hover:text-white px-5 py-2.5 border border-white/10 rounded-lg transition"
              >
                Cancel
              </button>
              <button
                onClick={savePolicy}
                disabled={saving}
                className="text-sm font-semibold text-black bg-[#d4af37] px-6 py-2.5 rounded-lg hover:brightness-110 disabled:opacity-60 transition"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default EditPolicy;