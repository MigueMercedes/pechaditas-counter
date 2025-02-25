"use client"

import { Home, BarChart2, User, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <h2 className="text-lg font-semibold">GymPro</h2>
        <SidebarTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Sidebar</span>
          </Button>
        </SidebarTrigger>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild active={pathname === "/"}>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild active={pathname === "/pechadas-counter"}>
              <Link href="/pechadas-counter">
                <BarChart2 className="mr-2 h-4 w-4" />
                <span>Pechadas Counter</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild active={pathname === "/leaderboard"}>
              <Link href="/leaderboard">
                <User className="mr-2 h-4 w-4" />
                <span>Leaderboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild active={pathname === "/profile"}>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <p className="text-xs text-muted-foreground">© 2024 GymPro</p>
      </SidebarFooter>
    </Sidebar>
  )
}

