'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import {
  ShieldCheck,
  Building,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const links = [
  {
    href: '/',
    label: 'Verify',
    icon: ShieldCheck,
  },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <Building className="size-8 text-primary" />
          <span className="text-lg font-semibold text-primary-foreground font-headline">
            Nivesh Pathshala
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === link.href}
                  tooltip={link.label}
                  className={cn(
                    'dark:text-sidebar-foreground dark:hover:bg-sidebar-accent dark:hover:text-sidebar-accent-foreground',
                    pathname === link.href &&
                      'dark:bg-sidebar-primary dark:text-sidebar-primary-foreground'
                  )}
                >
                  <link.icon className="size-4" />
                  <span>{link.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
