import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import StatsCards from "./StatsCards";
import RecentEnquiries from "./RecentEnquiries";
import ReviewsApproval from "./ReviewsApproval";
import ModulesGrid from "./ModulesGrid";
import Navbar from "./Navbar";

function AdminHome() {
  const [reviewRefresh, setReviewRefresh] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>

      <div className="min-h-screen bg-[#0A0A0A] text-white flex">
        <Sidebar
          newEnquiryCount={0}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <main
          className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${
            collapsed ? "md:ml-[72px]" : "md:ml-[220px]"
          }`}
        >
          <Topbar />

          <StatsCards refresh={reviewRefresh} />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            <RecentEnquiries />
            <ReviewsApproval refreshCount={() => setReviewRefresh((prev) => !prev)} />
          </div>

          <ModulesGrid />
        </main>
      </div>
    </>
  );
}

export default AdminHome;