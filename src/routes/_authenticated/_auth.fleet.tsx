import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authenticated/_auth/fleet')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authenticated/_auth/fleet"!</div>
}
