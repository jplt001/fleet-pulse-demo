import type { Route } from "./+types/home";
import Landing from "../pages/Landing";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "FleetPulse • Fleet Management" },
    { name: "description", content: "Run your fleet with confidence." },
  ];
}

export default function Home() {
  return <Landing />;
}
