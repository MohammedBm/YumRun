
import hero from '../assets/food.svg'
import { Separator } from './ui/separator'

const Hero = () => {
  return (
    <div className='flex place-content-center py-6 border-b-2 border-b-beep-100 bg-gray-50'
    >
      <img src={hero} className='w-half max-h-[500] object-cover' />
    </div>
  )
}

export default Hero
