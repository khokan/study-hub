import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const UploadMaterials = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Fetch approved sessions for dropdown
  const { data: sessions = [] } = useQuery({
    queryKey: ["approvedSessions", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/sessions/?email=${user.email}&status=approved`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ✅ Form submission handler
  const onSubmit = async (data) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        { method: "POST", body: formData }
      );

      const imgData = await imgRes.json();
      const imageUrl = imgData.data.url;

      const materialData = {
        title: data.title,
        sessionId: data.sessionId,
        tutorEmail: user.email,
        image: imageUrl,
        driveLink: data.driveLink,
      };

      await axiosSecure.post("/materials", materialData);
      Swal.fire("Success", "Material uploaded successfully!", "success");
      reset();
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-6 py-8 bg-white border border-secondary-gray6 shadow rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">
        Upload Study Material
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-sm">
        {/* Title */}
        <div>
          <label className="text-secondary-black2 font-medium mb-1 block">Material Title</label>
          <input
            {...register("title", { required: true })}
            placeholder="Enter material title"
            className="input input-bordered w-full"
          />
          {errors.title && <p className="text-red-500 mt-1">Title is required</p>}
        </div>

        {/* Session Selector */}
        <div>
          <label className="text-secondary-black2 font-medium mb-1 block">Select Session</label>
          <select
            {...register("sessionId", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">-- Choose approved session --</option>
            {sessions.map((s) => (
              <option key={s._id} value={s._id}>
                {s.sessionTitle}
              </option>
            ))}
          </select>
          {errors.sessionId && <p className="text-red-500 mt-1">Session selection is required</p>}
        </div>

        {/* Tutor Email (readonly) */}
        <div>
          <label className="text-secondary-black2 font-medium mb-1 block">Tutor Email</label>
          <input
            value={user?.email}
            readOnly
            className="input input-bordered w-full bg-secondary-gray2 text-secondary-black2"
          />
        </div>

        {/* Image File */}
        <div>
          <label className="text-secondary-black2 font-medium mb-1 block">Upload Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            className="file-input file-input-bordered w-full cursor-pointer"
          />
          {errors.image && <p className="text-red-500 mt-1">Image is required</p>}
        </div>

        {/* Google Drive Link */}
        <div>
          <label className="text-secondary-black2 font-medium mb-1 block">Google Drive Link</label>
          <input
            type="url"
            {...register("driveLink", { required: true })}
            placeholder="Paste the Drive link"
            className="input input-bordered w-full"
          />
          {errors.driveLink && <p className="text-red-500 mt-1">Drive link is required</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={uploading}
          className="btn btn-primary w-full text-white cursor-pointer"
        >
          {uploading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Upload Material"
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadMaterials;
