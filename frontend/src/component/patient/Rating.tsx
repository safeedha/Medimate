import { useState, useEffect,useCallback } from 'react'
import Rating from '@mui/material/Rating'
import toast, { Toaster } from 'react-hot-toast'
import { createReview, getReview, getAverage } from '../../api/userapi/rating'
import type {IDoctorReview } from '../../Interface/interface';

export default function DoctorRating({ doctorId }: { doctorId: string }) {
  const [rating, setRating] = useState<number | null>(0)
  const [comment, setComment] = useState('')
  const [reviews, setReviews] = useState<IDoctorReview[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [total, setTotal] = useState<number>(0)
  const [average, setAverage] = useState<number>(0)
  const limit = 3

const fetchData = useCallback(async () => {
  try {
    const result = await getReview(doctorId, currentPage, limit);
    setReviews(result.reviews);
    setTotal(result.total);

    const count = await getAverage(doctorId);
    setAverage(count);
  } catch (error) {
    console.error("Failed to fetch data:", error);
    toast.error("Something went wrong while loading reviews.");
  }
}, [doctorId, currentPage, limit]);

useEffect(() => {
  fetchData();
}, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!rating || !comment) {
      toast.error('Please fill in all fields')
      return
    }
    await createReview(comment, rating, doctorId)
    toast.success('Review submitted successfully')
    setRating(0)
    setComment('')
    fetchData()
  }

  const totalPages = Math.ceil(total / limit)

  return (
    <div className="bg-white shadow-md rounded-md p-4 mt-8 mx-auto max-w-5xl">
      <h1 className="text-lg font-semibold text-gray-800 mb-2">Doctor Ratings & Reviews</h1>
      <Toaster />

      {/* Average Rating */}
      <div className="flex items-center space-x-3 mb-4">
        <Rating name="read-only" value={average} precision={0.1} readOnly />
        <p className="text-sm text-gray-600">{average} out of 5 ({total} reviews)</p>
      </div>

      {/* Reviews List */}
      <div className="space-y-4 mb-6">
        {reviews.map((review, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-sm">
              {typeof review?.userId === 'object' && review?.userId?.firstname
                ? review.userId.firstname
                : 'Anonymous'}
            </h3>
              <Rating
                name={`rating-${index}`}
                value={review.rating}
                precision={0.5}
                readOnly
                size="small"
              />
            </div>
            <p className="text-xs text-gray-600">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mb-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 px-2 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Review Form */}
      <form
        className="bg-teal-50 p-4 rounded-md space-y-3"
        onSubmit={handleSubmit}
      >
        <h2 className="text-sm font-medium text-gray-700">Leave a Review</h2>

        <Rating
        name="new-rating"
        value={rating}
        precision={0.5}
        onChange={(_, newValue) => setRating(newValue)}
      />

        <textarea
          placeholder="Write your feedback..."
          className="w-full border rounded px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-1.5 rounded hover:bg-teal-700 transition text-sm"
        >
          Submit Review
        </button>
      </form>
    </div>
  )
}
