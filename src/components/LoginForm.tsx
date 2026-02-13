import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema, type LoginFormValues } from "../lib/zod";
import { useAuth } from "../contexts/AuthContext";

const LoginForm = () => {
  const {login} = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login({
        email: values.email,
        password: values.password,
      });
      console.log("Redirect login succes")
      navigate("/");
    } catch {
      alert("Login failed");
    }
  };

  const inputStyle = `appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 
    focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <div className="mt-1">
          <input
            {...register("email")}
            className={`${inputStyle} ${
              errors.email ? "border-red-300" : "border-gray-300"
            }`}
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
            className={`${inputStyle} ${
              errors.password ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="••••••••"
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-600 font-medium">
            {errors.password.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>
      <p className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
