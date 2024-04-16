import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { Menu } from 'lucide-react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-beep" />
      </SheetTrigger>
      <SheetContent className='space-y-3'>
        <SheetTitle>
          <span>Welcome to YumRun</span>
        </SheetTitle>

        <Separator />
        <SheetDescription className="flex">
          <Button className='flex-1 font-bold bg-beep'>
            Log in
          </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
