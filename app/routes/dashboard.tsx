import type { Route } from "./+types/dashboard";
import DashboardPage from "../pages/Dashboard";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { Navigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard • FleetPulse" },
    { name: "description", content: "Overview KPIs" },
  ];
}

export default function DashboardRoute() {
  const isAuthed = useSelector((s: RootState) => Boolean(s.auth.user));
  const session: any = useSelector((s: RootState) => s.auth.session);
  const emailConfirmed = Boolean(session?.user?.email_confirmed_at || session?.user?.confirmed_at);
  if (!isAuthed) return <Navigate to="/login" replace />;
  if (!emailConfirmed) return <Navigate to="/verify" replace />;
  return <DashboardPage />;
}


