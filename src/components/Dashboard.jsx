import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatsCards from "../components/StatsCards";
import RecentEnquiries from "../components/RecentEnquiries";
import ReviewsApproval from "../components/ReviewsApproval";
import ModulesGrid from "../components/ModulesGrid";

function Dashboard() {
  return (
    <div className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <main className="ml-[220px] flex-1 p-6">
        <Topbar />

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <RecentEnquiries />
          <ReviewsApproval />
        </div>

        <ModulesGrid />
      </main>
    </div>
  );
}

export default Dashboard;