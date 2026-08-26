import { useEffect, useState } from "react"
import Sidebar from "./Sidebar"
import api from "./Api"
import { FaEye, FaEyeSlash } from "react-icons/fa"


const AdminSettings = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [showPassword, setShowPassword] = useState('')

  const [settings, setSettings] = useState({
    businessName: "",
    tagline: "",
    contactEmail: "",
    contactPhone: "",
    address: "",
socialLinks: {
  instagram: "",
  linkedin: "",
  facebook: "",
  whatsapp: "",
},    autoApproveReviews: false,
    featuredReviewsLimit: 3,
    notifyOnEnquiry: true,
    notifyOnReview: true,
    enquiryNotificationEmail: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState("")

  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" })
  const [pwSaving, setPwSaving] = useState(false)
  const [pwMsg, setPwMsg] = useState("")

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await api.get("/settings")
        setSettings((prev) => ({ ...prev, ...res.data }))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchSettings()
  }, [])

  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
  }

  const handleSocialChange = (platform, value) => {
    setSettings((prev) => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [platform]: value },
    }))
  }

  const saveSettings = async () => {
    setSaving(true)
    setSaveMsg("")
    try {
      await api.put("/settings/update", settings)
      setSaveMsg("Settings saved")
    } catch (err) {
      console.error(err)
      setSaveMsg("Failed to save settings")
    } finally {
      setSaving(false)
      setTimeout(() => setSaveMsg(""), 3000)
    }
  }

  const submitPasswordChange = async (e) => {
    e.preventDefault()
    setPwMsg("")

    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwMsg("New passwords do not match")
      return
    }
    if (pwForm.newPassword.length < 6) {
      setPwMsg("New password must be at least 6 characters")
      return
    }

    setPwSaving(true)
    try {
      await api.put("/settings/change-password", {
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      })
      setPwMsg("Password updated successfully")
      setPwForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
    } catch (err) {
      setPwMsg(err.response?.data?.message || "Failed to update password")
    } finally {
      setPwSaving(false)
      setTimeout(() => setPwMsg(""), 4000)
    }
  }

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
        <h1 className="text-xl font-semibold mb-1">Settings</h1>
        <p className="text-sm text-gray-500 mb-6">
          Manage your account and site preferences
        </p>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-white/5 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-6 max-w-2xl">

            {/* Account / Password */}
            <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold mb-1">Account</h2>
              <p className="text-xs text-gray-600 mb-4">Change your admin password</p>
              <div className="relative">

              <form onSubmit={submitPasswordChange} className="flex flex-col gap-3">
                <input
                  type={showPassword? 'text':'password'}
                  placeholder="Current password"
                  value={pwForm.currentPassword}
                  onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#d4af37]/50"
                  required
                />
                <button
                          type='button'
                          onClick={()=>setShowPassword(!showPassword)}
                          className='absolute right-4 top-3 text-white/70 hover:text-white transition'
                          >
                            {showPassword? <FaEyeSlash/>:<FaEye/>}
                          </button>
                <input
                  type={showPassword? 'text': 'password'}
                  placeholder="New password"
                  value={pwForm.newPassword}
                  onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#d4af37]/50"
                  required
                />
                <input
                  type={showPassword? 'text': 'password'}
                  placeholder="Confirm new password"
                  value={pwForm.confirmPassword}
                  onChange={(e) => setPwForm({ ...pwForm, confirmPassword: e.target.value })}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#d4af37]/50"
                  required
                />

                <div className="flex items-center gap-3 mt-1">
                  <button
                    type="submit"
                    disabled={pwSaving}
                    className="bg-[#d4af37] text-black text-sm font-semibold px-4 py-2 rounded-lg hover:bg-[#e0bd4a] transition disabled:opacity-50 w-full sm:w-auto"
                  >
                    {pwSaving ? "Updating..." : "Update Password"}
                  </button>
                  {pwMsg && (
                    <span className={`text-xs ${pwMsg.includes("success") ? "text-green-400" : "text-red-400"}`}>
                      {pwMsg}
                    </span>
                  )}
                </div>
              </form>
              </div>
            </div>




            {/* Social Links */}
            <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold mb-1">Social Links</h2>
              <p className="text-xs text-gray-600 mb-4">Optional — leave blank to hide</p>

              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Instagram URL"
                  value={settings.socialLinks.instagram}
                  onChange={(e) => handleSocialChange("instagram", e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#d4af37]/50"
                />
                <input
                  type="text"
                  placeholder="LinkedIn URL"
                  value={settings.socialLinks.linkedin}
                  onChange={(e) => handleSocialChange("linkedin", e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#d4af37]/50"
                />
                <input
                  type="text"
                  placeholder="Facebook URL"
                  value={settings.socialLinks.facebook}
                  onChange={(e) => handleSocialChange("facebook", e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#d4af37]/50"
                />
                <input
  type="text"
  placeholder="WhatsApp URL"
  value={settings.socialLinks.whatsapp || ""}
  onChange={(e) => handleSocialChange("whatsapp", e.target.value)}
  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#d4af37]/50"
/>
              </div>
            </div>



            {/* Notifications */}
            <div className="bg-[#111111] border border-white/10 rounded-xl p-5">
              <h2 className="text-sm font-semibold mb-1">Notifications</h2>
              <p className="text-xs text-gray-600 mb-4">Email alerts for admin activity</p>

              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  placeholder="Notification email"
                  value={settings.enquiryNotificationEmail}
                  onChange={(e) => handleChange("enquiryNotificationEmail", e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#d4af37]/50"
                />

                <label className="flex items-center justify-between text-sm text-gray-300">
                  Notify on new enquiry
                  <input
                    type="checkbox"
                    checked={settings.notifyOnEnquiry}
                    onChange={(e) => handleChange("notifyOnEnquiry", e.target.checked)}
                    className="accent-[#d4af37] w-4 h-4"
                  />
                </label>

                <label className="flex items-center justify-between text-sm text-gray-300">
                  Notify on new review
                  <input
                    type="checkbox"
                    checked={settings.notifyOnReview}
                    onChange={(e) => handleChange("notifyOnReview", e.target.checked)}
                    className="accent-[#d4af37] w-4 h-4"
                  />
                </label>
              </div>
            </div>

            {/* Save */}
            <div className="flex items-center gap-3">
              <button
                onClick={saveSettings}
                disabled={saving}
                className="bg-[#d4af37] text-black text-sm font-semibold px-6 py-2 rounded-lg hover:bg-[#e0bd4a] transition disabled:opacity-50 w-full sm:w-auto"
              >
                {saving ? "Saving..." : "Save Settings"}
              </button>
              {saveMsg && (
                <span className={`text-xs ${saveMsg.includes("saved") ? "text-green-400" : "text-red-400"}`}>
                  {saveMsg}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminSettings