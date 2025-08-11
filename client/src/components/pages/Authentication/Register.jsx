import React, { use, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import SocialLogin from "./SocialLogin";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { createUser, updateUserProfile } = useAuth();
  const [profilePic, setProfilePic] = useState("");
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(async () => {
        // update userinfo in the database
        const userInfo = {
          name: data.name,
          email: data.email,
          role: "student", // default role
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        await axiosInstance.post("/users", userInfo);

        // update user profile in firebase
        const userProfile = {
          displayName: data.name,
          photoURL: profilePic,
        };
        updateUserProfile(userProfile)
          .then(() => {
            navigate(from);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];

    const formData = new FormData();
    formData.append("image", image);

    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMGBB_API_KEY
    }`;
    const res = await axios.post(imagUploadUrl, formData);

    setProfilePic(res.data.data.url);
  };

  return (
    <div className="card bg-white w-full max-w-lg mx-auto shadow-lg  border-gray-200 rounded-lg">
      <div className="card-body p-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Create Account</h1>
        <p className="text-secondary-gray1 mb-6 text-sm">
          Join now and start learning with expert tutors.
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="space-y-4">
            {/* Name field */}
            <div>
              <label className="label text-sm font-medium text-secondary-black2">
                Your Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">Name is required</p>
              )}
            </div>

            {/* Profile Picture */}
            <div>
              <label className="label text-sm font-medium text-secondary-black2">
                Profile Picture
              </label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="file-input file-input-bordered w-full"
              />
            </div>

            {/* Email field */}
            <div>
              <label className="label text-sm font-medium text-secondary-black2">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">Email is required</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label className="label text-sm font-medium text-secondary-black2">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                className="input input-bordered w-full"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-sm text-red-500 mt-1">
                  Password is required
                </p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-sm text-red-500 mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Forgot password link */}
            <div className="text-right">
              <a className="link link-hover text-sm text-primary">
                Forgot password?
              </a>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="btn w-full bg-primary text-white hover:bg-primary/90 mt-2"
            >
              Register
            </button>
          </fieldset>

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </form>

        {/* Social Login Component */}
        <div className="mt-6">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
