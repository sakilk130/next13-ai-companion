'use client';

import { UserButton } from '@clerk/nextjs';
import { Menu, Sparkles } from 'lucide-react';
import { Poppins } from 'next/font/google';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ModeToggle } from '@/components/mode-toggle';
import { MobileSidebar } from '@/components/mobile-sidebar';
import { useProModal } from '@/hooks/user-pro-modal';
import { FC } from 'react';

const font = Poppins({
  weight: '600',
  subsets: ['latin'],
});

interface NavbarProps {
  isPro: boolean;
}

const Navbar: FC<NavbarProps> = ({ isPro }) => {
  const proModal = useProModal();
  return (
    <div className="fixed z-50 flex items-center justify-between w-full h-16 px-4 py-2 border-b border-primary/10 bg-secondary">
      <div className="flex items-center">
        <MobileSidebar />
        <Link href="/">
          <h1
            className={cn(
              'hidden text-xl font-bold md:block md:text-3xl text-primary',
              font.className
            )}
          >
            companion.ai
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        {!isPro && (
          <Button size="sm" variant="premium" onClick={proModal.onOpen}>
            Upgrade
            <Sparkles className="w-4 h-4 ml-2 text-white fill-white" />
          </Button>
        )}
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export { Navbar };
