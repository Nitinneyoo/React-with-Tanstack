import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";
import { useAuth } from "@/context/auth";

interface AuthContext {
  user: unknown; // Replace with actual user type
}

export const Route = createFileRoute("/_authenticated/_auth/robots/$type")({
  component: RobotTypePage,
});

function RobotTypePage() {
  const { user } = useAuth() as AuthContext;
  const { type } = useParams({ from: "/_authenticated/_auth/robots/$type" });
  const { navigate } = useRouter();

  if (!user) {
    navigate({ to: "/login" });
    return null;
  }

  // Capitalize the type for display
  const formattedType = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {formattedType} Robots
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This page displays details about {formattedType} robots. Here you
            can find a list of robots that match this type.
          </p>
          {/* Placeholder for robot data */}
          <div className="mt-4">
            <p className="text-gray-500 italic">
              Robot data will be displayed here (e.g., list of {formattedType}{" "}
              robots).
            </p>
          </div>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
          <button
            className="mt-4 text-blue-500 text-sm"
            onClick={() =>
              navigate({ to: "/_authenticated/_auth/robotFilter" })
            }
          >
            Back to Filters
          </button>
        </div>
      </div>
    </div>
  );
}
