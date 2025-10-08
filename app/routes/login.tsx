import type { Route } from "./+types/login";
import LoginPage from "../pages/Login";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Login • FleetPulse" },
    { name: "description", content: "Sign in to FleetPulse" },
  ];
}

export default function LoginRoute() {
  return <LoginPage />;
}


