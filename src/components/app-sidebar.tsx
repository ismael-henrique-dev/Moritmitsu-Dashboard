'use client'

import * as React from 'react'
import {
  IconClipboardCheck,
  IconDashboard,
  IconSchool,
  IconUsers,
} from '@tabler/icons-react'

import { NavMain } from '@/components/nav-main'
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
import Link from 'next/link'

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
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5 flex flex-col h-30 '
            >
              <Link href='/dashboard' className=''>
                <Image
                  src='/logo_morimtsu.png'
                  alt='Image'
                  className='h-20 w-20 object-cover dark:brightness-[0.2] dark:grayscale'
                  width={200}
                  height={200}
                />
                <span className='text-base font-semibold'>
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
