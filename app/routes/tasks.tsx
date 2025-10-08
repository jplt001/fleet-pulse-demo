import type { Route } from "./+types/tasks";
import TasksPage from "../pages/tasks/index";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tasks • FleetPulse" },
    { name: "description", content: "Manage fleet tasks" },
  ];
}

export default function TasksRoute() {
  return <TasksPage />;
}


