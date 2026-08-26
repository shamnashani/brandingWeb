import { useEffect, useState } from "react";
import StatCard from "./StatCard";
import { MessageSquare, Star, Users } from "lucide-react";
import api from "./Api";

function StatsCards({ refresh }) {
  const [enquiry, setEnquiries] = useState(0);
  const [user, setUser] = useState(0);
  const [review, setReviews] = useState(0);
  const [todayEnquiries, setTodayEnquiries] = useState(0);

  useEffect(() => {
    fetchData();
    fetchUser();
    fetchTodayEnquiries();
    fetchReview();
  }, [refresh]);

  const fetchData = async () => {
    try {
      const res = await api.get("/enquiry/all");
      setEnquiries(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await api.get("/user/all");
      setUser(res.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  // Same source of truth as ReviewsApproval — array of pending reviews, take .length
  const fetchReview = async () => {
    try {
      const res = await api.get("/rev/pending-reviews");
      setReviews(Array.isArray(res.data) ? res.data.length : 0);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTodayEnquiries = async () => {
    try {
      const res = await api.get("/enquiry/today-count");
      setTodayEnquiries(res.data.count);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      <StatCard
        icon={<MessageSquare className="text-yellow-500" />}
        label="Total enquiries"
        value={enquiry}
        sub={`${todayEnquiries} new today`}
      />
      <StatCard
        icon={<Star className="text-yellow-500" />}
        label="Reviews pending"
        value={review}
        sub="Awaiting approval"
      />
      <StatCard icon={<Users className="text-yellow-500" />} label="Registered users" value={user} />
    </div>
  );
}

export default StatsCards;