import type { Route } from "./+types/verify";
import VerifyNoticePage from "../pages/VerifyNotice";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Verify Email • FleetPulse" },
    { name: "description", content: "Please verify your email to continue." },
  ];
}

export default function VerifyRoute() {
  return <VerifyNoticePage />;
}


