import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const CreateNote = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const noteData = {
      email: user?.email,
      title: data.title,
      description: data.description,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post("/notes", noteData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Note created successfully", "success");
        reset();
      } else {
        Swal.fire("Error", "Failed to create note", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Note</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field (Read-only) */}
        <div>
          <label className="label">
            <span className="label-text">Student Email</span>
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* Title Field */}
        <div>
          <label className="label">
            <span className="label-text">Note Title</span>
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="input input-bordered w-full"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <label className="label">
            <span className="label-text">Note Description</span>
          </label>
          <textarea
            rows={5}
            {...register("description", {
              required: "Description is required",
            })}
            className="textarea textarea-bordered w-full"
          ></textarea>
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <button type="submit" className="btn btn-primary w-full">
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
