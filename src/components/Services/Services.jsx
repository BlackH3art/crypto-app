import { BsShieldFillCheck} from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

import ServiceCard from './ServiceCard';

const Services = () => {

  return (
    <>
      <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
        <div className="flex mf:flex-row flex.col items-center justify-between md:p-20 py-12 px-4">
          <div className="flex-1 flex flex-col justify-start items-start">
            <h1 className='text-white text-3xl sm:text-5xl py-2 text-gradient'>
              Services that we
              <br />
              continue to improve
            </h1>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-start items-center">
          <ServiceCard 
            color="bg-[#2952E3]"
            title="Security Guaranteed"
            icon={<BsShieldFillCheck fontSize={21} className='text-white' />}
            subtitle="Security is guaranteed. We always maintain privacy and maintain the quality of our product."
          />
          <ServiceCard 
            color="bg-[#8945F8]"
            title="Best exchange rates"
            icon={<BiSearchAlt fontSize={21} className='text-white' />}
            subtitle="You cannot find any place with higher exchange rates."
          />
          <ServiceCard 
            color="bg-[#F84550]"
            title="Fast transactions"
            icon={<RiHeart2Fill fontSize={21} className='text-white' />}
            subtitle="The speed of light transactions are here to help you with sending value."
          />
        </div>
      </div>
    </>
  )
}

export default Services;