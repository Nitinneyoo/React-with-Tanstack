import { createFileRoute, useRouter, useSearch } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/context/auth";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  const { signIn, isAuthenticated } = useAuth();
  const router = useRouter();
  const search = useSearch({ from: "/login" });
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showModal, setShowModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      setError("Please fill in all fields");
      return;
    }
    const token = "sample-jwt-token"; // Simulate API call
    signIn(token);
    router.invalidate();
    router.navigate({ to: search.redirect || "/dashboard" });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }
    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const token = "sample-jwt-token"; // Simulate API call
    signIn(token);
    setShowModal(false);
    router.invalidate();
    router.navigate({ to: search.redirect || "/dashboard" });
  };

  const openSignupModal = () => {
    setMode("signup");
    setShowModal(true);
    setError("");
    setSignupForm({ email: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {mode === "login" ? "Login To Get Access" : "Create Account"}
        </h2>

        {isAuthenticated ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">You're already logged in!</p>
            <button
              type="button"
              onClick={() =>
                router.navigate({ to: search.redirect || "/dashboard" })
              }
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-4 rounded-md hover:from-blue-600 hover:to-indigo-700 transition duration-300"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div>
            {mode === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <p className="text-red-500 text-sm text-center">{error}</p>
                )}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your password"
                    required
                    type="password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold py-3 px-4 rounded-md hover:from-green-600 hover:to-teal-700 transition duration-300"
                >
                  Sign In
                </button>
              </form>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {mode === "login"
                  ? "Don't have an account?"
                  : "Already have an account?"}
              </p>
              <button
                type="button"
                onClick={() =>
                  mode === "login" ? openSignupModal() : setMode("login")
                }
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sign-Up Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              Sign Up
            </h2>
            <form onSubmit={handleSignup} className="space-y-4">
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={signupForm.password}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, password: e.target.value })
                  }
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  value={signupForm.confirmPassword}
                  onChange={(e) =>
                    setSignupForm({
                      ...signupForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold py-3 px-4 rounded-md hover:from-green-600 hover:to-teal-700 transition duration-300"
              >
                Create Account
              </button>
            </form>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="mt-4 w-full text-gray-600 hover:text-gray-800 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
