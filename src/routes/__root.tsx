import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { useAuth } from "@/context/auth";

import { motion } from "framer-motion";
// Assuming Lucide icons are installed for hamburger/close icons

export const Route = createRootRoute({
  component: Root,
});

function Root() {
  const { isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = (): void => {
    logout();
    navigate({ to: "/" });
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center sm:md:lg:*:**:not-[]:">
          {/* Logo/Brand */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Anscer Robotics{" "}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-200 [&.active]:bg-blue-600 [&.active]:font-bold"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-200 [&.active]:bg-blue-600 [&.active]:font-bold"
            >
              About
            </Link>
            <Link
              to="/product"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-200 [&.active]:bg-blue-600 [&.active]:font-bold"
            >
              Product
            </Link>
            <Link
              to="/solution"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-200 [&.active]:bg-blue-600 [&.active]:font-bold"
            >
              Solution
            </Link>
            <Link
              to="/details"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-200 [&.active]:bg-blue-600 [&.active]:font-bold"
            >
              Details
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-200 [&.active]:bg-blue-600 [&.active]:font-bold"
                >
                  DashBoard
                </Link>
                <Link
                  to="/fleet"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-200 [&.active]:bg-blue-600 [&.active]:font-bold"
                >
                  Fleet
                </Link>
                <motion.button
                  type="button"
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-red-600 hover:to-rose-700 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ opacity: [1, 0.8, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  Log Out
                </motion.button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:scale-105 transition-all duration-200 [&.active]:bg-blue-600 [&.active]:font-bold"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden lg:hidden bg-gray-800 px-4 py-2">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors [&.active]:bg-blue-600 [&.active]:font-bold"
              onClick={toggleMobileMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors [&.active]:bg-blue-600 [&.active]:font-bold"
              onClick={toggleMobileMenu}
            >
              About
            </Link>
            <Link
              to="/product"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors [&.active]:bg-blue-600 [&.active]:font-bold"
              onClick={toggleMobileMenu}
            >
              Product
            </Link>
            <Link
              to="/solution"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors [&.active]:bg-blue-600 [&.active]:font-bold"
              onClick={toggleMobileMenu}
            >
              Solution
            </Link>
            <Link
              to="/details"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors [&.active]:bg-blue-600 [&.active]:font-bold"
              onClick={toggleMobileMenu}
            >
              Details
            </Link>

            <Link
              to="/login"
              className="block px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors [&.active]:bg-blue-600 [&.active]:font-bold"
              onClick={toggleMobileMenu}
            >
              Login
            </Link>
          </div>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}
