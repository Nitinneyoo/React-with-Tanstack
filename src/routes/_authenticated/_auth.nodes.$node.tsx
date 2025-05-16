import { createFileRoute, useParams, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/context/auth";

interface AuthContext {
  user: unknown; // Replace with actual user type
}

export const Route = createFileRoute("/_authenticated/_auth/nodes/$node")({
  component: RobotNodePage,
});

function RobotNodePage() {
  const { user } = useAuth() as AuthContext;
  const { node } = useParams({ from: "/_authenticated/_auth/nodes/$node" });
  const navigate = useNavigate();

  if (!user) {
    navigate({ to: "/login" });
    return null;
  }

  // Capitalize the node for display
  const formattedNode = node.charAt(0).toUpperCase() + node.slice(1);

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Robots at {formattedNode} Node
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This page displays details about robots operating at the {formattedNode} node.
          </p>
          {/* Placeholder for node data */}
          <div className="mt-4">
            <p className="text-gray-500 italic">
              Robot data for the {formattedNode} node will be displayed here.
            </p>
          </div>
          <button
            className="mt-4 text-blue-500 text-sm"
            onClick={() => navigate({ to: "/_authenticated/_auth/robotFilter" })}
          >
            Back to Filters
          </button>
        </div>
      </div>
    </div>
  );
}