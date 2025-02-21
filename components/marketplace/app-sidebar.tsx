"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Palette,
  Dumbbell,
  Star,
  Settings,
  LogOut,
  BadgeCheck,
  Users,
  MessageSquare,
  History
} from "lucide-react"

import { NavMain } from "@/components/marketplace/nav-main"
import { NavProjects } from "@/components/marketplace/nav-projects"
import { NavUser } from "@/components/marketplace/nav-user"
import { TeamSwitcher } from "@/components/marketplace/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

const categories = [
  {
    title: "Academic",
    icon: BookOpen,
    items: [
      { title: "Tutoring", url: "/marketplace/academic/tutoring" },
      { title: "Study Groups", url: "/marketplace/academic/study-groups" },
      { title: "Research Help", url: "/marketplace/academic/research" },
    ]
  },
  {
    title: "Creative",
    icon: Palette,
    items: [
      { title: "Design", url: "/marketplace/creative/design" },
      { title: "Photography", url: "/marketplace/creative/photography" },
      { title: "Music", url: "/marketplace/creative/music" },
    ]
  },
  {
    title: "Fitness",
    icon: Dumbbell,
    items: [
      { title: "Personal Training", url: "/marketplace/fitness/training" },
      { title: "Sports Partners", url: "/marketplace/fitness/sports" },
      { title: "Nutrition", url: "/marketplace/fitness/nutrition" },
    ]
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-3 px-2 py-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatars/user.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col overflow-hidden">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">John Doe</span>
              <BadgeCheck className="h-4 w-4 text-primary" />
            </div>
            <span className="text-xs text-muted-foreground truncate">@johndoe.waterloo</span>
          </div>
        </div>
        <div className="px-2 pb-4">
          <div className="flex flex-wrap gap-1">
            <Badge variant="outline" className="text-xs">Python</Badge>
            <Badge variant="outline" className="text-xs">Design</Badge>
            <Badge variant="outline" className="text-xs">Fitness</Badge>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Trust Score Section */}
        <SidebarGroup>
          <div className="px-4 py-2">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="text-sm font-medium">Trust Score</span>
              </div>
              <span className="text-sm font-medium">85%</span>
            </div>
            <Progress value={85} className="h-1" />
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>32 Reviews</span>
              <span>12 Trades</span>
            </div>
          </div>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/marketplace/messages">
                  <MessageSquare className="h-4 w-4" />
                  <span>Messages</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/marketplace/community">
                  <Users className="h-4 w-4" />
                  <span>Community</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href="/marketplace/history">
                  <History className="h-4 w-4" />
                  <span>Trade History</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarSeparator />

        {/* Categories */}
        <SidebarGroup>
          <SidebarGroupLabel>Categories</SidebarGroupLabel>
          <SidebarMenu>
            {categories.map((category) => (
              <SidebarMenuItem key={category.title}>
                <SidebarMenuButton>
                  <category.icon className="h-4 w-4" />
                  <span>{category.title}</span>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {category.items.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton asChild>
                        <a href={item.url}>
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button variant="ghost" className="w-full justify-start">
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
