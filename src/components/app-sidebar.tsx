'use client'

import * as React from 'react'
import {
  IconBell,
  IconCamera,
  IconClipboardCheck,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconReport,
  IconSchool,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react'

import { NavDocuments } from '@/components/nav-documents'
import { NavMain } from '@/components/nav-main'
import { NavSecondary } from '@/components/nav-secondary'
import { NavUser } from '@/components/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import { ClipboardCheck, GraduationCap, Users } from 'lucide-react'

const data = {
  user: {
    name: 'Saulo',
    email: 'saulo@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: IconDashboard,
    },
    {
      title: 'Frequência',
      url: '/dashboard/frequency',
      icon: IconClipboardCheck,
    },
    {
      title: 'Turmas',
      url: '/dashboard/classes',
      icon: IconSchool,
    },
    {
      title: 'Alunos',
      url: '/dashboard/students',
      icon: IconUsers,
    },
    {
      title: 'Notificações',
      url: '/dashboard/notifications',
      icon: IconBell,
    },
  ],
  navClouds: [
    {
      title: 'Capture',
      icon: IconCamera,
      isActive: true,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Proposal',
      icon: IconFileDescription,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
    {
      title: 'Prompts',
      icon: IconFileAi,
      url: '#',
      items: [
        {
          title: 'Active Proposals',
          url: '#',
        },
        {
          title: 'Archived',
          url: '#',
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <a href='#'>
                <Image
                  src='/morimitsu_logo.png'
                  alt='Image'
                  className='h-6 w-6 object-cover dark:brightness-[0.2] dark:grayscale'
                  width={24}
                  height={24}
                />
                <span className='text-base font-semibold'>
                  Morimitsu Dashboard
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
