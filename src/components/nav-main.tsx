'use client'

import { type Icon } from '@tabler/icons-react'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: Icon
  }[]
}) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2'>
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url
            const Icon = item.icon

            return (
              <SidebarMenuItem key={item.title}>
                <div onMouseEnter={() => router.prefetch(item.url)}>
                  <Link href={item.url}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={cn(
                        'cursor-pointer text-base h-8 rounded-md',
                        isActive &&
                          'bg-morimitsu-red text-white hover:bg-red-800 hover:text-white'
                      )}
                    >
                      <Icon className='!w-5 !h-5 ' />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </div>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
