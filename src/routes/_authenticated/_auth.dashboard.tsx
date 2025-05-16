import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/context/auth";
import { Dock, DockIcon } from "@/components/magicui/dock";
import { Twitter, Linkedin, Github, Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";
// biome-ignore lint/style/useImportType: <explanation>
import { type FC } from "react";
// import { Filter } from "lucide-react";
import Filter from "../components/robotFilter";

// Define types for useAuth hook
interface AuthContext {
  user: unknown; // Replace with actual user type (e.g., { id: string; name: string })
  logout: () => Promise<void>;
}


const Dashboard: FC = () => {
  const { user, logout } = useAuth() as AuthContext;
  const router = useRouter();

  if (!user) {
    router.navigate({ to: "/login" });
    return null; // Prevent rendering until redirect
  }

  // const handleLogout = async () => {
  //   await logout();
  //   router.invalidate();
  //   router.navigate({ to: "/" });
  // };

  return (
    <div className="min-h-screen bg-primary-foreground">
      {/* Header */}
      <header className="bg-white shadow-lg">
        <div className=" flex justify-between items-center sticky top-0">
          <h1 className="text-2xl font-bold text-gray-900">Robot Dashboard</h1>
          <div className="flex items-center space-x-4">
            <Filter />
            {/* <motion.button
              type="button"
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold py-2 px-6 rounded-lg hover:from-red-600 hover:to-rose-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              Log Out
            </motion.button> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Welcome Section */}
          <motion.section
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to the Robot Dashboard
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Dive into the exciting world of robotics! Discover how robots
              operate, their diverse functions, intricate mechanics, and how
              they stack up against one another.
            </p>
          </motion.section>

          {/* How Robots Work */}
          <motion.section
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Robots Work
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Robots are intelligent machines that interact with their
              environment through a combination of <strong>sensors</strong>,{" "}
              <strong>actuators</strong>, and <strong>control systems</strong>:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Sensors</strong>: Detect environmental data (e.g.,
                cameras, LIDAR, ultrasonic sensors) to perceive surroundings.
              </li>
              <li>
                <strong>Actuators</strong>: Enable movement or manipulation
                (e.g., motors, servos, hydraulic systems).
              </li>
              <li>
                <strong>Control Systems</strong>: Process sensor data and make
                decisions using algorithms or AI (e.g., microcontrollers,
                onboard computers).
              </li>
            </ul>
          </motion.section>

          {/* Robot Functionality */}
          <motion.section
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Robot Functionality
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Robots perform a wide range of tasks depending on their design and
              purpose:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Navigation</strong>: Autonomous movement in environments
                (e.g., self-driving cars, delivery drones).
              </li>
              <li>
                <strong>Manipulation</strong>: Handling objects (e.g., robotic
                arms in manufacturing).
              </li>
              <li>
                <strong>Interaction</strong>: Communicating with humans or other
                systems (e.g., chatbots, social robots).
              </li>
            </ul>
          </motion.section>

          {/* Robot Mechanics */}
          <motion.section
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Robot Mechanics
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              The mechanical design of robots determines their physical
              capabilities:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                <strong>Joints</strong>: Enable rotation or linear movement
                (e.g., revolute joints for arms, prismatic joints for sliding).
              </li>
              <li>
                <strong>Motors</strong>: Provide power for movement (e.g., DC
                motors, stepper motors).
              </li>
              <li>
                <strong>Materials</strong>: Lightweight yet durable materials
                (e.g., aluminum, carbon fiber) ensure efficiency and strength.
              </li>
            </ul>
          </motion.section>

          {/* Robot Comparison */}
          <motion.section
            className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comparison of Robots
            </h2>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Different robots serve unique purposes. Here's a comparison:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 font-semibold text-gray-900">Type</th>
                    <th className="p-4 font-semibold text-gray-900">
                      Primary Use
                    </th>
                    <th className="p-4 font-semibold text-gray-900">
                      Key Features
                    </th>
                    <th className="p-4 font-semibold text-gray-900">
                      Examples
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-700">Industrial</td>
                    <td className="p-4 text-gray-700">Manufacturing</td>
                    <td className="p-4 text-gray-700">
                      High precision, repetitive tasks
                    </td>
                    <td className="p-4 text-gray-700">KUKA, FANUC</td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-700">Humanoid</td>
                    <td className="p-4 text-gray-700">Research, Assistance</td>
                    <td className="p-4 text-gray-700">
                      Human-like movement, interaction
                    </td>
                    <td className="p-4 text-gray-700">
                      Boston Dynamics Atlas, SoftBank Pepper
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-700">Service</td>
                    <td className="p-4 text-gray-700">Domestic, Healthcare</td>
                    <td className="p-4 text-gray-700">
                      Autonomy, user-friendly interfaces
                    </td>
                    <td className="p-4 text-gray-700">
                      Roomba, Da Vinci Surgical System
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <Dock className="bg-gray-800/50 backdrop-blur-md rounded-full p-4 shadow-lg">
              <DockIcon>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition duration-300 p-2 rounded-full hover:bg-gray-700/50 hover:scale-110"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </DockIcon>
              <DockIcon>
                <a
                  href="https://www.linkedin.com/in/nitinneyoo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition duration-300 p-2 rounded-full hover:bg-gray-700/50 hover:scale-110"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              </DockIcon>
              <DockIcon>
                <a
                  href="https://github.com/Nitinneyoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition duration-300 p-2 rounded-full hover:bg-gray-700/50 hover:scale-110"
                >
                  <Github className="h-6 w-6" />
                </a>
              </DockIcon>
              <DockIcon>
                <a
                  href="https://www.instagram.com/neyooo_27/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition duration-300 p-2 rounded-full hover:bg-gray-700/50 hover:scale-110"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </DockIcon>
              <DockIcon>
                <a
                  href="mailto:?subject=Check out Robot Dashboard&body=Explore the world of robotics: https://robotdashboard.com"
                  className="text-gray-300 hover:text-white transition duration-300 p-2 rounded-full hover:bg-gray-700/50 hover:scale-110"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </DockIcon>
            </Dock>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const Route = createFileRoute("/_authenticated/_auth/dashboard")({
  component: Dashboard,
});
