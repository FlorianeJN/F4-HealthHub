"use client";

import {
  IconBriefcase,
  IconDashboard,
  IconFileInvoice,
  IconInnerShadowTop,
  IconUser,
  IconUsers,
} from "@tabler/icons-react";
import * as React from "react";

import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

const data = {
  navItems: [
    {
      title: "Tableau de bord",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Partenaires",
      url: "/dashboard/partners",
      icon: IconBriefcase,
    },
    {
      title: "Employés",
      url: "/dashboard/employees",
      icon: IconUsers,
    },
    {
      title: "Factures",
      url: "/dashboard/invoices",
      icon: IconFileInvoice,
    },
    {
      title: "Profil de l'entreprise",
      url: "/dashboard/profile",
      icon: IconUser,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 "
            >
              <Link href="/">
                <IconInnerShadowTop className="!size-5" />
                <span className=" text-xl font-semibold">F4 HealthHub</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navItems} />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-row  gap-x-3 ">
          <UserButton />
          <div className="flex flex-col">
            <p className="text-sm font-semibold">{user?.fullName}</p>
            <p className="text-xs text-slate-400">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
