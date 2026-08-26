import React, { useEffect, useState } from 'react'
import api from './Api'
import { Star } from "lucide-react";
const ReviewsList = () => {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/rev/approved')
        setReviews(res.data)
        console.log(reviews);
      } catch (err) {
        console.log(err)
      }
    }
    fetch()
  }, [])

  if (reviews.length === 0) return (
    <p className="text-center text-gray-500 text-sm">
      No reviews yet. Be the first to review!
    </p>
  )

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((rev) => (
        <div key={rev._id} className="border border-white/10 bg-[#111111] p-6">
          <div className="flex text-[#d4af37] text-lg mb-3">
            {"★".repeat(rev.rating)}{"☆".repeat(5 - rev.rating)}
          </div>
          <p className="text-gray-400 text-sm leading-6 italic">
            "{rev.message}"
          </p>
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="text-white font-light">{rev.name}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
export default ReviewsList