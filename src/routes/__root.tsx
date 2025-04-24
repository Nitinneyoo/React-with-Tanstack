import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";
import { Menu, X } from "lucide-react"; // Assuming Lucide icons are installed for hamburger/close icons

const RootComponent: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="text-2xl font-bold tracking-tight">
            Robotics Guard
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
          <div className="md:hidden bg-gray-800 px-4 py-2">
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
          </div>
        )}
      </nav>
      <main>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
