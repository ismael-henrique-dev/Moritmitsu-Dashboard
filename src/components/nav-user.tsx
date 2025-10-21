'use client'

import {
  IconAdjustments,
  IconDotsVertical,
  IconLogout,
} from '@tabler/icons-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { logout } from '@/lib/actions'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { getUserInitials } from '@/lib/utils'

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
  }
}) {
  const [open, setOpen] = useState(false)

  const userInitials = getUserInitials(user.name)

  const handleLogout = async () => {
    const response = await logout()

    if (response.status === 'success') {
      toast.success(response.message)
      redirect('/login')
    } else {
      toast.error(response.message)
    }
  }

  const handleRedirectToPreferencePage = () => {
    setOpen(false)

    redirect('/dashboard/preferences')
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer'
            >
              <Avatar className='h-8 w-8 rounded-lg grayscale'>
                <AvatarFallback className='rounded-lg'>
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user.name}</span>
                <span className='text-muted-foreground truncate text-xs'>
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            side='top'
            align='end'
            sideOffset={12}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem
                className='cursor-pointer'
                onClick={handleRedirectToPreferencePage}
              >
                <IconAdjustments />
                Preferências
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='cursor-pointer' onClick={handleLogout}>
              <IconLogout />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
