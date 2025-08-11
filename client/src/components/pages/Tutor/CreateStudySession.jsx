import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function CreateStudySession() {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      tutor: {
        tutorName: user.displayName,
        tutorEmail: user.email,
      },
      status: "pending",
    };

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to create a new study session.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Create it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.post("/sessions", payload);
        if (res.data.insertedId) {
          Swal.fire("Success", "Study session created successfully", "success");
          reset();
        }
      } catch (err) {
        Swal.fire(
          "Error",
          err.response?.data?.error || "Failed to create session",
          "error"
        );
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 bg-white rounded-xl shadow border border-secondary-gray6 mt-8">
      <h2 className="text-2xl font-bold text-primary text-center mb-6">
        Create Study Session
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 text-sm text-secondary-black2"
      >
        {/* Session Title */}
        <div>
          <input
            {...register("sessionTitle", { required: "Title is required" })}
            className="input input-bordered w-full"
            placeholder="Session Title"
          />
          {errors.title && (
            <p className="text-red-500 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Session Description */}
        <div>
          <textarea
            {...register("sessionDescription", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
            placeholder="Session Description"
          />
          {errors.description && (
            <p className="text-red-500 mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Registration Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-secondary-gray4 mb-1 block">
              Registration Start
            </label>
            <input
              type="date"
              {...register("registrationStartDate", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="text-sm text-secondary-gray4 mb-1 block">
              Registration End
            </label>
            <input
              type="date"
              {...register("registrationEndDate", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Class Dates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-secondary-gray4 mb-1 block">
              Class Start
            </label>
            <input
              type="date"
              {...register("classStartDate", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="text-sm text-secondary-gray4 mb-1 block">
              Class End
            </label>
            <input
              type="date"
              {...register("classEndDate", { required: true })}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <input
            {...register("sessionDuration")}
            className="input input-bordered w-full"
            placeholder="Session Duration (e.g. 2 weeks)"
          />
        </div>

        {/* Tutor Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            className="input input-bordered w-full bg-secondary-gray2 cursor-not-allowed"
            value={user?.displayName || ""}
            readOnly
          />
          <input
            className="input input-bordered w-full bg-secondary-gray2 cursor-not-allowed"
            value={user?.email || ""}
            readOnly
          />
        </div>

        <button
          type="submit"
          className="btn bg-primary hover:bg-primary/90 text-white w-full cursor-pointer"
        >
          Create Session
        </button>
      </form>
    </div>
  );
}
