import { Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from '@/components/sidebar';
import { checkSubscription } from '@/lib/subscription';

const MobileSidebar = async () => {
  const isPro = await checkSubscription();
  return (
    <Sheet>
      <SheetTrigger className="pr-4 md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <Sidebar isPro={isPro} />
      </SheetContent>
    </Sheet>
  );
};

export { MobileSidebar };
