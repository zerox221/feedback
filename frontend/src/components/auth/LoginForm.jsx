import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { useContext , useState } from "react";
import {userContext} from "../../context/userContext"

const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {user , setUser, getAllFeedbacks} = useContext(userContext);

  async function loginHandler(data){
    if(loading) return;
    setLoading(true);
    try {
        console.log("data : ",data);
        const response = await api.post("/auth/login", data);
        console.log("response : ",response);

        if(response.data.success === true){
            setUser(response.data.user);
            navigate("/dashboard");
              getAllFeedbacks();
        }
        reset();

    } catch (error) {
        if(error.response && error.response.data) {
            setErrors(error.response.data.message);
        }
        console.log("error",error);
    }finally{
        setLoading(false);
    }
  }

  return (
    <form 
    onSubmit={handleSubmit(loginHandler)}
     className="w-100 py-4 h-fit px-2 flex flex-col gap-4 border border-gray-300 rounded-md">
      <div className="flex flex-col ">
        <span className="text-2xl  text-[#0A0A0A] font-semibold">
          Welcome back
        </span>
        <span className="text-sm text-[#6B7280]">
          Sign in to view your anonymous feedback.
        </span>
      </div>

      <div className="flex flex-col ">
        <label className="text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
        {...register("email")}
          type="email"
          className="w-full border border-gray-300 p-2 rounded-md outline-none  placeholder:text-gray-400"
          placeholder="alex@gmail.com"
        />
      </div>

      <div className="flex flex-col ">
        <label className="text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
        {...register("password")}
          type="password"
          className="w-full border border-gray-300 p-2 rounded-md outline-none  placeholder:text-gray-400"
        />
      </div>

      {
        errors && <span className="text-red-500 text-sm">{errors}</span>
      }

      <div className="w-full ">
        <button className="py-2 w-full bg-black text-white font-medium" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>

      <div className="flex justify-center cursor-pointer">
        <span className="text-sm text-gray-700 ">
          Don't have an account?
          <span
            onClick={() => navigate("/register")}
            className="text-[#2563EB]"
          >
            {" "}
            Create one
          </span>
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
