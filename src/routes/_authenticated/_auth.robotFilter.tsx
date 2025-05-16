import { createFileRoute, useNavigate } from "@tanstack/react-router";
import RobotFilterPage from "../components/robotFilter";
import { useAuth } from "@/context/auth";

// Define types for useAuth hook
interface AuthContext {
  user: unknown; // Replace with actual user type
}

export const Route = createFileRoute("/_authenticated/_auth/robotFilter")({
  component: RobotFilter,
});

function RobotFilter() {
  const { user } = useAuth() as AuthContext;
  const navigate = useNavigate();

  if (!user) {
    navigate({ to: "/login" });
    return null;
  }

  return <RobotFilterPage />;
}