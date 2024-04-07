import React from 'react';
import { GitHub, Google } from '@mui/icons-material';
import { Facebook } from '@mui/icons-material';
import { Microsoft } from '@mui/icons-material';
import { X } from '@mui/icons-material';
import { Pinterest } from '@mui/icons-material';
import DrawOutlineButton from './DrawOutlineButton';

const Testimonial = () => {
  return (<>
  <h1 className='bg-gray-800 text-white flex justify-center font-semibold text-2xl mt-10 p-2  '>OUR EMINENT RECRUITERS
& MANY MORE…</h1>
  <div>
{/* <div className='bg-gray-800'><br /></div> gapping */}
    <div className="bg-gray-800 p-4 flex justify-around">
    <div className="text-white">
        <Google style={{ fontSize: 48 }} />
      </div>
      <div className="text-white">
        <X style={{ fontSize: 48 }} />
      </div>
      <div className="text-white">
        <Microsoft style={{ fontSize: 48 }} />
      </div>
      <div className="text-white">
      <Pinterest style={{ fontSize: 48 }} />
      </div>
      <div className="text-white">
      <Facebook style={{ fontSize: 48 }} />
      </div>
      <div className="text-white">
      <GitHub style={{ fontSize: 48 }} />
      </div>

  </div>
  <div className=' bg-slate-800 flex justify-center p-3  '>  
      <DrawOutlineButton2> View All </DrawOutlineButton2>
  </div>
        </div>
      
  </>


  );
};

const DrawOutlineButton2 = ({ children, ...rest }) => {
  return (
    <button
      {...rest}
      className="group relative px-4 py-2 w-40 rounded-md font-medium bg-slate-600  text-slate-100 transition-colors duration-[400ms] hover:text-white "
    >
      <span>{children}</span>

      {/* TOP */}
      <span className="absolute left-0 top-0 h-[2px] w-0 bg-white transition-all duration-100 group-hover:w-full" />

      {/* RIGHT */}
      <span className="absolute right-0 top-0 h-0 w-[2px] bg-white transition-all delay-100 duration-100 group-hover:h-full" />

      {/* BOTTOM */}
      <span className="absolute bottom-0 right-0 h-[2px] w-0 bg-white transition-all delay-200 duration-100 group-hover:w-full" />

      {/* LEFT */}
      <span className="absolute bottom-0 left-0 h-0 w-[2px] bg-white transition-all delay-300 duration-100 group-hover:h-full" />
    </button>
  );
};

export default Testimonial;
