import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";

const registrationSchema = z.object({
  userName: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"),

  email: z.email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100)
    .regex(/(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
    .regex(/(?=.*[a-z])/, "Password must contain at least one lowercase letter")
    .regex(/(?=.*[0-9])/, "Password must contain at least one number"),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registrationSchema),
  });
  const { email, setEmail } = useContext(userContext);
  const userName = watch("userName");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  const navigate = useNavigate();

  async function signupHandler(data) {
    if (loading) return;
    setLoading(true);
    try {
      console.log(data);
      const response = await api.post("/auth/register", data);

      if (response.data.success === true) {
        setEmail(data.email);
        navigate("/verify");
      }
      reset();
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      }
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!userName || userName.trim() === "") {
      return;
    }

    const timeOut = setTimeout(async () => {
      try {
        const response = await api.post("/user/check-username", {
          userName: userName,
        });
        console.log("response : ", response);

        if (response.data.success === true) {
          setIsUsernameAvailable(true);
        } else {
          setIsUsernameAvailable(false);
        }
      } catch (err) {
        if (err.response && err.response.data) {
          setError(err.response.data.message);
        }
        console.log("error in checking username : ", err);
      }
    }, 500);

    return () => clearTimeout(timeOut);
  }, [userName]);

  return (
    <form
      onSubmit={handleSubmit(signupHandler)}
      className="w-100 h-fit py-4 px-2 border flex flex-col gap-4 border-gray-300 rounded-md"
    >
      <div className="flex flex-col ">
        <label className="text-sm font-medium" htmlFor="userName">
          Username
        </label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-md outline-none p-2 placeholder:text-gray-400"
          placeholder="alex123"
          {...register("userName")}
        />
        {errors.userName ? (
          <span className="text-red-500 text-sm">
            {errors.userName.message}
          </span>
        ) : userName ? (
          isUsernameAvailable ? (
            <span className="text-green-500 text-xs">
              Username is available
            </span>
          ) : (
            <span className="text-red-500 text-xs">
              Username is already taken
            </span>
          )
        ) : null}
      </div>

      <div className="flex flex-col ">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          className="w-full border border-gray-300 rounded-md outline-none p-2 placeholder:text-gray-400"
          placeholder="alex@gmai.com"
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>

      <div className="flex flex-col ">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="w-full border border-gray-300 rounded-md p-2 outline-none"
          {...register("password")}
        />
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}

      <div className="w-full mt-4">
        <button
          className="w-full text-center py-2 bg-black text-white font-medium"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </div>

      <div className="flex justify-center cursor-pointer">
        <span className="text-sm text-gray-700 ">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="text-[#2563EB]">
            Sign in
          </span>
        </span>
      </div>
    </form>
  );
};

export default RegisterForm;
