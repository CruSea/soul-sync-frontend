import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { Button } from '@/components/ui/button';
import { LuMenu } from 'react-icons/lu';

const Dropdown = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden">
          <LuMenu />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left"></SheetContent>
    </Sheet>
  );
};

export default Dropdown;
