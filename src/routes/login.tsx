import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useAuth } from "@/context/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";

// Zod schema for login
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Zod schema for signup
const signupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Types for form data
type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export const Route = createFileRoute("/login")({
  beforeLoad: async ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
  component: Login,
});

function Login() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const search = Route.useSearch();

  // Form setup for login
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // Form setup for signup
  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleLogin = async (data: LoginFormData) => {
    setError(null);
    try {
      await login(data.username, data.password);
      const redirectUrl = search.redirect || "/dashboard";
      navigate({ to: redirectUrl });
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    setError(null);
    try {
      await signup(data.username, data.password); // Assuming signup method exists in useAuth
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError("Signup failed. Username may already exist.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-foreground p-4">
      <div className="w-full max-w-sm bg-primary-foreground rounded-lg shadow-2xl p-6 border-1">
         <h1 className="text-2xl font-bold text-gray-600 text-center mb-6 tracking-tight shadow-2xl">
          Dash Board
        </h1>
        {/* {search.redirect && mode === "login" && (
          <p className="bg-red-600 text-white text-center p-3 rounded-md mb-4 animate-fade-in text-sm">
            You must log in to access that page.
          </p>
        )}
        {error && (
          <p className="bg-red-600 text-white text-center p-3 rounded-md mb-4 animate-fade-in text-sm">
            {error}
          </p>
        )}  */}

        {/* Toggle between Login and Signup */}
        <div className="flex justify-center mb-4">
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={() => setMode("login")}
            className={`px-4 py-2 text-sm font-medium rounded-l-md ${
              mode === "login"
                ? "bg-blue-600 text-gray-200"
                : "bg-primary-foreground text-gray-600 cursor-pointer border-1"
            } transition-all duration-200`}
          >
            Sign In
          </button>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            onClick={() => setMode("signup")}
            className={`px-4 py-2 text-sm font-medium rounded-r-md ${
              mode === "signup"
                ? "bg-blue-600 text-gray-200"
                : "bg-primary-foreground text-gray-600 cursor-pointer border-1"
            } transition-all duration-200`}
          >
            Sign Up
          </button>
        </div>

        {/* Login Form */}
        {mode === "login" && (
          <form
            onSubmit={loginForm.handleSubmit(handleLogin)}
            className="flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="username" className="text-sm m-2 text-gray-600">
                Username
              </Label>
              <Input
                type="text"
                {...loginForm.register("username")}
                placeholder="Enter username"
                className="w-full px-3 py-2 bg-primary-foreground text-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 text-sm"
              />
              {loginForm.formState.errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {loginForm.formState.errors.username.message}
                </p>
              )}
            </div>
            <div className="relative ">
              <Label htmlFor="password" className="text-sm m-2 text-gray-600">
                Password
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                {...loginForm.register("password")}
                placeholder="Enter password"
                className="w-full px-3 py-2 bg-primary-foreground text-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 text-sm"
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent mt-4 hover:bg-primary-foreground hover:bg-opacity-100 rounded-md"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-black" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-black " />
                )}
              </Button>
              {loginForm.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 text-sm font-medium"
            >
              Login
            </Button>
          </form>
        )}

        {/* Signup Form */}
        {mode === "signup" && (
          <form
            onSubmit={signupForm.handleSubmit(handleSignup)}
            className="flex flex-col gap-4"
          >
            <div>
              <Label htmlFor="username" className="text-sm m-2 text-gray-600">
                Username
              </Label>
              <Input
                type="text"
                {...signupForm.register("username")}
                placeholder="Enter username"
                className="w-full px-3 py-2 bg-primary-foreground text-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 text-sm"
              />
              {signupForm.formState.errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {signupForm.formState.errors.username.message}
                </p>
              )}
            </div>
            <div className="relative">
              <Label htmlFor="password" className="text-sm m-2 text-gray-600">
                Password
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                {...signupForm.register("password")}
                placeholder="Enter password"
                className="w-full px-3 py-2 bg-primary-foreground text-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 text-sm"
              />
              <Button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent mt-4 hover:bg-primary-foreground hover:bg-opacity-50 rounded-md p-1"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-black" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-black" />
                )}
              </Button>
              {signupForm.formState.errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {signupForm.formState.errors.password.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-sm m-2 text-gray-600">
                Confirm Password
                </Label>
              <Input
                type={showPassword ? "text" : "password"}
                {...signupForm.register("confirmPassword")}
                placeholder="Confirm password"
                className="w-full px-3 py-2 bg-primary-foreground text-gray-800 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-200 text-sm"
              />
              {signupForm.formState.errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {signupForm.formState.errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 text-sm font-medium"
            >
              Sign Up
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
