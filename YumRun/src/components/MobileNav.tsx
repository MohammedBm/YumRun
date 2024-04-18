import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from './ui/sheet'
import { CircleUserRound, Menu } from 'lucide-react'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { Link } from 'react-router-dom'
import { auth } from '@/firebase'
import MobileNavLinks from './MobileNavLinks'

const MobileNav = () => {
  const { currentUser } = auth;
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-beep-100" />
      </SheetTrigger>
      <SheetContent className='space-y-3'>
        <SheetTitle>
          {currentUser ?
            <span className="flex items-center font-bold gap-2">
              <CircleUserRound className='text-beep-100' />
              {currentUser.email}
            </span>
            :
            <span>Welcome to YumRun</span>
          }
        </SheetTitle>

        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {currentUser ? (
            <MobileNavLinks />
          ) : (
            <Link to='/signup' className='flex-1 font-bold bg-white-100 hover:text-beep-100' >
              Sign up
            </Link>
          )
          }
        </SheetDescription>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
