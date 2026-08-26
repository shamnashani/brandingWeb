import React, { useEffect, useState } from "react";
import api from "./Api";

function ReviewsApproval({ refreshCount }) {
  const [reviews, setReviews] = useState([]);
  const [removing, setRemoving] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await api.get("/rev/pending-reviews");
      setReviews(res.data.slice(0, 5));
    } catch (err) {
      console.log(err);
    }
  };

  const approveReview = async (id) => {
    setRemoving((prev) => [...prev, id]);
    setTimeout(async () => {
      try {
        await api.put(`/rev/approve/${id}`);
        setReviews((prev) => prev.filter((item) => item._id !== id));
        refreshCount();
      } catch (err) {
        console.log(err);
        setRemoving((prev) => prev.filter((r) => r !== id)); // roll back on failure
      }
    }, 300);
  };

  const deleteReview = async (id) => {
    setRemoving((prev) => [...prev, id]);
    setTimeout(async () => {
      try {
        await api.delete(`/rev/delete/${id}`);
        setReviews((prev) => prev.filter((item) => item._id !== id));
        refreshCount();
      } catch (err) {
        console.log(err);
        setRemoving((prev) => prev.filter((r) => r !== id)); // roll back on failure
      }
    }, 300);
  };

  return (
    <div className="bg-[#111] border border-[#222] rounded-xl p-4 sm:p-5">
      <h3 className="mb-4 text-lg font-semibold text-white">Reviews Awaiting Approval</h3>

      {reviews.length === 0 ? (
        <p className="text-gray-500 text-sm">No pending reviews</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className={`bg-[#161616] rounded-lg p-4 mb-3 transition-all duration-300 ${
              removing.includes(review._id) ? "opacity-0 translate-x-10" : "opacity-100"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-medium break-words">
                  {review.name}
                  <span className="text-yellow-500 ml-2">{"★".repeat(review.rating)}</span>
                </h4>
                <p className="text-xs text-gray-500 mt-1 break-words">{review.message}</p>
                {review.service && (
                  <span className="inline-block mt-2 text-xs px-2 py-1 rounded-full bg-cyan-900/40 text-cyan-400">
                    {review.service}
                  </span>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <button
                  onClick={() => approveReview(review._id)}
                  className="bg-green-900 hover:bg-green-800 text-green-400 px-4 py-2 rounded text-sm w-full sm:w-auto transition"
                >
                  Approve
                </button>
                <button
                  onClick={() => deleteReview(review._id)}
                  className="bg-red-900 hover:bg-red-800 text-red-400 px-4 py-2 rounded text-sm w-full sm:w-auto transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewsApproval;