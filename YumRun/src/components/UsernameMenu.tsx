import { auth } from '@/firebase'
import { CircleUserRound } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { Separator } from './ui/separator'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Button } from './ui/button'

const UsernameMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='flex items-center px-3 font-bold hover:text-beep-100 gap-2'>
        <CircleUserRound className='text-beep-100' />
        {auth.currentUser?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link to="/manage-store" className='font-bold hover:text-beep-100'>
            Manage Store
          </Link>
        </DropdownMenuItem>
        <Separator />

        <DropdownMenuItem>
          <Link to="/user-profile" className='font-bold hover:text-beep-100'>
            User Profile
          </Link>
        </DropdownMenuItem>

        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => auth.signOut()}
            className="flex flex-1 font-bold bg-beep-100">
            Log out
          </Button>
        </DropdownMenuItem>


      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UsernameMenu