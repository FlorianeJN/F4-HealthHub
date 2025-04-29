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
import { useEffect, useState } from "react";

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

const navItems = [
  {
    title: "Tableau de bord",
    url: "/dashboard",
    icon: IconDashboard,
  },
  {
    title: "Factures",
    url: "/dashboard/invoices",
    icon: IconFileInvoice,
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
    title: "Profil de l'entreprise",
    url: "/dashboard/profile",
    icon: IconUser,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-2"
            >
              <Link href="/" className="flex items-center gap-2">
                <IconInnerShadowTop className="size-6" />
                <span className="text-2xl font-bold tracking-tight">
                  F4 HealthHub
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-3 p-2 rounded-md bg-muted">
          <UserButton />
          {isClient && user && (
            <div className="flex flex-col">
              <p className="text-sm font-medium leading-tight">
                {user.fullName}
              </p>
              <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                {user.primaryEmailAddress?.emailAddress}
              </p>
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
