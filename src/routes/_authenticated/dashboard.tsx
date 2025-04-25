import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/context/auth";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    signOut();
    router.invalidate();
    router.navigate({ to: "/login" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Robot Dashboard</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold py-2 px-4 rounded-md hover:from-red-600 hover:to-rose-700 transition duration-300"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px SIX lg:px-8">
        <div className="space-y-12">
          {/* Welcome Section */}
          <section className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome to the Robot Dashboard
            </h2>
            <p className="text-gray-600">
              Explore the fascinating world of robotics! Learn how robots work,
              their functions, mechanics, and how they compare to one another.
            </p>
          </section>

          {/* How Robots Work */}
          <section className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              How Robots Work
            </h2>
            <p className="text-gray-600 mb-4">
              Robots are intelligent machines that interact with their
              environment through a combination of <strong>sensors</strong>,{" "}
              <strong>actuators</strong>, and <strong>control systems</strong>:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
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
          </section>

          {/* Robot Functionality */}
          <section className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Robot Functionality
            </h2>
            <p className="text-gray-600 mb-4">
              Robots perform a wide range of tasks depending on their design and
              purpose:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
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
          </section>

          {/* Robot Mechanics */}
          <section className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Robot Mechanics
            </h2>
            <p className="text-gray-600 mb-4">
              The mechanical design of robots determines their physical
              capabilities:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
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
          </section>

          {/* Robot Comparison */}
          <section className="bg-white p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Comparison of Robots
            </h2>
            <p className="text-gray-600 mb-4">
              Different robots serve unique purposes. Here's a comparison:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-4 font-semibold text-gray-800">Type</th>
                    <th className="p-4 font-semibold text-gray-800">
                      Primary Use
                    </th>
                    <th className="p-4 font-semibold text-gray-800">
                      Key Features
                    </th>
                    <th className="p-4 font-semibold text-gray-800">
                      Examples
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-4 text-gray-600">Industrial</td>
                    <td className="p-4 text-gray-600">Manufacturing</td>
                    <td className="p-4 text-gray-600">
                      High precision, repetitive tasks
                    </td>
                    <td className="p-4 text-gray-600">KUKA, FANUC</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 text-gray-600">Humanoid</td>
                    <td className="p-4 text-gray-600">Research, Assistance</td>
                    <td className="p-4 text-gray-600">
                      Human-like movement, interaction
                    </td>
                    <td className="p-4 text-gray-600">
                      Boston Dynamics Atlas, SoftBank Pepper
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-4 text-gray-600">Service</td>
                    <td className="p-4 text-gray-600">Domestic, Healthcare</td>
                    <td className="p-4 text-gray-600">
                      Autonomy, user-friendly interfaces
                    </td>
                    <td className="p-4 text-gray-600">
                      Roomba, Da Vinci Surgical System
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                &copy; 2025 RobotTech Inc. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Twitter
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
