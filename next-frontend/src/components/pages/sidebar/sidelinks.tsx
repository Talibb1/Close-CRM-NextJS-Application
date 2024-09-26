import {
  IconAddressBook,
  IconChecklist,
  IconError404,
  IconExclamationCircle,
  IconLayoutDashboard,
  IconSettings,
  IconShieldLock,
  IconUserCircle,
} from "@tabler/icons-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/dashboard",
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: "Detail Pages",
    label: "",
    href: "",
    icon: <IconChecklist size={18} />,
    sub: [
      {
        title: "Leads",
        label: "",
        href: "/dashboard/Leads",
        icon: <IconChecklist size={18} />,
      },
      {
        title: "Contacts",
        label: "",
        href: "/dashboard/Contacts",
        icon: <IconAddressBook size={18} />,
      },
    ],
  },
  {
    title: "Admin Settings",
    label: "",
    href: "",
    icon: <IconSettings size={18} />,
    sub: [
      {
        title: "Profile",
        label: "",
        href: "/dashboard/Settings/profile",
        icon: <IconUserCircle size={18} />,
      },
      // {
      //   title: "Social Links",
      //   label: "",
      //   href: "/dashboard/settings/sociallinks",
      //   icon: <IconLink size={18} />,
      // },
      // {
      //   title: "Notifications",
      //   label: "",
      //   href: "/dashboard/settings/notifications",
      //   icon: <IconBellRinging size={18} />,
      // },
      {
        title: "Security",
        label: "",
        href: "/dashboard/Settings/security",
        icon: <IconShieldLock size={18} />,
      },
    ],
  },
  {
    title: "Error Pages",
    label: "",
    href: "",
    icon: <IconExclamationCircle size={18} />,
    sub: [
      {
        title: "Not Found",
        label: "",
        href: "*",
        icon: <IconError404 size={18} />,
      },
    ],
  },
];
