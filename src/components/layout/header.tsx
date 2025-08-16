import { Building } from 'lucide-react';
import { UserNav } from './user-nav';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-card">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Building className="size-8 text-primary" />
          <span className="text-lg font-semibold text-primary font-headline">
            Nivesh Pathshala
          </span>
        </div>
        <UserNav />
      </div>
    </header>
  );
}
