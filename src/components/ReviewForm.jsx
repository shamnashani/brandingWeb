import React, { useState } from "react";
import api from "./Api";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ReviewForm = ({ presetService }) => {
  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    rating: 0,
    service: presetService || "",
    message: "",
  });

  const [reviewSubmit, setReviewSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const ReviewSub = async (e) => {
    e.preventDefault();

    if (!reviewData.rating) {
      alert("Please select a star rating");
      return;
    }

    setLoading(true);

    try {
      await api.post("/rev/add-review", reviewData);

      setReviewData({
        name: "",
        email: "",
        rating: 0,
        service: presetService || "",
        message: "",
      });

      setReviewSubmit(true);
    } catch (err) {
      alert("Failed to submit review");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setReviewSubmit(false);
  };

  return (
    <>
    <Navbar/>
    <section className="bg-[#0A0A0A] py-28 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-[#d4af37] uppercase tracking-[0.3em] text-xs">
            Client Feedback
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Leave A Review
          </h2>

          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            We'd love to hear about your experience working with us.
          </p>
        </div>

        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8">

          {reviewSubmit ? (
            <div className="text-center py-10">
              <div className="text-5xl mb-4">✅</div>

              <h3 className="text-2xl font-semibold text-white">
                Review Submitted
              </h3>

              <p className="text-gray-400 mt-3">
                Thank you for your feedback.
                Your review will appear after admin approval.
              </p>

              <button
                onClick={resetForm}
                className="mt-6 text-[#d4af37] hover:underline"
              >
                Leave another review
              </button>
            </div>
          ) : (
            <form onSubmit={ReviewSub} className="flex flex-col gap-5">

              {/* Name */}
              <input
                type="text"
                placeholder="Your Name"
                value={reviewData.name}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    name: e.target.value,
                  })
                }
                required
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#d4af37]/50 transition"
              />

              {/* Email */}
              <input
                type="email"
                placeholder="Your Email"
                value={reviewData.email}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    email: e.target.value,
                  })
                }
                required
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#d4af37]/50 transition"
              />

              {/* Service Select */}
              {!presetService && (
                <select
                  value={reviewData.service}
                  onChange={(e) =>
                    setReviewData({
                      ...reviewData,
                      service: e.target.value,
                    })
                  }
                  required
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-[#d4af37]/50 transition"
                >
                  <option value="" disabled className="bg-[#111111]">
                    This review is about...
                  </option>

                  <option value="Film" className="bg-[#111111]">
                    Film Division
                  </option>

                  <option value="Construction" className="bg-[#111111]">
                    Construction & Interior
                  </option>

                  <option value="Technology" className="bg-[#111111]">
                    StudioBits Technology
                  </option>
                </select>
              )}

              {/* Locked Service */}
              {presetService && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  Reviewing:

                  <span className="bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 rounded-full font-medium">
                    {presetService === "Technology"
                      ? "StudioBits Technology"
                      : presetService}
                  </span>
                </div>
              )}

              {/* Rating */}
              <div>
                <p className="text-gray-400 mb-2">
                  Rating
                </p>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setReviewData({
                          ...reviewData,
                          rating: star,
                        })
                      }
                      className={`text-3xl transition-transform hover:scale-110 ${
                        star <= reviewData.rating
                          ? "text-[#d4af37]"
                          : "text-gray-600"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <textarea
                rows={5}
                required
                placeholder="Share your experience..."
                value={reviewData.message}
                onChange={(e) =>
                  setReviewData({
                    ...reviewData,
                    message: e.target.value,
                  })
                }
                className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 outline-none focus:border-[#d4af37]/50 transition resize-none"
              />

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="bg-[#d4af37] text-black py-3 rounded-lg font-semibold uppercase tracking-[0.2em] text-xs hover:brightness-110 transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Review"}
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default ReviewForm;