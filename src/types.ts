export type ViewType = "Mission Control" | "Dashboard" | "Task Management" | "Studio" | "Analytics" | "Sources" | "Archives" | "Settings" | "Subscriptions";

export interface ConnectedSource {
  id: string;
  name: string;
  type: string;
  status: "LIVE" | "SYNCING" | "IDLE";
  iconName: string;
  metricLabel: string;
  metricValue: string;
  integrityPercent: number; // 0 to 100
  timeLabel: string;
  configLabel: string;
}

export interface SignalLog {
  time: string;
  text: string;
  color: "cyan" | "orange" | "white" | "gray";
}

export interface KanbanTask {
  id: string;
  title: string;
  type: string;
  status: "backlog" | "production" | "review" | "ready";
  priority: "Emergency" | "Feature" | "Video Editing" | "Scripting" | "Quality Assurance" | "Finalized";
  assignee: {
    name: string;
    avatar: string;
  } | null;
  dueDate: string;
  progress?: number; // percent
  arabicQuote?: string; // e.g. "Check font weight on Arabic headlines"
}

export interface NewsNexusItem {
  id: string;
  title: string;
  excerpt: string;
  timeAgo: string;
  image: string;
  isHot?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  tasksCount: number;
  capacity: number;
}
