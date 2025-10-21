'use client'

import * as React from 'react'
import {
  IconClipboardCheck,
  IconDashboard,
  IconSchool,
  IconUsers,
} from '@tabler/icons-react'

import { NavMain } from '@/components/nav-main'
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
import Link from 'next/link'
import { NavUser } from './nav-user'
import { useUserData } from '@/hooks/use-user'

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
      title: 'Frequências',
      url: '/dashboard/attendances',
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
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user: userData } = useUserData()

  const user = {
    name: userData?.username ?? 'User',
    email: userData?.email ?? 'Email',
  }

  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5 flex flex-col h-30 gap-1'
            >
              <Link href='/dashboard'>
                <Image
                  src='/logo_morimtsu.png'
                  alt='Morimitsu logo'
                  className='h-20 w-20 object-cover dark:brightness-[0.2] dark:grayscale'
                  width={80}
                  height={80}
                />
                <span className='text-base font-medium font-poppins'>
                  Morimitsu Dashboard
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  )
}
