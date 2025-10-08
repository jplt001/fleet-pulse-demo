import type { Route } from "./+types/register";
import RegisterPage from "../pages/Register";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Register • FleetPulse" },
    { name: "description", content: "Create a FleetPulse account" },
  ];
}

export default function RegisterRoute() {
  return <RegisterPage />;
}


