import { auth } from '@/firebase'
import { Link } from 'react-router-dom'
import UsernameMenu from './UsernameMenu'

const DesktopNav = () => {
  return (
    <span className="flex space-x-2 items-center">
      {
        auth.currentUser ? <UsernameMenu /> :
          <Link to='/signup' className='flex-1 font-bold' >
            Sign up
          </Link>
      }
    </span>
  )
}

export default DesktopNav
