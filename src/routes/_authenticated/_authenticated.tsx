import { createFileRoute, redirect, Outlet } from '@tanstack/react-router';
import { useAuth } from '@/context/auth';// Adjust the import path as necessary

export const Route = createFileRoute('/_authenticated/_authenticated')<{
  context: { auth: { isAuthenticated: boolean } };
}>({
  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.auth || useAuth();
    if (!isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: window.location.href, // Save the attempted URL
        },
      });
    }
  },
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
});