import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ReviewForm = ({ sessionId, onSuccess }) => {
  const { register, handleSubmit, reset } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      const reviewData = {
        sessionId,
        reviewer: user.email,
        rating: parseInt(data.rating),
        comment: data.comment,
      };

      const res = await axiosSecure.post("/reviews", reviewData);

      if (res.data.insertedId) {
        Swal.fire("Thank you!", "Your review has been submitted.", "success");
        reset();
        onSuccess?.();
      }
    } catch (err) {
      Swal.fire("Error", err?.response?.data?.message || err.message, "error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 space-y-4 border p-4 rounded shadow bg-base-100"
    >
      <h4 className="text-lg font-semibold">Leave a Review</h4>

      <select
        {...register("rating")}
        className="select select-bordered w-full"
        required
      >
        <option value="">Select Rating</option>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} Star{r > 1 && "s"}
          </option>
        ))}
      </select>

      <textarea
        {...register("comment")}
        rows="4"
        className="textarea textarea-bordered w-full"
        placeholder="Write your feedback..."
        required
      ></textarea>

      <button type="submit" className="btn btn-primary btn-sm">
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
