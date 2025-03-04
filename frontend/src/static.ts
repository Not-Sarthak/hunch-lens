import {
  DashboardIcon,
  ProfileIcon,
  LeaderboardIcon,
} from "./components/header/tab-icons";
import * as React from "react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const navigationItems: NavItem[] = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: React.createElement(DashboardIcon),
  },
  {
    label: "Profile",
    path: "/profile",
    icon: React.createElement(ProfileIcon),
  },
  {
    label: "Leaderboard",
    path: "/leaderboard",
    icon: React.createElement(LeaderboardIcon),
  },
];