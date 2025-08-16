'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserNav } from '@/components/layout/user-nav';
import { useIsMobile } from '@/hooks/use-mobile';
import { Nav } from './nav';

export function Header() {
  const isMobile = useIsMobile();
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1" />
      <UserNav />
      {isMobile && (
        <div className="md:hidden">
          <Nav />
        </div>
      )}
    </header>
  );
}
