import React from "react";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "../../api/axios";

const VerifyForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const { email } = useContext(userContext);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  async function verificationHandler(data) {
    if (data.otp.trim() === "" || data.otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    if (loading) return;
    setLoading(true);
    try {
      data.email = email;

      const response = await api.post("/auth/verify", data);
      console.log("response : ", response);
      if (response.data.success === true) {
        toast.success("Email verified successfully");
        reset();
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      }
      console.log("error in verification");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(verificationHandler)}
      className="w-full max-w-md mx-auto p-6 flex border border-gray-300 rounded-md  flex-col gap-6 font-sans bg-white"
    >
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Verify your email
        </h1>
        <p className="text-sm text-gray-500">
          We sent a verification code to your email address.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <input
          {...register("otp")}
          type="text"
          maxLength={6}
          placeholder=""
          className="w-full h-12 text-center text-xl tracking-[0.75em] font-medium border border-gray-200 rounded-lg outline-none focus:border-black focus:ring-1 focus:ring-black transition-all bg-white shadow-sm"
        />
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}

      <div className="w-full flex flex-col gap-4">
        <button
          disabled={loading}
          className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
        >
          {loading ? "Verifying..." : "Verify Email"}
        </button>

        <div className="flex items-center justify-between text-sm text-blue-600 font-normal px-1">
          <button
            onClick={() => navigate("/register")}
            type="button"
            className="hover:underline"
          >
            Change email
          </button>
          <button type="button" className="hover:underline">
            Resend code
          </button>
        </div>
      </div>
    </form>
  );
};

export default VerifyForm;
