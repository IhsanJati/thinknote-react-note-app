import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "../lib/data";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema, type RegisterFormValues } from "../lib/zod";

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser({
        name: values.name,
        email: values.email,
        password: values.password,
      });
      navigate("/login");
    } catch {
      alert("Register failed");
    }
  };

  const inputStyle = `appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
    focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <div className="mt-1">
          <input
            {...register("name")}
            className={`${inputStyle} ${errors.name ? "border-red-300" : "border-gray-300"}`}
            placeholder="John Doe"
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-xs text-red-600 font-medium">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="mt-1">
          <input
            {...register("email")}
            className={`${inputStyle} ${errors.email ? "border-red-300" : "border-gray-300"}`}
            placeholder="you@example.com"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-xs text-red-600 font-medium">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            {...register("password")}
            className={`${inputStyle} ${errors.password ? "border-red-300" : "border-gray-300"}`}
            placeholder="••••••••"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-600 font-medium">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="mt-1">
          <input
            type="password"
            {...register("confirmPassword")}
            className={`${inputStyle} ${errors.confirmPassword ? "border-red-300" : "border-gray-300"}`}
            placeholder="••••••••"
          />
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-600 font-medium">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex items-center justify-center rounded-md text-sm font-medium bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 px-4 py-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isSubmitting ? "Registering..." : "Register"}
      </button>

      <p className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Login
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
